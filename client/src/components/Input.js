import React from 'react';

export function Input({ label, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-sf-blue-15">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border border-sf-gray-80 bg-white text-sf-blue-15
          placeholder:text-sf-gray-60 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-sf-blue-50 focus:ring-opacity-30 focus:border-sf-blue-50
          ${className}`}
        {...props}
      />
    </div>
  );
}

export function Select({ label, children, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-sf-blue-15">{label}</label>}
      <select
        className={`w-full px-4 py-2.5 rounded-xl border border-sf-gray-80 bg-white text-sf-blue-15
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-sf-blue-50 focus:ring-opacity-30 focus:border-sf-blue-50
          ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
