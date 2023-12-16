import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

type NoSearchResultProps = {}

const NoSearchResult = ({}: NoSearchResultProps) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='py-6'>
        <MagnifyingGlassIcon className='h-10 w-10'/>
      </div>
      <p className='text-xl font-bold'>No Result Found</p>
      <p className='whitespace-pre mt-4'>{`입력하신 조건의 검색결과를 찾을 수 없습니다\n다른조건으로 검색해주세요`}</p>
    </div>
  );
};

export default NoSearchResult;
