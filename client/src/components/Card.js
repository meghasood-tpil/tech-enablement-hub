import React from 'react';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card ${hover ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon, value, label, color = 'sf-blue-50' }) {
  return (
    <Card className="p-6 group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-opacity-10 transition-transform duration-300 group-hover:scale-110`}
             style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-sf-blue-15">{value}</div>
          <div className="text-sm text-sf-gray-60">{label}</div>
        </div>
      </div>
    </Card>
  );
}
