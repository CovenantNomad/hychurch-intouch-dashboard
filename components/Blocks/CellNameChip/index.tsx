import React from 'react';

interface CellNameButtonProps {
  cellId: string;
  cellName: string;
  submissionStatus: boolean;
  onSelectHandler: (id: string, name: string) => void;
}

const CellNameChip = ({ cellId, cellName, submissionStatus, onSelectHandler }: CellNameButtonProps) => {

  return (
    <button 
      onClick={() => onSelectHandler(cellId, cellName)}
      disabled={submissionStatus === false}
      className={`h-9 flex items-center justify-center px-2 rounded-lg ${submissionStatus ? 'bg-blue-500 text-white' : 'bg-gray-300'} disabled:cursor-not-allowed`}
    >
      <span className='text-sm'>{cellName}</span>
    </button>
  );
};

export default CellNameChip;
