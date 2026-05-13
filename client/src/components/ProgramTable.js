import React from 'react';

export default function ProgramTable({ programs, color }) {
  if (programs.length === 0) return <p className="text-sm text-sf-gray-60">No programs found.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sf-gray-95">
            <th className="text-left py-3 pr-4 font-semibold text-sf-gray-60">Program</th>
            <th className="text-left py-3 pr-4 font-semibold text-sf-gray-60">Trainer</th>
            <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Registered</th>
            <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Attended</th>
            <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Attendance %</th>
            <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Learner CSAT</th>
            <th className="text-right py-3 font-semibold text-sf-gray-60">Trainer CSAT</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p, i) => (
            <tr key={i} className="border-b border-sf-gray-95 last:border-0 hover:bg-sf-blue-95/30 transition-colors">
              <td className="py-3 pr-4">
                <div className="font-medium text-sf-blue-15">{p.name}</div>
                <div className="text-xs text-sf-gray-60">{p.startDate} — {p.endDate}</div>
              </td>
              <td className="py-3 pr-4 text-sf-blue-15">{p.trainerName || '—'}</td>
              <td className="py-3 pr-4 text-right font-medium">{p.registered ?? '—'}</td>
              <td className="py-3 pr-4 text-right font-medium">{p.attendees ?? '—'}</td>
              <td className="py-3 pr-4 text-right">
                {p.attendancePct !== null ? (
                  <span className={`font-medium ${p.attendancePct >= 85 ? 'text-sf-green-50' : p.attendancePct >= 70 ? 'text-sf-orange-65' : 'text-sf-pink-40'}`}>
                    {p.attendancePct}%
                  </span>
                ) : '—'}
              </td>
              <td className="py-3 pr-4 text-right">
                {p.csat !== null ? <span className="font-medium" style={{ color }}>{p.csat}%</span> : '—'}
              </td>
              <td className="py-3 text-right">
                {p.trainerCSAT !== null ? <span className="font-medium text-sf-blue-50">{p.trainerCSAT}%</span> : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
