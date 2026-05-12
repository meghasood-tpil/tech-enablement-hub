import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, BookOpen, Handshake } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activePrograms: 12,
    totalParticipants: 450,
    completionRate: 87,
    upcomingEvents: 5
  });

  const programTypes = [
    {
      name: 'Calendar Training',
      icon: <Calendar size={40} />,
      color: '#066AFE',
      link: '/programs/calendar-training',
      active: 3
    },
    {
      name: 'Tech Talks',
      icon: <Users size={40} />,
      color: '#BA01FF',
      link: '/programs/tech-talks',
      active: 5
    },
    {
      name: 'Cohort Programs',
      icon: <TrendingUp size={40} />,
      color: '#06A59A',
      link: '/programs/cohorts',
      active: 2
    },
    {
      name: 'Onboarding',
      icon: <BookOpen size={40} />,
      color: '#45C65A',
      link: '/programs/onboarding',
      active: 1
    },
    {
      name: 'Partnerships',
      icon: <Handshake size={40} />,
      color: '#F38303',
      link: '/programs/partnerships',
      active: 1
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Tech Enablement Dashboard</h2>
        <p>Empowering T&P APAC through unified learning experiences</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ borderTop: '4px solid #066AFE' }}>
          <h3>{stats.activePrograms}</h3>
          <p>Active Programs</p>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #06A59A' }}>
          <h3>{stats.totalParticipants}</h3>
          <p>Total Participants</p>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #45C65A' }}>
          <h3>{stats.completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #BA01FF' }}>
          <h3>{stats.upcomingEvents}</h3>
          <p>Upcoming Events</p>
        </div>
      </div>

      <div className="programs-overview">
        <h3>Program Types</h3>
        <div className="programs-grid">
          {programTypes.map((program, index) => (
            <Link to={program.link} key={index} className="program-card">
              <div className="program-icon" style={{ color: program.color }}>
                {program.icon}
              </div>
              <h4>{program.name}</h4>
              <div className="program-badge" style={{ background: program.color }}>
                {program.active} Active
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/planner" className="action-card">
            <div className="action-icon">📋</div>
            <h4>Create Program Plan</h4>
            <p>Auto-generate checklist with timeline</p>
          </Link>
          <Link to="/banner-creator" className="action-card">
            <div className="action-icon">🎨</div>
            <h4>Design Banner</h4>
            <p>Create Slack posts & marketing materials</p>
          </Link>
          <Link to="/reports" className="action-card">
            <div className="action-icon">📊</div>
            <h4>Generate Report</h4>
            <p>Upload L++ data for insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
