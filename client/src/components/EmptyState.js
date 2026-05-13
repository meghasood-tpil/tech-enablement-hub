import React from 'react';

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {icon && <div className="mb-4 text-sf-gray-80">{icon}</div>}
      <h3 className="text-lg font-semibold text-sf-blue-15 mb-1">{title}</h3>
      {description && <p className="text-sf-gray-60 text-sm max-w-md mb-6">{description}</p>}
      {action}
    </div>
  );
}
