import React, { Dispatch, SetStateAction } from 'react';

interface CellNameButtonProps {
  cellId: string;
  cellName: string;
  onSelectHandler: (id: string, name: string) => void;
}

const CellNameChip = ({ cellId, cellName, onSelectHandler }: CellNameButtonProps) => {
  return (
    <button 
      onClick={() => onSelectHandler(cellId, cellName)}
      className='h-9 flex items-center justify-center px-2 rounded-lg bg-white/40'
    >
      <span className='text-sm'>{cellName}</span>
    </button>
  );
};

export default CellNameChip;
