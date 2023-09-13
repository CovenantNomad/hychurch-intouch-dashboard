import React from 'react';

interface SeasonOffSectionProps {}

const SeasonOffSection = ({}: SeasonOffSectionProps) => {
  return (
    <div className='py-8'>
      <h2 className='text-lg font-medium leading-6 text-gray-900 text-center'>달란트 통장이 활성화되지 않았습니다.</h2>
      <p className='text-base font-normal leading-6 text-gray-500 text-center mt-2'>[달란트 세팅] 탭에서 새로운 시즌을 시작해주세요</p>
    </div>
  );
};

export default SeasonOffSection;
