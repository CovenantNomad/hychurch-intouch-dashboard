import React, { useState } from 'react';
import CreateSeasonModal from '../CreateSeasonModal';

interface CreateSeasonProps {}

const CreateSeason = ({}: CreateSeasonProps) => {
  const [ open, setOpen ] = useState(false)

  return (
    <div className='py-8'>
      <div className='flex justify-center'>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600/80"
        >
          새로운 시즌 시작하기
        </button>
      </div>
      <CreateSeasonModal 
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default CreateSeason;
