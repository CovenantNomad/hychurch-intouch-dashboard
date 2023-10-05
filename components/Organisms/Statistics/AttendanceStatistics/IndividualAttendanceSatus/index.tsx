import React from 'react';
import IndividualAttendanceHistory from '../IndividualAttendanceHistory';
import IndividualAttendanceHistoryStatistic from '../IndividualAttendanceHistoryStatistic';

interface IndividualAttendanceSatusProps {
  memberId: string | null;
  memberName: string | null;
  isOpen: boolean;
  onResetHandler: () => void;
}

export interface mockAttendanceHistoryType {
  id: string;
  week: string;
  attendedIntouch: boolean;
  onSiteIntouch: boolean;
  attendedOthers: boolean;
  onSiteOthers: boolean;
  cellMeeting: boolean;
}

const mockAttendanceHistoryData = [
  { id: '0', week: '9월 2주', attendedIntouch: true, onSiteIntouch: true, attendedOthers: true,  onSiteOthers: true, cellMeeting: true},
  { id: '1', week: '9월 3주', attendedIntouch: true, onSiteIntouch: false, attendedOthers: false, onSiteOthers: false, cellMeeting: true},
  { id: '2', week: '9월 4주', attendedIntouch: true, onSiteIntouch: false, attendedOthers: true, onSiteOthers: false,   cellMeeting: true},
  { id: '3', week: '10월 1주', attendedIntouch: true, onSiteIntouch: true, attendedOthers: false, onSiteOthers: false, cellMeeting: false},
]

const IndividualAttendanceSatus = ({ memberId, memberName, isOpen, onResetHandler }: IndividualAttendanceSatusProps) => {
  return (
    <>
      {isOpen && (
        <div className='h-full px-6 py-10 border border-l-0'>
          <div className='flex justify-between items-center'>
            <h3 className="text-lg font-semibold">{memberName ? memberName : "이름"}</h3>
            <button
                onClick={onResetHandler}
              >
              <span className='text-sm'>닫기</span>
            </button>
          </div>
          <div>
            {memberId && (
              <>
                <div className='mt-6'>
                  <IndividualAttendanceHistory
                    attendanceHistoryData={mockAttendanceHistoryData}
                  />
                </div>
                <div className='mt-6'>
                  <IndividualAttendanceHistoryStatistic 
                    attendanceHistoryData={mockAttendanceHistoryData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualAttendanceSatus;
