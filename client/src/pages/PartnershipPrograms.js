import React, { useState, useEffect } from 'react';
import { HeartHandshake, Globe, Users, Award } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';
import { Card } from '../components/Card';
import ProgramTable from '../components/ProgramTable';
import { fetchProgramData } from '../utils/parseProgamData';

const PartnershipPrograms = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => { fetchProgramData().then((d) => setPrograms(d.programs.filter((p) => p.programType === 'Partnership Programs'))); }, []);

  const total = programs.reduce((s, p) => s + (p.attendees || 0), 0);
  const avg = programs.filter((p) => p.csat).length ? Math.round(programs.filter((p) => p.csat).reduce((s, p) => s + p.csat, 0) / programs.filter((p) => p.csat).length) : 0;

  return (
    <ProgramPageLayout
      icon={<HeartHandshake />} title="Partnership Programs" subtitle="Strategic collaborations with industry leaders and technology partners"
      color="#F38303" colorLight="#FFBA90"
      stats={[
        { icon: <Globe size={22} />, value: programs.length, label: 'Programs' },
        { icon: <Users size={22} />, value: total.toLocaleString(), label: 'Participants' },
        { icon: <Award size={22} />, value: `${avg}%`, label: 'Avg CSAT' },
      ]}
    >
      <Card hover={false} className="p-6">
        <h2 className="text-lg font-bold text-sf-blue-15 mb-5">Program Details</h2>
        <ProgramTable programs={programs} color="#F38303" />
      </Card>
    </ProgramPageLayout>
  );
};

export default PartnershipPrograms;
