import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import ProgramPlanner from './pages/ProgramPlanner';
import BannerCreator from './pages/BannerCreator';
import ReportGenerator from './pages/ReportGenerator';
import CalendarTraining from './pages/CalendarTraining';
import TechTalks from './pages/TechTalks';
import CohortPrograms from './pages/CohortPrograms';
import OnboardingProgram from './pages/OnboardingProgram';
import PartnershipPrograms from './pages/PartnershipPrograms';

function Navigation() {
  const location = useLocation();
  const [showProgramsMenu, setShowProgramsMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">⚡</div>
        <h1>Tech Enablement Hub</h1>
        <p className="brand-subtitle">T&P APAC</p>
      </div>

      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/planner" className={isActive('/planner') ? 'active' : ''}>
          Program Planner
        </Link>
        <Link to="/banner-creator" className={isActive('/banner-creator') ? 'active' : ''}>
          Banner Creator
        </Link>
        <Link to="/reports" className={isActive('/reports') ? 'active' : ''}>
          Reports
        </Link>

        <div
          className="programs-dropdown"
          onMouseEnter={() => setShowProgramsMenu(true)}
          onMouseLeave={() => setShowProgramsMenu(false)}
        >
          <span className="dropdown-trigger">Programs ▾</span>
          {showProgramsMenu && (
            <div className="dropdown-menu">
              <Link to="/programs/calendar-training">Calendar Training</Link>
              <Link to="/programs/tech-talks">Tech Talks</Link>
              <Link to="/programs/cohorts">Cohort Programs</Link>
              <Link to="/programs/onboarding">Onboarding</Link>
              <Link to="/programs/partnerships">Partnerships</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<ProgramPlanner />} />
            <Route path="/banner-creator" element={<BannerCreator />} />
            <Route path="/reports" element={<ReportGenerator />} />
            <Route path="/programs/calendar-training" element={<CalendarTraining />} />
            <Route path="/programs/tech-talks" element={<TechTalks />} />
            <Route path="/programs/cohorts" element={<CohortPrograms />} />
            <Route path="/programs/onboarding" element={<OnboardingProgram />} />
            <Route path="/programs/partnerships" element={<PartnershipPrograms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
