import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CalculatorIcon } from '@heroicons/react/24/outline'
//fetch
import graphlqlRequestClient from '../../../../client/graphqlRequestClient';
import { AttendanceCheckStatus, CompleteAttendanceCheckMutation, CompleteAttendanceCheckMutationVariables, FindAttendanceCheckQuery, FindAttendanceCheckQueryVariables, useCompleteAttendanceCheckMutation, useFindAttendanceCheckQuery } from '../../../../graphql/generated';
//components
import AttendanceInputModal from '../../../Blocks/Modals/AttendanceInputModal';
import SimpleModal from '../../../Blocks/Modals/SimpleModal';

interface AttendanceHeaderProps {
  attendanceDate: string;
  attendanceStatus: boolean;
}

const AttendanceHeader = ({ attendanceDate, attendanceStatus }: AttendanceHeaderProps) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isDeadlineOpen, setIsDeadlineOpen ] = useState(false)

  const { isLoading: isAttendanceLoading, isFetching: isAttendanceFetching, data: attendanceChekcStatus } = useFindAttendanceCheckQuery<
    FindAttendanceCheckQuery,
    FindAttendanceCheckQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: attendanceDate,
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const { mutate, data, isLoading, error } = useCompleteAttendanceCheckMutation<
    CompleteAttendanceCheckMutation, 
    CompleteAttendanceCheckMutationVariables
  >(graphlqlRequestClient, {
    onSuccess() {
      toast.success('이번주 출석체크를 마감하겠습니다.');
    },
    onError() {
      toast.error('출석체크가 이미 마감되었습니다');
    },
  })

  const onCompleteHandler = () => {
    mutate({
      input: {
        attendanceDate: attendanceDate
      },
    });
    setIsDeadlineOpen(false)
  }

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
            <CalculatorIcon className='h-6 w-6 text-gray-800'/>
          </button>
        </div>
        <div>
          {isAttendanceLoading || isAttendanceFetching ? (
            <div>
              <div className='animate-pulse inline-flex items-center justify-center rounded-md border h-10 w-20 text-sm font-medium shadow-sm border-transparent bg-slate-200' />
            </div>
          ) : (
            <>
              {attendanceChekcStatus && attendanceChekcStatus.attendanceCheck === AttendanceCheckStatus.Completed ? (
                <div className='inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm border-transparent bg-BLUE text-white '>
                  <span>출석체크가 마감되었습니다</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeadlineOpen(true)} 
                  disabled={isLoading || !attendanceStatus || data?.completeAttendanceCheck.attendanceCheck.status === AttendanceCheckStatus.Completed}
                  className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm border-transparent bg-BLUE text-white cursor-pointer hover:bg-blue-500 disabled:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  <span>{data?.completeAttendanceCheck.attendanceCheck.status === AttendanceCheckStatus.Completed ? "마감완료" : "출석체크 마감"}</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <AttendanceInputModal 
        open={isOpen}
        setOpen={setIsOpen}
      />
      <SimpleModal 
        title={'출석체크 마감'}
        description={`모든 셀이 출석체크 제출을 완료하였습니까?\n이제 출석체크를 마감하겠습니다`}
        actionLabel={'마감'}
        open={isDeadlineOpen}
        setOpen={setIsDeadlineOpen}
        actionHandler={onCompleteHandler}
      />
    </div>
  );
};

export default AttendanceHeader;
