import React from 'react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sf-blue-15 tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sf-gray-60 text-base">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
