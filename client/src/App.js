import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProgramPlanner = lazy(() => import('./pages/ProgramPlanner'));
const BannerCreator = lazy(() => import('./pages/BannerCreator'));
const ReportGenerator = lazy(() => import('./pages/ReportGenerator'));
const CalendarTraining = lazy(() => import('./pages/CalendarTraining'));
const TechTalks = lazy(() => import('./pages/TechTalks'));
const CohortPrograms = lazy(() => import('./pages/CohortPrograms'));
const OnboardingProgram = lazy(() => import('./pages/OnboardingProgram'));
const PartnershipPrograms = lazy(() => import('./pages/PartnershipPrograms'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-3 border-sf-blue-80 border-t-sf-blue-50 rounded-full animate-spin" />
    </div>
  );
}

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/planner', label: 'Planner' },
  { to: '/banner-creator', label: 'Banners' },
  { to: '/reports', label: 'Reports' },
];

const programLinks = [
  { to: '/programs/calendar-training', label: 'Calendar Training', color: '#066AFE' },
  { to: '/programs/tech-talks', label: 'Tech Talks', color: '#BA01FF' },
  { to: '/programs/cohorts', label: 'Cohort Programs', color: '#06A59A' },
  { to: '/programs/onboarding', label: 'Onboarding', color: '#45C65A' },
  { to: '/programs/partnerships', label: 'Partnerships', color: '#F38303' },
];

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProgramsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isPrograms = location.pathname.startsWith('/programs');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-sf-blue-50 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-sf-blue-15 tracking-tight">Tech Enablement</span>
              <span className="hidden sm:inline text-xs text-sf-gray-60 ml-2 font-medium">T&P APAC</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive
                    ? 'bg-sf-blue-95 text-sf-blue-50'
                    : 'text-sf-gray-60 hover:text-sf-blue-15 hover:bg-sf-gray-95'}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Programs dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProgramsOpen(p => !p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isPrograms
                    ? 'bg-sf-blue-95 text-sf-blue-50'
                    : 'text-sf-gray-60 hover:text-sf-blue-15 hover:bg-sf-gray-95'}`}
              >
                Programs
                <svg className={`inline ml-1 w-3.5 h-3.5 transition-transform ${programsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {programsOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-elevated border border-sf-gray-95 py-2 animate-slide-down">
                  {programLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setProgramsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                        ${isActive ? 'bg-sf-blue-95 text-sf-blue-50' : 'text-sf-blue-15 hover:bg-sf-gray-95'}`
                      }
                    >
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: link.color }} />
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-sf-gray-95 text-sf-gray-60"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sf-gray-95 bg-white animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium
                  ${isActive ? 'bg-sf-blue-95 text-sf-blue-50' : 'text-sf-gray-60'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 mt-2 border-t border-sf-gray-95">
              <p className="px-3 py-1 text-xs font-semibold text-sf-gray-60 uppercase tracking-wider">Programs</p>
              {programLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                    ${isActive ? 'bg-sf-blue-95 text-sf-blue-50' : 'text-sf-blue-15'}`
                  }
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: link.color }} />
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sf-gray-95 bg-opacity-50">
        <Navigation />
        <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
