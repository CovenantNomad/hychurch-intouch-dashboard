import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import EvaluationSettingModal from '../EvaluationSettingModal';
import { EvaluationSettingType } from '../../../../interface/EvaluationFormTypes';

type EvaluationFormHeaderProps = {
  setting: EvaluationSettingType | null | undefined
}

const EvaluationFormHeader = ({ setting }: EvaluationFormHeaderProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className='relative h-10 flex justify-center items-center'>
      <h3 className='text-xl font-bold'>셀평가서</h3>
      <div className='absolute right-0 translate-y-1.5'>
        <button
          onClick={() => setIsOpen(true)}
        >
          <Cog6ToothIcon className='h-6 w-6 text-gray-800'/>
        </button>
      </div>
      <EvaluationSettingModal 
        open={isOpen}
        setOpen={setIsOpen}
        setting={setting}
      />
    </div>
  );
};

export default EvaluationFormHeader;
