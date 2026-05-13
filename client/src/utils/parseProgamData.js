export async function fetchProgramData() {
  const res = await fetch('/data/program-data.csv');
  const text = await res.text();
  return parseProgramCSV(text);
}

function parseProgramCSV(text) {
  const rows = parseCSVWithQuotes(text);

  const headerIdx = rows.findIndex(
    (r) => r.some((c) => c.includes('Training Name') || c.includes('Program Name'))
      && r.some((c) => c.includes('Program Type'))
  );
  if (headerIdx === -1) return { programs: [], stats: emptyStats() };

  const headers = rows[headerIdx].map((h) => h.replace(/[\n\r]+/g, ' ').trim().toLowerCase());

  const col = {};
  headers.forEach((h, i) => {
    if (h.includes('training name') || h.includes('program name')) col.name = i;
    else if (h === 'program type') col.programType = i;
    else if (h === 'offering type' || h === 'offering') col.offeringType = i;
    else if (h.includes('start date')) col.startDate = i;
    else if (h.includes('end date')) col.endDate = i;
    else if (h.includes('learning hours')) col.learningHours = i;
    else if (h.includes('registration') || h.includes('enrolled')) col.registered = i;
    else if (h.includes('waitlist')) col.waitlist = i;
    else if ((h.includes('no. of attendees') || h.includes('no of attendees') || h.includes('completed')) && !h.includes('duration')) col.attendees = i;
    else if (h === 'attendance %') col.attendancePct = i;
    else if (h === 'no-show' && !h.includes('%')) col.noShow = i;
    else if (h.includes('no-show %')) col.noShowPct = i;
    else if (h.includes('learner') && h.includes('perception')) col.csat = i;
    else if (h.includes('learner') && h.includes('activity')) col.learnerActivity = i;
    else if (h.includes('avg') && h.includes('trainer') && h.includes('feedback')) col.avgTrainerFeedback = i;
    else if (h.includes('count of feedback')) col.feedbackCount = i;
    else if (h === 'response %') col.responsePct = i;
    else if (h === 'trainer name') col.trainerName = i;
    else if (h.includes('trainer feedback%') || h.includes('trainer feedback %')) col.trainerCSAT = i;
  });

  const programs = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < 5) continue;

    const get = (idx) => (idx !== undefined && idx < r.length ? r[idx].replace(/[\n\r]+/g, ' ').trim() : '');

    const name = get(col.name);
    let programType = get(col.programType);
    const offeringType = get(col.offeringType);

    if (!name || !programType) continue;

    if (offeringType === 'Ed Talk') programType = 'Tech Talks';
    else if (programType === 'Tech') programType = mapOfferingToType(offeringType);
    else if (programType === 'Onboarding') programType = 'Onboarding Program';

    programs.push({
      name,
      programType,
      offeringType,
      startDate: get(col.startDate),
      endDate: get(col.endDate),
      registered: parseNum(get(col.registered)),
      attendees: parseNum(get(col.attendees)),
      attendancePct: parsePct(get(col.attendancePct)),
      noShow: parseNum(get(col.noShow)),
      noShowPct: parsePct(get(col.noShowPct)),
      csat: parseNum(get(col.csat)),
      feedbackCount: parseNum(get(col.feedbackCount)),
      trainerName: get(col.trainerName),
      trainerCSAT: parsePct(get(col.trainerCSAT)),
    });
  }

  return { programs, stats: computeStats(programs) };
}

function mapOfferingToType(offering) {
  switch (offering) {
    case 'Calendar Offering': return 'Calendar Training';
    case 'Ed Talk': return 'Tech Talks';
    case 'Road2Tour': return 'Tech Talks';
    case 'Internal Workshops': return 'Cohort Programs';
    case 'Onboarding': return 'Onboarding Program';
    default: return 'Partnership Programs';
  }
}

function computeStats(programs) {
  const totalPrograms = programs.length;
  const totalAttendees = programs.reduce((s, p) => s + (p.attendees || 0), 0);
  const totalRegistered = programs.reduce((s, p) => s + (p.registered || 0), 0);

  const withAttendance = programs.filter((p) => p.attendancePct !== null);
  const avgAttendance = withAttendance.length
    ? Math.round(withAttendance.reduce((s, p) => s + p.attendancePct, 0) / withAttendance.length)
    : 0;

  const withCSAT = programs.filter((p) => p.csat !== null && p.csat > 0);
  const avgCSAT = withCSAT.length
    ? Math.round(withCSAT.reduce((s, p) => s + p.csat, 0) / withCSAT.length)
    : 0;

  const withTrainerCSAT = programs.filter((p) => p.trainerCSAT !== null);
  const avgTrainerCSAT = withTrainerCSAT.length
    ? Math.round(withTrainerCSAT.reduce((s, p) => s + p.trainerCSAT, 0) / withTrainerCSAT.length)
    : 0;

  const byType = {};
  programs.forEach((p) => {
    if (!byType[p.programType]) byType[p.programType] = {
      count: 0, attendees: 0, registered: 0,
      csatSum: 0, csatCount: 0,
      trainerCsatSum: 0, trainerCsatCount: 0,
    };
    const t = byType[p.programType];
    t.count++;
    t.attendees += p.attendees || 0;
    t.registered += p.registered || 0;
    if (p.csat !== null && p.csat > 0) { t.csatSum += p.csat; t.csatCount++; }
    if (p.trainerCSAT !== null) { t.trainerCsatSum += p.trainerCSAT; t.trainerCsatCount++; }
  });

  Object.keys(byType).forEach((k) => {
    const t = byType[k];
    t.avgCSAT = t.csatCount ? Math.round(t.csatSum / t.csatCount) : 0;
    t.avgTrainerCSAT = t.trainerCsatCount ? Math.round(t.trainerCsatSum / t.trainerCsatCount) : 0;
  });

  return { totalPrograms, totalAttendees, totalRegistered, avgAttendance, avgCSAT, avgTrainerCSAT, byType };
}

function emptyStats() {
  return { totalPrograms: 0, totalAttendees: 0, totalRegistered: 0, avgAttendance: 0, avgCSAT: 0, avgTrainerCSAT: 0, byType: {} };
}

function parseCSVWithQuotes(text) {
  const rows = [];
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { current.push(field); field = ''; }
      else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        if (ch === '\r') i++;
        current.push(field); field = ''; rows.push(current); current = [];
      } else if (ch === '\r') {
        current.push(field); field = ''; rows.push(current); current = [];
      } else { field += ch; }
    }
  }
  if (field || current.length) { current.push(field); rows.push(current); }
  return rows;
}

function parseNum(val) {
  if (!val) return null;
  const cleaned = val.replace(/[^0-9.]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function parsePct(val) {
  if (!val || val === 'NA') return null;
  const cleaned = val.replace('%', '').trim();
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}
