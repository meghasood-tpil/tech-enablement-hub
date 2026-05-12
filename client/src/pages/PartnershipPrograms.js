import React from 'react';
import { Handshake, Globe, Zap } from 'lucide-react';
import './ProgramPages.css';

const PartnershipPrograms = () => {
  return (
    <div className="program-page" style={{ '--program-color': '#F38303' }}>
      <div className="program-header" style={{ background: 'linear-gradient(135deg, #F38303 0%, #FFBA90 100%)' }}>
        <Handshake size={60} color="white" />
        <div>
          <h1>Partnership Programs</h1>
          <p>Strategic collaborations with industry leaders and technology partners</p>
        </div>
      </div>

      <div className="program-stats">
        <div className="stat-item">
          <Handshake size={32} />
          <div>
            <h3>12</h3>
            <p>Active Partnerships</p>
          </div>
        </div>
        <div className="stat-item">
          <Globe size={32} />
          <div>
            <h3>8</h3>
            <p>Countries</p>
          </div>
        </div>
        <div className="stat-item">
          <Zap size={32} />
          <div>
            <h3>24</h3>
            <p>Joint Initiatives</p>
          </div>
        </div>
      </div>

      <div className="program-content card">
        <h2>About Partnerships</h2>
        <p>We collaborate with leading technology companies and educational institutions to bring world-class learning experiences to our teams.</p>
      </div>
    </div>
  );
};

export default PartnershipPrograms;
