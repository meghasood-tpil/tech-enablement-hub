import React from 'react';
import { HeartHandshake, Globe, Zap } from 'lucide-react';
import ProgramPageLayout from '../components/ProgramPageLayout';

const PartnershipPrograms = () => (
  <ProgramPageLayout
    icon={<HeartHandshake />}
    title="Partnership Programs"
    subtitle="Strategic collaborations with industry leaders and technology partners"
    color="#F38303"
    colorLight="#FFBA90"
    stats={[
      { icon: <HeartHandshake size={22} />, value: '12', label: 'Active Partnerships' },
      { icon: <Globe size={22} />, value: '8', label: 'Countries' },
      { icon: <Zap size={22} />, value: '24', label: 'Joint Initiatives' },
    ]}
  >
    <h2 className="text-lg font-bold text-sf-blue-15 mb-3">About Partnerships</h2>
    <p className="text-sf-gray-60 leading-relaxed">
      We collaborate with leading technology companies and educational institutions to bring world-class
      learning experiences to our teams across 8 countries in the APAC region.
    </p>
  </ProgramPageLayout>
);

export default PartnershipPrograms;
