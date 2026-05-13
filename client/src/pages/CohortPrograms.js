import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';
import { Card } from '../components/Card';
import ProgramTable from '../components/ProgramTable';
import { fetchProgramData } from '../utils/parseProgamData';

const CohortPrograms = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => { fetchProgramData().then((d) => setPrograms(d.programs.filter((p) => p.programType === 'Cohort Programs'))); }, []);

  const total = programs.reduce((s, p) => s + (p.attendees || 0), 0);
  const avg = programs.filter((p) => p.csat).length ? Math.round(programs.filter((p) => p.csat).reduce((s, p) => s + p.csat, 0) / programs.filter((p) => p.csat).length) : 0;

  return (
    <ProgramPageLayout
      icon={<TrendingUp />} title="Cohort Programs" subtitle="Collaborative learning journeys with peer groups and mentorship"
      color="#06A59A" colorLight="#04E1CB"
      stats={[
        { icon: <TrendingUp size={22} />, value: programs.length, label: 'Programs' },
        { icon: <Users size={22} />, value: total.toLocaleString(), label: 'Participants' },
        { icon: <Award size={22} />, value: `${avg}%`, label: 'Avg CSAT' },
      ]}
    >
      <Card hover={false} className="p-6">
        <h2 className="text-lg font-bold text-sf-blue-15 mb-5">Program Details</h2>
        <ProgramTable programs={programs} color="#06A59A" />
      </Card>
    </ProgramPageLayout>
  );
};

export default CohortPrograms;
