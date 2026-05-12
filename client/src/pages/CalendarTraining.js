import React from 'react';
import { Calendar, BookOpen, Award } from 'lucide-react';
import './ProgramPages.css';

const CalendarTraining = () => {
  return (
    <div className="program-page" style={{ '--program-color': '#066AFE' }}>
      <div className="program-header" style={{ background: 'linear-gradient(135deg, #066AFE 0%, #90D0FE 100%)' }}>
        <Calendar size={60} color="white" />
        <div>
          <h1>Calendar Training Programs</h1>
          <p>Structured learning paths with scheduled sessions and milestones</p>
        </div>
      </div>

      <div className="program-stats">
        <div className="stat-item">
          <BookOpen size={32} />
          <div>
            <h3>12</h3>
            <p>Active Programs</p>
          </div>
        </div>
        <div className="stat-item">
          <Calendar size={32} />
          <div>
            <h3>450</h3>
            <p>Participants</p>
          </div>
        </div>
        <div className="stat-item">
          <Award size={32} />
          <div>
            <h3>89%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>

      <div className="program-content card">
        <h2>About Calendar Training</h2>
        <p>Our Calendar Training programs provide structured, time-bound learning experiences with clearly defined milestones and objectives.</p>
      </div>
    </div>
  );
};

export default CalendarTraining;
