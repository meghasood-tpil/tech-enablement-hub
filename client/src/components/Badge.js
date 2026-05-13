import React from 'react';

export default function Badge({ children, color = '#066AFE', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={{ backgroundColor: `${color}18`, color }}
    >
      {children}
    </span>
  );
}
