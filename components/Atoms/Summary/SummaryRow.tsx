import React from "react";

interface SummaryRowProps {
  title: string;
  value: string;
}

const SummaryRow = ({ title, value }: SummaryRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm text-gray-600">{title}</dt>
      <dd className="text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
};

export default SummaryRow;
