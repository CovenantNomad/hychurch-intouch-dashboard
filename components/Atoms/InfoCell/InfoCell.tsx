import React from "react";

interface InfoCellProps {
  title: string;
  value: string | number | null;
}

const InfoCell = ({ title, value }: InfoCellProps) => {
  return (
    <div className="w-full flex items-center text-sm py-3 border-b border-b-GRAY001">
      <span className="mr-auto">{title}</span>
      <span className="text-right">{value}</span>
    </div>
  );
};

export default InfoCell;
