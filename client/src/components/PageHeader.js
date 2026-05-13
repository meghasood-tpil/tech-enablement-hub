import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ title, subtitle, actions }) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-card hover:shadow-card-hover transition-all text-sf-gray-60 hover:text-sf-blue-50"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-sf-blue-15 tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sf-gray-60 text-base">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
