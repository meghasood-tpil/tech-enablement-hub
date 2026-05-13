import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';

const CohortPrograms = () => (
  <ProgramPageLayout
    icon={<TrendingUp />}
    title="Cohort Programs"
    subtitle="Collaborative learning journeys with peer groups and mentorship"
    color="#06A59A"
    colorLight="#04E1CB"
    stats={[
      { icon: <Users size={22} />, value: '8', label: 'Active Cohorts' },
      { icon: <TrendingUp size={22} />, value: '156', label: 'Participants' },
      { icon: <Target size={22} />, value: '94%', label: 'Success Rate' },
    ]}
  >
    <h2 className="text-lg font-bold text-sf-blue-15 mb-3">About Cohort Programs</h2>
    <p className="text-sf-gray-60 leading-relaxed">
      Cohort-based learning creates powerful peer networks where engineers learn together, share experiences,
      and build lasting professional relationships. Each cohort runs for 8–12 weeks with weekly sessions and hands-on projects.
    </p>
  </ProgramPageLayout>
);

export default CohortPrograms;
