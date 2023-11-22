import React from 'react';
import WroshipServiceCard from '../../../../Blocks/Statistics/WorshipAttendanceSatus/WroshipServiceCard';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import EmptyStateSimple from '../../../../Atoms/EmptyStates/EmptyStateSimple';
import useCellAttendance from '../../../../../hooks/useCellAttendance';
import Skeleton from '../../../../Atoms/Skeleton/Skeleton';
import { Dayjs } from 'dayjs';

interface WorshipAttendanceStatusProps {
  cellId: string | null;
  cellName: string | null;
  recentSunday: Dayjs;
  onSelectHandler: (id: string, name: string) => void;
  onResetHandler: () => void;
}

const WorshipAttendanceStatus = ({ cellId, cellName, recentSunday, onSelectHandler, onResetHandler }: WorshipAttendanceStatusProps) => {
  const { isLoading, intouchAttendaceMember, firstAttendaceMember, secondAttendaceMember, thirdAttendaceMember, fourthAttendaceMember, missingMember } = useCellAttendance(cellId, recentSunday)

  return (
    <div className='h-full px-6 py-10 border'>
      <div className='flex justify-between items-center'>
        <h3 className="text-lg font-semibold">{cellName ? cellName : "셀이름"}</h3>
        <button
          onClick={onResetHandler}
        >
          <span className='text-sm'>선택취소</span>
        </button>
      </div>
      {cellId ? (
        <div>
          {isLoading ? (
            <div className='mt-4 grid grid-cols-2 gap-x-8'>
              <Skeleton className="w-[300px] h-[40px]" />
              <Skeleton className="w-[300px] h-[40px]" />
            </div>
          ) : (
            <>
              {intouchAttendaceMember && fourthAttendaceMember && missingMember ? (
                <>
                  <div className='mt-4'>
                    <WroshipServiceCard title="청년예배" memberList={intouchAttendaceMember} onSelectHandler={onSelectHandler} />
                    <WroshipServiceCard title="4부예배" memberList={fourthAttendaceMember} onSelectHandler={onSelectHandler} />
                    <WroshipServiceCard title="3부예배" memberList={thirdAttendaceMember} onSelectHandler={onSelectHandler} />
                    <WroshipServiceCard title="2부예배" memberList={secondAttendaceMember} onSelectHandler={onSelectHandler} />
                    <WroshipServiceCard title="1부예배" memberList={firstAttendaceMember} onSelectHandler={onSelectHandler} />
                    <WroshipServiceCard title="미참석" memberList={missingMember} onSelectHandler={onSelectHandler} />
                  </div>
                </>
              ) : (
                <div>
                  <EmptyStateSimple />
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className='mt-6'>
          <div
            className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
          >
            <NoSymbolIcon className='w-8 h-8 text-gray-400'/>
            <p className="mt-4 text-sm font-semibold text-gray-900">선택된 셀 없습니다</p>
            <p className="mt-1 text-sm text-gray-500">셀을 선택하여 출석명단을 확인하세요</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorshipAttendanceStatus;
