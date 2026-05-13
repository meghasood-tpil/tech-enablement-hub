import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Award, Users } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';
import { Card } from '../components/Card';
import ProgramTable from '../components/ProgramTable';
import { fetchProgramData } from '../utils/parseProgamData';

const CalendarTraining = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => { fetchProgramData().then((d) => setPrograms(d.programs.filter((p) => p.programType === 'Calendar Training'))); }, []);

  const total = programs.reduce((s, p) => s + (p.attendees || 0), 0);
  const avg = programs.filter((p) => p.csat).length ? Math.round(programs.filter((p) => p.csat).reduce((s, p) => s + p.csat, 0) / programs.filter((p) => p.csat).length) : 0;

  return (
    <ProgramPageLayout
      icon={<Calendar />} title="Calendar Training Programs" subtitle="Structured learning paths with scheduled sessions and milestones"
      color="#066AFE" colorLight="#90D0FE"
      stats={[
        { icon: <BookOpen size={22} />, value: programs.length, label: 'Programs' },
        { icon: <Users size={22} />, value: total.toLocaleString(), label: 'Attendees' },
        { icon: <Award size={22} />, value: `${avg}%`, label: 'Avg CSAT' },
      ]}
    >
      <Card hover={false} className="p-6">
        <h2 className="text-lg font-bold text-sf-blue-15 mb-5">Program Details</h2>
        <ProgramTable programs={programs} color="#066AFE" />
      </Card>
    </ProgramPageLayout>
  );
};

export default CalendarTraining;
