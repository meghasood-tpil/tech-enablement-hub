import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Users, Award } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';
import { Card } from '../components/Card';
import ProgramTable from '../components/ProgramTable';
import { fetchProgramData } from '../utils/parseProgamData';

const OnboardingProgram = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => { fetchProgramData().then((d) => setPrograms(d.programs.filter((p) => p.programType === 'Onboarding Program'))); }, []);

  const total = programs.reduce((s, p) => s + (p.attendees || 0), 0);
  const avg = programs.filter((p) => p.csat).length ? Math.round(programs.filter((p) => p.csat).reduce((s, p) => s + p.csat, 0) / programs.filter((p) => p.csat).length) : 0;

  return (
    <ProgramPageLayout
      icon={<BookOpen />} title="Onboarding Program" subtitle="Comprehensive introduction for new team members to the T&P ecosystem"
      color="#45C65A" colorLight="#91DB8B"
      stats={[
        { icon: <CheckCircle size={22} />, value: programs.length, label: 'Sessions' },
        { icon: <Users size={22} />, value: total.toLocaleString(), label: 'Onboarded' },
        { icon: <Award size={22} />, value: `${avg}%`, label: 'Avg CSAT' },
      ]}
    >
      <Card hover={false} className="p-6">
        <h2 className="text-lg font-bold text-sf-blue-15 mb-5">Program Details</h2>
        <ProgramTable programs={programs} color="#45C65A" />
      </Card>
    </ProgramPageLayout>
  );
};

export default OnboardingProgram;
