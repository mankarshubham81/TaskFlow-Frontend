"use client";

import { memo } from 'react';

const LoadingSpinner = ({ size = 'md', color = 'text-blue-600', className = '' }) => {
  const sizeMap = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const spinnerSize = typeof size === 'number' 
    ? { width: `${size}px`, height: `${size}px` } 
    : sizeMap[size] || sizeMap.md;

  return (
    <div 
      role="status"
      aria-label="Loading"
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        className={`animate-spin ${color} ${typeof size !== 'number' ? spinnerSize : ''}`}
        style={typeof size === 'number' ? spinnerSize : null}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default memo(LoadingSpinner);