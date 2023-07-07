import React from 'react';
import Button from '../../../Atoms/Button/Button';

interface AttendanceFormSectionProps {}

const AttendanceFormSection = ({}: AttendanceFormSectionProps) => {
  return (
    <div>
      <div className='flex justify-center'>
        <h3 className='text-xl font-bold'>출석체크 데시보드</h3>
      </div>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 mt-8 lg:grid-cols-6'>
        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            전체 출석인원(수기측정)
          </label>
          <div className="mt-2 flex gap-x-4">
            <input
              type="text"
              name="totalNumber"
              className="inline-block flex-1 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className='flex'>
              <Button onClick={() => {}} outline={false}>
                <span>저장</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            리더들이 제출 한 출석인원
          </label>
          <div className="mt-2">
            <p
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {`${242}명`}
            </p>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            익명 출석인원
          </label>
          <div className="mt-2">
            <p
              className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {`${80}명`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendanceFormSection;
