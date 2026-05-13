export async function fetchProgramData() {
  const res = await fetch('/data/program-data.csv');
  const text = await res.text();
  return parseProgramCSV(text);
}

function parseProgramCSV(text) {
  const lines = text.split('\n');

  const dataStartIndex = lines.findIndex(
    (l) => l.includes('Quarter') && l.includes('Program Type')
  );
  if (dataStartIndex === -1) return { programs: [], stats: emptyStats() };

  const headers = splitCSVLine(lines[dataStartIndex]);
  const colIdx = buildColumnIndex(headers);

  const programs = [];
  for (let i = dataStartIndex + 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    if (cols.length < 5) continue;

    const quarter = clean(cols[colIdx.quarter]);
    const name = clean(cols[colIdx.trainingName]);
    let programType = clean(cols[colIdx.programType]);
    const offeringType = clean(cols[colIdx.offeringType]);

    if (!name || !programType) continue;

    // Ed Talk = Tech Talk
    if (offeringType === 'Ed Talk') programType = 'Tech Talks';
    else if (programType === 'Tech') programType = mapOfferingToType(offeringType);
    else if (programType === 'Onboarding') programType = 'Onboarding Program';

    const attendees = parseNum(cols[colIdx.attendees]);
    const registered = parseNum(cols[colIdx.registered]);
    const csat = parseNum(cols[colIdx.csat]);
    const attendancePct = parsePct(cols[colIdx.attendancePct]);
    const feedbackCount = parseNum(cols[colIdx.feedbackCount]);

    programs.push({
      quarter,
      name,
      programType,
      offeringType,
      startDate: clean(cols[colIdx.startDate]),
      endDate: clean(cols[colIdx.endDate]),
      attendees,
      registered,
      csat,
      attendancePct,
      feedbackCount,
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

function buildColumnIndex(headers) {
  const find = (keywords) => {
    const lower = headers.map((h) => h.toLowerCase().replace(/[\n\r]/g, ' '));
    return lower.findIndex((h) =>
      keywords.every((k) => h.includes(k.toLowerCase()))
    );
  };

  return {
    quarter: find(['quarter']),
    uniqueName: find(['unique', 'name']),
    trainingName: find(['training name']) !== -1 ? find(['training name']) : find(['program name']),
    programType: find(['program type']),
    offeringType: find(['offering type']),
    startDate: find(['start date']),
    endDate: find(['end date']),
    registered: find(['registration']) !== -1 ? find(['registration']) : find(['enrolled']),
    attendees: find(['attendees']) !== -1 ? find(['attendees']) : find(['completed']),
    attendancePct: find(['attendance %']),
    csat: find(['learner', 'perception']) !== -1 ? find(['learner', 'perception']) : find(['csat']),
    feedbackCount: find(['count of feedback']) !== -1 ? find(['count of feedback']) : find(['count', 'feedback']),
  };
}

function computeStats(programs) {
  const totalPrograms = programs.length;
  const totalAttendees = programs.reduce((s, p) => s + (p.attendees || 0), 0);

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
    if (!byType[p.programType]) byType[p.programType] = { count: 0, attendees: 0, csatSum: 0, csatCount: 0 };
    byType[p.programType].count++;
    byType[p.programType].attendees += p.attendees || 0;
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

  return { totalPrograms, totalAttendees, avgAttendance, avgCSAT, byType, byQuarter };
}

function emptyStats() {
  return { totalPrograms: 0, totalAttendees: 0, avgAttendance: 0, avgCSAT: 0, byType: {}, byQuarter: {} };
}

function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function clean(val) {
  if (!val) return '';
  return val.replace(/[\n\r]/g, ' ').trim();
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
