import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, StatCard } from './Card';

export default function ProgramPageLayout({ icon, title, subtitle, color, colorLight, stats, children }) {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* Hero banner */}
      <div className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, ${colorLight} 100%)` }}>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full" style={{ transform: 'translate(30%, -30%)' }}>
            {icon && React.cloneElement(icon, { size: 200 })}
          </div>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all mb-4"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              {icon && React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-white/80 text-sm">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} icon={stat.icon} value={stat.value} label={stat.label} color={color} />
          ))}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
