import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';

const OnboardingProgram = () => (
  <ProgramPageLayout
    icon={<BookOpen />}
    title="Onboarding Program"
    subtitle="Comprehensive introduction for new team members to the T&P ecosystem"
    color="#45C65A"
    colorLight="#91DB8B"
    stats={[
      { icon: <CheckCircle size={22} />, value: '45', label: 'Onboarded This Quarter' },
      { icon: <Clock size={22} />, value: '30 days', label: 'Avg Onboarding Time' },
      { icon: <BookOpen size={22} />, value: '15', label: 'Core Modules' },
    ]}
  >
    <h2 className="text-lg font-bold text-sf-blue-15 mb-3">About Onboarding</h2>
    <p className="text-sf-gray-60 leading-relaxed">
      Our onboarding program ensures every new team member has the knowledge, tools, and support needed
      to succeed from day one. The structured 30-day journey covers everything from tools setup to team culture.
    </p>
  </ProgramPageLayout>
);

export default OnboardingProgram;
