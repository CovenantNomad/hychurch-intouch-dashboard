import React from 'react';

interface CellDallantListProps {
  children: React.ReactNode;
  cellName: string;
  bgColor: string;
  titleColor: string;
}

const CellDallantList = ({ children, cellName, bgColor, titleColor }: CellDallantListProps) => {
  return (
    <div className={`px-4 py-4 rounded-md ${bgColor}`}>
      <h3 className={`text-xl font-bold ${titleColor}`}>{cellName}</h3>
      <div className='flex flex-col gap-y-3 mt-4'>
        {children}
      </div>
    </div>
  );
};

export default CellDallantList;
