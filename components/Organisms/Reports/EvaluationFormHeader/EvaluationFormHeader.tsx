import React, { useState } from 'react';

type EvaluationFormHeaderProps = {}

const EvaluationFormHeader = ({}: EvaluationFormHeaderProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className='lg:relative lg:h-10'>
      <div className='flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2'>
        <h3 className='text-xl font-bold'>출석체크 데시보드</h3>
      </div>
      <div className='flex justify-end items-center mt-8 lg:my-auto lg:ml-auto lg:mt-0'>
        <div className='flex justify-center items-center mr-6'>
          <button
            onClick={() => setIsOpen(true)}
          >
            {/* <CalculatorIcon className='h-6 w-6 text-gray-800'/> */}
          </button>
        </div>
      </div>
      {/* <AttendanceInputModal 
        open={isOpen}
        setOpen={setIsOpen}
      /> */}
    </div>
  );
};

export default EvaluationFormHeader;
