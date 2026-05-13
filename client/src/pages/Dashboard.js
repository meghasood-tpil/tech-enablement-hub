import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, TrendingUp, BookOpen, HeartHandshake, ArrowRight, FileText, Award, Activity, RefreshCw } from 'lucide-react';
import { Card, StatCard } from '../components/Card';
import { fetchProgramData } from '../utils/parseProgamData';

const programMeta = {
  'Tech Talks':          { icon: <Users size={28} />,      color: '#BA01FF', bg: '#F9F0FF', link: '/programs/tech-talks',        desc: 'Expert-led sessions' },
  'Calendar Training':   { icon: <Calendar size={28} />,   color: '#066AFE', bg: '#EDF4FF', link: '/programs/calendar-training',  desc: 'Scheduled learning paths' },
  'Cohort Programs':     { icon: <TrendingUp size={28} />, color: '#06A59A', bg: '#DEF9F3', link: '/programs/cohorts',            desc: 'Workshops & deep dives' },
  'Onboarding Program':  { icon: <BookOpen size={28} />,   color: '#45C65A', bg: '#EBF7E6', link: '/programs/onboarding',         desc: 'New member setup' },
  'Partnership Programs':{ icon: <HeartHandshake size={28} />,  color: '#F38303', bg: '#FFF1EA', link: '/programs/partnerships',       desc: 'Strategic collaborations' },
};

const quickActions = [
  { to: '/planner', icon: <FileText size={24} />, title: 'Create Program Plan', desc: 'Auto-generate checklist with timeline', color: '#066AFE' },
  { to: '/banner-creator', icon: <Award size={24} />, title: 'Design Banner', desc: 'Create Slack posts & marketing materials', color: '#BA01FF' },
  { to: '/reports', icon: <Activity size={24} />, title: 'Generate Report', desc: 'Upload L++ data for insights', color: '#06A59A' },
];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgramData()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <RefreshCw size={28} className="animate-spin text-sf-blue-50" />
      </div>
    );
  }

  const stats = data?.stats;
  const byType = stats?.byType || {};

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-sf-blue-15 tracking-tight">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
        </h1>
        <p className="mt-2 text-lg text-sf-gray-60">CY2026 Tech Enablement at a glance — powered by real program data.</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
        <StatCard icon={<Calendar size={22} />} value={stats?.totalPrograms || 0} label="Total Programs" color="#066AFE" />
        <StatCard icon={<FileText size={22} />} value={(stats?.totalRegistered || 0).toLocaleString()} label="Registered" color="#06A59A" />
        <StatCard icon={<Users size={22} />} value={(stats?.totalAttendees || 0).toLocaleString()} label="Attendees" color="#45C65A" />
        <StatCard icon={<TrendingUp size={22} />} value={`${stats?.avgAttendance || 0}%`} label="Avg Attendance" color="#F38303" />
        <StatCard icon={<Award size={22} />} value={`${stats?.avgCSAT || 0}%`} label="Learner CSAT" color="#BA01FF" />
        <StatCard icon={<Activity size={22} />} value={`${stats?.avgTrainerCSAT || 0}%`} label="Trainer CSAT" color="#066AFE" />
      </div>

      {/* Programs by Type */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-sf-blue-15 mb-5">Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(programMeta).map(([type, meta]) => {
            const td = byType[type] || { count: 0, attendees: 0, registered: 0, avgCSAT: 0, avgTrainerCSAT: 0 };
            return (
              <Link key={type} to={meta.link} className="group">
                <Card className="p-5 h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <h3 className="text-sm font-bold text-sf-blue-15 mb-1">{type}</h3>
                  <p className="text-xs text-sf-gray-60 mb-3">{meta.desc}</p>
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-sf-gray-60">Sessions</span>
                      <span className="font-bold text-sf-blue-15">{td.count}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sf-gray-60">Registered</span>
                      <span className="font-bold text-sf-blue-15">{td.registered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sf-gray-60">Attended</span>
                      <span className="font-bold text-sf-blue-15">{td.attendees.toLocaleString()}</span>
                    </div>
                    {td.avgCSAT > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-sf-gray-60">Learner CSAT</span>
                        <span className="font-bold" style={{ color: meta.color }}>{td.avgCSAT}%</span>
                      </div>
                    )}
                    {td.avgTrainerCSAT > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-sf-gray-60">Trainer CSAT</span>
                        <span className="font-bold text-sf-blue-50">{td.avgTrainerCSAT}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                    >
                      {td.count} Sessions
                    </span>
                    <ArrowRight size={14} className="text-sf-gray-80 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* All Programs Table */}
      {data?.programs?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-sf-blue-15 mb-5">All Programs</h2>
          <Card hover={false} className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sf-gray-95">
                  <th className="text-left py-3 pr-4 font-semibold text-sf-gray-60">Program</th>
                  <th className="text-left py-3 pr-4 font-semibold text-sf-gray-60">Type</th>
                  <th className="text-left py-3 pr-4 font-semibold text-sf-gray-60">Trainer</th>
                  <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Registered</th>
                  <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Attended</th>
                  <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Attendance %</th>
                  <th className="text-right py-3 pr-4 font-semibold text-sf-gray-60">Learner CSAT</th>
                  <th className="text-right py-3 font-semibold text-sf-gray-60">Trainer CSAT</th>
                </tr>
              </thead>
              <tbody>
                {data.programs.map((p, i) => {
                  const meta = programMeta[p.programType] || programMeta['Partnership Programs'];
                  return (
                    <tr key={i} className="border-b border-sf-gray-95 last:border-0 hover:bg-sf-gray-95 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-sf-blue-15">{p.name}</div>
                        <div className="text-xs text-sf-gray-60">{p.startDate} — {p.endDate}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${meta.color}15`, color: meta.color }}>
                          {p.offeringType}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sf-blue-15">{p.trainerName || '—'}</td>
                      <td className="py-3 pr-4 text-right font-medium text-sf-blue-15">{p.registered ?? '—'}</td>
                      <td className="py-3 pr-4 text-right font-medium text-sf-blue-15">{p.attendees ?? '—'}</td>
                      <td className="py-3 pr-4 text-right">
                        {p.attendancePct !== null ? (
                          <span className={`font-medium ${p.attendancePct >= 85 ? 'text-sf-green-50' : p.attendancePct >= 70 ? 'text-sf-orange-65' : 'text-sf-pink-40'}`}>
                            {p.attendancePct}%
                          </span>
                        ) : '—'}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        {p.csat !== null ? <span className="font-medium text-sf-violet-50">{p.csat}%</span> : '—'}
                      </td>
                      <td className="py-3 text-right">
                        {p.trainerCSAT !== null ? <span className="font-medium text-sf-blue-50">{p.trainerCSAT}%</span> : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

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
