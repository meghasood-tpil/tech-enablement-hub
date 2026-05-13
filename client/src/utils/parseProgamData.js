export async function fetchProgramData() {
  const res = await fetch('/data/program-data.csv');
  const text = await res.text();
  return parseProgramCSV(text);
}

function parseProgramCSV(text) {
  const rows = parseCSVWithQuotes(text);

  const headerIdx = rows.findIndex(
    (r) => r.some((c) => c.includes('Quarter')) && r.some((c) => c.includes('Program Type'))
  );
  if (headerIdx === -1) return { programs: [], stats: emptyStats() };

  const headers = rows[headerIdx].map((h) => h.replace(/[\n\r]+/g, ' ').trim().toLowerCase());
  const col = {
    quarter:       headers.findIndex((h) => h === 'quarter'),
    trainingName:  headers.findIndex((h) => h.includes('training name') || h.includes('program name')),
    programType:   headers.findIndex((h) => h === 'program type'),
    offeringType:  headers.findIndex((h) => h === 'offering type'),
    startDate:     headers.findIndex((h) => h.includes('start date')),
    endDate:       headers.findIndex((h) => h.includes('end date')),
    registered:    headers.findIndex((h) => h.includes('registration') || h.includes('enrolled')),
    attendees:     headers.findIndex((h) => (h.includes('no. of attendees') || h.includes('no of attendees') || h.includes('completed')) && !h.includes('duration')),
    attendancePct: headers.findIndex((h) => h.includes('attendance %')),
    noShow:        headers.findIndex((h) => h === 'no-show' || h === 'no show'),
    noShowPct:     headers.findIndex((h) => h.includes('no-show %') || h.includes('no show %')),
    csat:          headers.findIndex((h) => h.includes('learner') && h.includes('perception')),
    feedbackCount: headers.findIndex((h) => h.includes('count of feedback') || h.includes('count') && h.includes('feedback')),
    learningHours: headers.findIndex((h) => h.includes('learning hours')),
  };

  const programs = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < 5) continue;

    const get = (idx) => (idx >= 0 && idx < r.length ? r[idx].replace(/[\n\r]+/g, ' ').trim() : '');

    const quarter = get(col.quarter);
    const name = get(col.trainingName);
    let programType = get(col.programType);
    const offeringType = get(col.offeringType);

    if (!name || !programType) continue;

    if (offeringType === 'Ed Talk') programType = 'Tech Talks';
    else if (programType === 'Tech') programType = mapOfferingToType(offeringType);
    else if (programType === 'Onboarding') programType = 'Onboarding Program';

    const startDate = get(col.startDate);
    const attendees = parseNum(get(col.attendees));
    const registered = parseNum(get(col.registered));
    const csat = parseNum(get(col.csat));
    const attendancePct = parsePct(get(col.attendancePct));
    const noShow = parseNum(get(col.noShow));
    const noShowPct = parsePct(get(col.noShowPct));
    const feedbackCount = parseNum(get(col.feedbackCount));

    programs.push({
      quarter, name, programType, offeringType, startDate,
      endDate: get(col.endDate),
      attendees, registered, csat, attendancePct,
      noShow, noShowPct, feedbackCount,
    });
  }

  const cy2026 = programs.filter((p) => {
    const d = parseDate(p.startDate);
    return d && d.getFullYear() >= 2026;
  });

  return { programs: cy2026, stats: computeStats(cy2026) };
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

  const byType = {};
  const byQuarter = {};
  programs.forEach((p) => {
    if (!byType[p.programType]) byType[p.programType] = { count: 0, attendees: 0, registered: 0, csatSum: 0, csatCount: 0 };
    byType[p.programType].count++;
    byType[p.programType].attendees += p.attendees || 0;
    byType[p.programType].registered += p.registered || 0;
    if (p.csat !== null && p.csat > 0) {
      byType[p.programType].csatSum += p.csat;
      byType[p.programType].csatCount++;
    }

    if (p.quarter) {
      if (!byQuarter[p.quarter]) byQuarter[p.quarter] = { count: 0, attendees: 0 };
      byQuarter[p.quarter].count++;
      byQuarter[p.quarter].attendees += p.attendees || 0;
    }
  });

  Object.keys(byType).forEach((k) => {
    byType[k].avgCSAT = byType[k].csatCount
      ? Math.round(byType[k].csatSum / byType[k].csatCount)
      : 0;
  });

  return { totalPrograms, totalAttendees, totalRegistered, avgAttendance, avgCSAT, byType, byQuarter };
}

function emptyStats() {
  return { totalPrograms: 0, totalAttendees: 0, totalRegistered: 0, avgAttendance: 0, avgCSAT: 0, byType: {}, byQuarter: {} };
}

function parseCSVWithQuotes(text) {
  const rows = [];
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        current.push(field);
        field = '';
      } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        if (ch === '\r') i++;
        current.push(field);
        field = '';
        rows.push(current);
        current = [];
      } else if (ch === '\r') {
        current.push(field);
        field = '';
        rows.push(current);
        current = [];
      } else {
        field += ch;
      }
    }
  }
  if (field || current.length) {
    current.push(field);
    rows.push(current);
  }

  return rows;
}

function parseDate(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
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
