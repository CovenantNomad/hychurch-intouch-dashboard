import React from 'react';

interface SimpleStatOnDarkProps {
  title: string;
  value: string | number;
  unit: string;
}

const SimpleStatOnDark = ({ title, value, unit}: SimpleStatOnDarkProps) => {
  return (
    <div className="flex-1 bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-medium leading-6 text-gray-400">{title}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">{value}</span>
        <span className="text-base text-gray-400">{unit}</span>
      </p>
    </div>
  );
};

export default SimpleStatOnDark;
