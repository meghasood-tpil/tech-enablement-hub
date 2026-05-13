import React from 'react';

export default function ProgressBar({ value, color = '#066AFE', size = 'md', showLabel = true }) {
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 ${heights[size]} bg-sf-gray-95 rounded-full overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && <span className="text-sm font-semibold text-sf-gray-60 min-w-[3ch]">{value}%</span>}
    </div>
  );
}
