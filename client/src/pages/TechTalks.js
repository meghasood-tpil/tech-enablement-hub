import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import './ProgramPages.css';

const TechTalks = () => {
  const upcomingTalks = [
    { title: 'AI & Trust in Platform Development', date: '2026-05-20', speaker: 'Sarah Chen', attendees: 85 },
    { title: 'Microservices Architecture Patterns', date: '2026-05-27', speaker: 'Raj Kumar', attendees: 72 },
    { title: 'Security First: API Design', date: '2026-06-03', speaker: 'Emily Rodriguez', attendees: 68 }
  ];

  return (
    <div className="program-page" style={{ '--program-color': '#BA01FF' }}>
      <div className="program-header" style={{ background: 'linear-gradient(135deg, #BA01FF 0%, #D17DFE 100%)' }}>
        <Users size={60} color="white" />
        <div>
          <h1>Tech Talks</h1>
          <p>Expert-led sessions on cutting-edge technologies and best practices</p>
        </div>
      </div>

      <div className="program-stats">
        <div className="stat-item">
          <Calendar size={32} />
          <div>
            <h3>45</h3>
            <p>Talks This Year</p>
          </div>
        </div>
        <div className="stat-item">
          <Users size={32} />
          <div>
            <h3>1,250</h3>
            <p>Total Attendees</p>
          </div>
        </div>
        <div className="stat-item">
          <Clock size={32} />
          <div>
            <h3>60 min</h3>
            <p>Avg Duration</p>
          </div>
        </div>
      </div>

      <div className="program-content card">
        <h2>Upcoming Tech Talks</h2>
        <div className="events-list">
          {upcomingTalks.map((talk, index) => (
            <div key={index} className="event-card">
              <div className="event-date">{talk.date}</div>
              <div className="event-details">
                <h3>{talk.title}</h3>
                <p>Speaker: {talk.speaker} • Expected: {talk.attendees} attendees</p>
              </div>
              <button className="btn btn-primary btn-sm">Register</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTalks;
