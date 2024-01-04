import React from 'react';
import { useQuery } from 'react-query';
import { getEvaluationFormByUserId } from '../../../../firebase/EvaluationForm/evaluationFromSubmission';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';

type EvaluationFormPrintCardProps = {
  userId: string
  name: string
}

const EvaluationFormPrintCard = ({ userId, name }: EvaluationFormPrintCardProps) => {
  const { isLoading, isFetching, data } = useQuery(
    ['getEvaluationFormByUserId', userId], 
    () => getEvaluationFormByUserId(userId),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  return (
    <div className='h-full border px-2 py-1 text-xs'>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data ? (
            <>
              <div>
                <span className='text-sm font-bold'>이름 : {name}</span>
              </div>
              <div className='mt-1 space-y-1'>
                <span className='block'>• 예배출석 : {data.worship}</span>
                <span className='block'>• 셀모임출석 : {data.meeting}</span>
              </div>
              <div className='h-[1px] bg-gray-200 my-1 col'/>
              <div>
                <span>{`<셀원소개>`}</span>
                <p className='whitespace-pre-line'>
                  {/* {data.description.replaceAll('\\n', '\n')} */}
                  {data.description}
                </p>
              </div>
            </>
          ) : (
            <EmptyStateSimple />
          )}
        </>
      )}
    </div>
  );
};

export default EvaluationFormPrintCard;
