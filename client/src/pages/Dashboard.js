import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, BookOpen, Handshake, ArrowRight, Clipboard, Palette, BarChart3 } from 'lucide-react';
import { Card, StatCard } from '../components/Card';

const programTypes = [
  { name: 'Calendar Training', icon: <Calendar size={28} />, color: '#066AFE', bg: '#EDF4FF', link: '/programs/calendar-training', active: 3, desc: 'Scheduled learning paths' },
  { name: 'Tech Talks', icon: <Users size={28} />, color: '#BA01FF', bg: '#F9F0FF', link: '/programs/tech-talks', active: 5, desc: 'Expert-led sessions' },
  { name: 'Cohort Programs', icon: <TrendingUp size={28} />, color: '#06A59A', bg: '#DEF9F3', link: '/programs/cohorts', active: 2, desc: 'Peer group learning' },
  { name: 'Onboarding', icon: <BookOpen size={28} />, color: '#45C65A', bg: '#EBF7E6', link: '/programs/onboarding', active: 1, desc: 'New member setup' },
  { name: 'Partnerships', icon: <Handshake size={28} />, color: '#F38303', bg: '#FFF1EA', link: '/programs/partnerships', active: 1, desc: 'Strategic collaborations' },
];

const quickActions = [
  { to: '/planner', icon: <Clipboard size={24} />, title: 'Create Program Plan', desc: 'Auto-generate checklist with timeline', color: '#066AFE' },
  { to: '/banner-creator', icon: <Palette size={24} />, title: 'Design Banner', desc: 'Create Slack posts & marketing materials', color: '#BA01FF' },
  { to: '/reports', icon: <BarChart3 size={24} />, title: 'Generate Report', desc: 'Upload L++ data for insights', color: '#06A59A' },
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-sf-blue-15 tracking-tight">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
        </h1>
        <p className="mt-2 text-lg text-sf-gray-60">Here's what's happening across Tech Enablement.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<Calendar size={22} />} value="12" label="Active Programs" color="#066AFE" />
        <StatCard icon={<Users size={22} />} value="450" label="Participants" color="#06A59A" />
        <StatCard icon={<TrendingUp size={22} />} value="87%" label="Completion Rate" color="#45C65A" />
        <StatCard icon={<BarChart3 size={22} />} value="5" label="Upcoming Events" color="#BA01FF" />
      </div>

      {/* Programs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-sf-blue-15">Programs</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programTypes.map((program) => (
            <Link key={program.name} to={program.link} className="group">
              <Card className="p-5 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: program.bg, color: program.color }}
                >
                  {program.icon}
                </div>
                <h3 className="text-sm font-bold text-sf-blue-15 mb-1">{program.name}</h3>
                <p className="text-xs text-sf-gray-60 mb-3">{program.desc}</p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${program.color}15`, color: program.color }}
                  >
                    {program.active} Active
                  </span>
                  <ArrowRight size={14} className="text-sf-gray-80 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-sf-blue-15 mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} className="group">
              <Card className="p-6 h-full flex flex-col">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${action.color}12`, color: action.color }}
                >
                  {action.icon}
                </div>
                <h3 className="text-base font-bold text-sf-blue-15 mb-1">{action.title}</h3>
                <p className="text-sm text-sf-gray-60 flex-1">{action.desc}</p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold transition-colors"
                     style={{ color: action.color }}>
                  Get started
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
