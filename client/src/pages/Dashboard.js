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
  const byQuarter = stats?.byQuarter || {};

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-sf-blue-15 tracking-tight">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
        </h1>
        <p className="mt-2 text-lg text-sf-gray-60">FY26 Tech Enablement at a glance — powered by real UDMS data.</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <StatCard icon={<Calendar size={22} />} value={stats?.totalPrograms || 0} label="Total Programs" color="#066AFE" />
        <StatCard icon={<FileText size={22} />} value={(stats?.totalRegistered || 0).toLocaleString()} label="Registered" color="#06A59A" />
        <StatCard icon={<Users size={22} />} value={(stats?.totalAttendees || 0).toLocaleString()} label="Attendees (Completed)" color="#45C65A" />
        <StatCard icon={<TrendingUp size={22} />} value={`${stats?.avgAttendance || 0}%`} label="Avg Attendance %" color="#F38303" />
        <StatCard icon={<Award size={22} />} value={`${stats?.avgCSAT || 0}%`} label="Avg CSAT" color="#BA01FF" />
      </div>

      {/* Quarterly Breakdown */}
      {Object.keys(byQuarter).length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-sf-blue-15 mb-5">By Quarter</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(byQuarter).map(([q, qData]) => (
              <Card key={q} className="p-5">
                <div className="text-xs font-semibold text-sf-gray-60 uppercase tracking-wider mb-2">{q}</div>
                <div className="text-2xl font-bold text-sf-blue-15">{qData.count}</div>
                <div className="text-sm text-sf-gray-60">programs · {qData.attendees.toLocaleString()} attendees</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Programs by Type */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-sf-blue-15 mb-5">Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(programMeta).map(([type, meta]) => {
            const typeData = byType[type] || { count: 0, attendees: 0, avgCSAT: 0 };
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
                      <span className="font-bold text-sf-blue-15">{typeData.count}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sf-gray-60">Registered</span>
                      <span className="font-bold text-sf-blue-15">{typeData.registered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-sf-gray-60">Attended</span>
                      <span className="font-bold text-sf-blue-15">{typeData.attendees.toLocaleString()}</span>
                    </div>
                    {typeData.avgCSAT > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-sf-gray-60">Avg CSAT</span>
                        <span className="font-bold" style={{ color: meta.color }}>{typeData.avgCSAT}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                    >
                      {typeData.count} Sessions
                    </span>
                    <ArrowRight size={14} className="text-sf-gray-80 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Top Programs by Attendance */}
      {data?.programs?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-sf-blue-15 mb-5">Top Programs by Attendance</h2>
          <Card hover={false} className="p-6">
            <div className="space-y-3">
              {[...data.programs]
                .filter(p => p.attendees > 0)
                .sort((a, b) => b.attendees - a.attendees)
                .slice(0, 8)
                .map((p, i) => {
                  const maxAttendees = data.programs.reduce((m, x) => Math.max(m, x.attendees || 0), 1);
                  const meta = programMeta[p.programType] || programMeta['Partnership Programs'];
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 text-right text-sm font-bold text-sf-gray-60">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-sf-blue-15 truncate">{p.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: `${meta.color}15`, color: meta.color }}>
                            {p.programType}
                          </span>
                        </div>
                        <div className="h-2 bg-sf-gray-95 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(p.attendees / maxAttendees) * 100}%`,
                              backgroundColor: meta.color,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-sf-blue-15">{p.attendees.toLocaleString()}</div>
                        {p.attendancePct !== null && (
                          <div className="text-xs text-sf-gray-60">{p.attendancePct}%</div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
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
