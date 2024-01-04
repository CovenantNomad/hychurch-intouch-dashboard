import React, { useEffect, useState } from 'react';
import useCommunity from '../../../../hooks/useCommunity';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { getEvaluationSubmissionCheck } from '../../../../firebase/EvaluationForm/evaluationFromSubmission';
import { EvaluationSubmissionStatus } from '../../../../interface/EvaluationFormTypes';
import Link from 'next/link';

const EvaluationCommunitySection = ({ seasonName, communityName }: { communityName: string; seasonName: string; }) => {
  const [ communityLength, setCommunityLength ] = useState<number>(0)
  const [ completeSubmissionsCount, setCompleteSubmissionsCount ] = useState<number>(0)
  const { isLoading, data } = useCommunity()

  const {isLoading: isSubmissionCheckLoading, isFetching: isSubmissionCheckFetching, data: submissionCheckData} = useQuery(
    ['getEvaluationSubmissionCheck', [communityName]], 
    () => getEvaluationSubmissionCheck(seasonName, communityName), 
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (submissionCheckData) {
      submissionCheckData.forEach((submission) => {
        if (submission.submissionStatus === EvaluationSubmissionStatus.COMPLETE) {
          setCompleteSubmissionsCount(completeSubmissionsCount + 1)
        }
      });
    }

  }, [submissionCheckData])

  useEffect(() => {
    if (data) {
      const communityList = data.filter(community => community.communityName === communityName)[0]
      communityList.cellList ? setCommunityLength(communityList.cellList.length) : setCommunityLength(0)
    }

  }, [data, communityName])

  return (
    <div>
      <div>
        <p className={`text-lg font-semibold`}>{communityName}</p>
      </div>
      <div>
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          <>
            {data ? (
              <div className='py-5'>
                <div className='text-sm text-center border border-gray-300 py-2 mb-3 rounded-lg'>
                  {completeSubmissionsCount !== 0 && communityLength !== 0 && completeSubmissionsCount === communityLength ? (
                    <span>모든 셀이 출석체크를 제출하였습니다.</span>
                  ) : (
                    <>
                      <span>제출 : {completeSubmissionsCount}셀</span>
                      <span>{' '}/{' '}</span>
                      <span>미제출 : {communityLength - completeSubmissionsCount}셀</span>
                    </>
                  )}
                </div>
                <div className='space-y-3'>
                  {data.filter(community => community.communityName === communityName)[0].cellList && (
                    data.filter(community => community.communityName === communityName)[0].cellList?.map(cell => (
                      <div 
                        key={String(cell.id)}
                        className={`flex justify-between items-center px-6 py-5 shadow-sm rounded-md border`}
                      >
                        <p className='text-black'>{cell.name}</p>
                        <div className={`flex justify-center items-center rounded-full`}>
                          {isSubmissionCheckLoading || isSubmissionCheckFetching ? (
                            <div className='animate-pulse inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>...</div>
                          ) : (
                            <>
                              {submissionCheckData ? (
                                <>
                                  {
                                    submissionCheckData.find(item => item.cellId === cell.id) ? (
                                      submissionCheckData.find(item => item.cellId === cell.id)?.submissionStatus === EvaluationSubmissionStatus.INPROGRESS ? (
                                        <span className='inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 cursor-not-allowed'>
                                          작성중
                                        </span>
                                      ):(
                                        submissionCheckData.find(item => item.cellId === cell.id)?.submissionStatus === EvaluationSubmissionStatus.COMPLETE ? (
                                          <Link
                                            href={`/reports/evaluation/${cell.id}`}
                                          >
                                            <span className='inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer'>
                                              제출완료
                                            </span>
                                          </Link>
                                        ) : (
                                          <span className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-not-allowed'>
                                            작성전
                                          </span>
                                        )
                                      )
                                    ) : (
                                      <span className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-not-allowed'>
                                        작성전
                                      </span>
                                    )
                                  }

                                </>
                              ) : (
                                <div className='inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>에러</div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div>
                <EmptyStateSimple />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EvaluationCommunitySection;
