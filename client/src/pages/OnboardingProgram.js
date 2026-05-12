import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import './ProgramPages.css';

const OnboardingProgram = () => {
  return (
    <div className="program-page" style={{ '--program-color': '#45C65A' }}>
      <div className="program-header" style={{ background: 'linear-gradient(135deg, #45C65A 0%, #91DB8B 100%)' }}>
        <BookOpen size={60} color="white" />
        <div>
          <h1>Onboarding Program</h1>
          <p>Comprehensive introduction for new team members to T&P ecosystem</p>
        </div>
      </div>

      <div className="program-stats">
        <div className="stat-item">
          <CheckCircle size={32} />
          <div>
            <h3>45</h3>
            <p>Onboarded This Quarter</p>
          </div>
        </div>
        <div className="stat-item">
          <Clock size={32} />
          <div>
            <h3>30 days</h3>
            <p>Avg Onboarding Time</p>
          </div>
        </div>
        <div className="stat-item">
          <BookOpen size={32} />
          <div>
            <h3>15</h3>
            <p>Core Modules</p>
          </div>
        </div>
      </div>

      <div className="program-content card">
        <h2>About Onboarding</h2>
        <p>Our onboarding program ensures every new team member has the knowledge, tools, and support needed to succeed from day one.</p>
      </div>
    </div>
  );
};

export default OnboardingProgram;
