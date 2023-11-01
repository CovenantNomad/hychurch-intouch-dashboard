import React from 'react';
import { AttendanceSubmissionType } from '../../../../interface/attendance';
import { CellLeaderAttendanceSubmissionStatus } from '../../../../graphql/generated';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface AttendanceCommunitySectionProps {
  communityName: string;
  communityCells: AttendanceSubmissionType[] | null
}

const AttendanceCommunitySection = ({ communityName, communityCells }: AttendanceCommunitySectionProps) => {
  return (
    <div>
      <div>
        <p className={`text-lg font-semibold`}>{communityName}</p>
      </div>
      <div>
        {communityCells ? (
          <div className='py-5'>
            <div className='text-sm text-center border border-gray-300 py-2 mb-3 rounded-lg'>
              {communityCells?.filter(cell => cell.submissionStatus !== CellLeaderAttendanceSubmissionStatus.Complete).length === 0 ? (
                <span>모든 셀이 출석체크를 제출하였습니다.</span>
              ) : (
                <>
                  <span>제출 : </span>
                  <span>{communityCells?.filter(cell => cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete).length}셀</span>
                  <span>{' '}/{' '}</span>
                  <span>미제출 : </span>
                  <span>{communityCells?.filter(cell => cell.submissionStatus !== CellLeaderAttendanceSubmissionStatus.Complete).length}셀</span>
                </>
              )}
            </div>
            <div className='space-y-3'>
              {communityCells.map(cell => (
                <div 
                  key={String(cell.cellId)}
                  className={`
                    ${cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete ? 'bg-teal-50' : ' bg-rose-50'}
                    flex justify-between items-center px-6 py-5 shadow-sm rounded-md
                  `}
                >
                  <p className='text-black'>{cell.cellName}</p>
                  <div className={`flex justify-center items-center p-1 border ${cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete ? 'border-teal-700': 'border-rose-700'} rounded-full`}>
                    {cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete ? (
                      <CheckIcon className='h-5 w-5 text-teal-700'/>
                    ) : (
                      <XMarkIcon className='h-5 w-5 text-rose-700'/>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='py-5'>
            <EmptyStateSimple />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCommunitySection;
