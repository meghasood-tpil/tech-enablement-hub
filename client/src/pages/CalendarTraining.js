import React from 'react';
import { Calendar, BookOpen, Award } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';

const CalendarTraining = () => (
  <ProgramPageLayout
    icon={<Calendar />}
    title="Calendar Training Programs"
    subtitle="Structured learning paths with scheduled sessions and milestones"
    color="#066AFE"
    colorLight="#90D0FE"
    stats={[
      { icon: <BookOpen size={22} />, value: '12', label: 'Active Programs' },
      { icon: <Calendar size={22} />, value: '450', label: 'Participants' },
      { icon: <Award size={22} />, value: '89%', label: 'Completion Rate' },
    ]}
  >
    <h2 className="text-lg font-bold text-sf-blue-15 mb-3">About Calendar Training</h2>
    <p className="text-sf-gray-60 leading-relaxed">
      Our Calendar Training programs provide structured, time-bound learning experiences with clearly defined milestones and objectives.
      Each program follows a set schedule to ensure consistent progress and measurable outcomes for all participants.
    </p>
  </ProgramPageLayout>
);

export default CalendarTraining;
