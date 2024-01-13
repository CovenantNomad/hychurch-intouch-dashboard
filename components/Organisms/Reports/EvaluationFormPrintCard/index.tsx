import React from 'react';
import { useQuery } from 'react-query';
import { getEvaluationFormByUserId } from '../../../../firebase/EvaluationForm/evaluationFromSubmission';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { IndividualEvaluationDataType } from '../../../../interface/EvaluationFormTypes';
import { FindUserQuery, FindUserQueryVariables, useFindUserQuery } from '../../../../graphql/generated';
import graphlqlRequestClient from '../../../../client/graphqlRequestClient';

type EvaluationFormPrintCardProps = {
  member: IndividualEvaluationDataType
}

const EvaluationFormPrintCard = ({ member }: EvaluationFormPrintCardProps) => {
  const { isLoading, isFetching, data } = useFindUserQuery<
    FindUserQuery,
    FindUserQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: member.userId,
    },
    {
      enabled: member.userId !== "",
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  return (
    <>
      {member ? (
        <div className='h-full border px-2 py-1 text-xs'>
          <div className='flex justify-between'>
            <div>
              <span className='block text-sm font-bold print:text-[14px]'>이름 : {member.userName}</span>
              <span className='block text-sm mt-1 print:text-[12px]'>({data && data.user.birthday})</span>
            </div>
            <div className='flex flex-col items-end'>
              <span className='w-5 h-5 flex justify-center items-center text-sm font-bold border rounded-full print:text-[14px]'>
                {member.meeting.slice(0,1)}
              </span>
              <span className='block text-sm mt-1 print:text-[12px]'>{member.worship}</span>
            </div>
          </div>
          <div className='h-[1px] bg-gray-200 my-1 col'/>
          <div>
            <span>{`<셀원소개>`}</span>
            <p className='whitespace-pre-line print:text-[11px]'>
              {member.description.replaceAll('\\n', '\n')}
            </p>
          </div>
        </div>
      ) : (
        <div className='h-full flex justify-center items-center border'>
          <EmptyStateSimple />
        </div>
      )}
    </>
  );
};

export default EvaluationFormPrintCard;
