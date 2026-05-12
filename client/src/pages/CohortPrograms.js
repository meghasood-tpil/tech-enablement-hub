import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import './ProgramPages.css';

const CohortPrograms = () => {
  return (
    <div className="program-page" style={{ '--program-color': '#06A59A' }}>
      <div className="program-header" style={{ background: 'linear-gradient(135deg, #06A59A 0%, #04E1CB 100%)' }}>
        <TrendingUp size={60} color="white" />
        <div>
          <h1>Cohort Programs</h1>
          <p>Collaborative learning journeys with peer groups and mentorship</p>
        </div>
      </div>

      <div className="program-stats">
        <div className="stat-item">
          <Users size={32} />
          <div>
            <h3>8</h3>
            <p>Active Cohorts</p>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp size={32} />
          <div>
            <h3>156</h3>
            <p>Participants</p>
          </div>
        </div>
        <div className="stat-item">
          <Target size={32} />
          <div>
            <h3>94%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="program-content card">
        <h2>About Cohort Programs</h2>
        <p>Cohort-based learning creates powerful peer networks where engineers learn together, share experiences, and build lasting professional relationships.</p>
      </div>
    </div>
  );
};

export default CohortPrograms;
