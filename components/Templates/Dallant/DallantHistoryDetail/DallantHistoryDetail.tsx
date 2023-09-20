import React, { useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import { useRouter } from 'next/router';
import { convertSecondToDate } from '../../../../utils/dateUtils';
import { PencilIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast';

interface DallantHistoryDetailProps {}

const DallantHistoryDetail = ({}: DallantHistoryDetailProps) => {
  const [ isEdit, setIsEdit ] = useState(false)
  const router = useRouter()
  const { docId, amount, totalAmount, description, createdTimestamp } = router.query

  if (amount && totalAmount && description && createdTimestamp) {
    return (
      <BlockContainer firstBlock>
        <div className='max-w-xl px-8 pt-16 pb-12 my-8 mx-auto border border-gray-300 shadow-sm'>
          <div className='pb-9'>
            <p className='text-blue-600 mb-1'>{convertSecondToDate(Number(createdTimestamp)).format('YYYY.MM.DD')}</p>
            <h1 className='text-3xl font-bold'>{description}</h1>
          </div>
          <div className='h-[2px] bg-gray-300 rounded-full'/>
          <div className='pt-4'>
            <div className='flex justify-between py-5'>
              <span className='text-gray-500'>적립시간</span>
              <span className='text-gray-900 tracking-wide'>{convertSecondToDate(Number(createdTimestamp)).format('YYYY.MM.DD HH:mm:ss')}</span>
            </div>
            <div className='flex justify-between py-5'>
              <span className='text-gray-500'>적립금액</span>
              <span className='text-gray-900 tracking-wide'>+ {amount} 적립</span>
            </div>
            <div className='flex justify-between py-5'>
              <span className='text-gray-500'>적립 후 총액</span>
              <span className='text-gray-900 tracking-wide'>총 {totalAmount} 달란트</span>
            </div>
          </div>
          <div className='flex gap-x-6 mt-20'>
            <div 
              onClick={() => setIsEdit(!isEdit)}
              className='p-6 bg-cyan-800 rounded-2xl cursor-pointer'
            >
              <PencilIcon className='h-6 w-6 text-white'/>
            </div>
            <div
              onClick={isEdit ? () => toast.success("아직 못 만들었어요") : () => router.back()}
              className='flex-1 flex justify-center items-center bg-sky-800 rounded-2xl cursor-pointer'  
            >
              {isEdit ? (
                <span className='text-lg text-white'>저장</span>
              ) : (
                <span className='text-lg text-white'>돌아가기</span>
              )}
            </div>
          </div>
        </div>
      </BlockContainer>
    )
  }

  return (
    <>
      <BlockContainer firstBlock>
        
      </BlockContainer>
    </>
  );
};

export default DallantHistoryDetail;
