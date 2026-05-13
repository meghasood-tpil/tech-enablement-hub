import React from 'react';
import { Users, Calendar, Clock, ArrowRight } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';
import { Card } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const upcomingTalks = [
  { title: 'AI & Trust in Platform Development', date: '2026-05-20', speaker: 'Sarah Chen', attendees: 85 },
  { title: 'Microservices Architecture Patterns', date: '2026-05-27', speaker: 'Raj Kumar', attendees: 72 },
  { title: 'Security First: API Design', date: '2026-06-03', speaker: 'Emily Rodriguez', attendees: 68 },
];

const TechTalks = () => (
  <ProgramPageLayout
    icon={<Users />}
    title="Tech Talks"
    subtitle="Expert-led sessions on cutting-edge technologies and best practices"
    color="#BA01FF"
    colorLight="#D17DFE"
    stats={[
      { icon: <Calendar size={22} />, value: '45', label: 'Talks This Year' },
      { icon: <Users size={22} />, value: '1,250', label: 'Total Attendees' },
      { icon: <Clock size={22} />, value: '60 min', label: 'Avg Duration' },
    ]}
  >
    <h2 className="text-lg font-bold text-sf-blue-15 mb-5">Upcoming Talks</h2>
    <div className="space-y-3">
      {upcomingTalks.map((talk, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-sf-gray-95 hover:bg-sf-violet-95 transition-colors group">
          <div className="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-card">
            <span className="text-xs text-sf-gray-60 font-medium">{new Date(talk.date).toLocaleDateString('en', { month: 'short' })}</span>
            <span className="text-lg font-bold text-sf-blue-15 leading-tight">{new Date(talk.date).getDate()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-sf-blue-15 truncate">{talk.title}</h3>
            <p className="text-xs text-sf-gray-60 mt-0.5">{talk.speaker} · {talk.attendees} expected</p>
          </div>
          <Button variant="secondary" size="sm" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            Register <ArrowRight size={14} />
          </Button>
        </div>
      ))}
    </div>
  </ProgramPageLayout>
);

export default TechTalks;
