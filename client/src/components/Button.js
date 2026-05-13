import React from 'react';

const variants = {
  primary: 'bg-sf-blue-50 text-white hover:bg-sf-blue-30 active:bg-sf-blue-15',
  secondary: 'bg-sf-blue-95 text-sf-blue-50 hover:bg-sf-blue-80 active:bg-sf-blue-30 active:text-white',
  ghost: 'bg-transparent text-sf-gray-60 hover:bg-sf-gray-95 hover:text-sf-blue-15',
  danger: 'bg-sf-pink-95 text-sf-pink-40 hover:bg-sf-pink-60 hover:text-white',
  teal: 'bg-sf-teal-60 text-white hover:bg-sf-teal-40',
  violet: 'bg-sf-violet-50 text-white hover:bg-sf-violet-30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
