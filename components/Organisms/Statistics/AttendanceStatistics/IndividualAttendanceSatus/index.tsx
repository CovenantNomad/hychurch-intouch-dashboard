import React, { useState } from 'react';
import IndividualAttendanceHistory from '../IndividualAttendanceHistory';
import IndividualAttendanceHistoryStatistic from '../IndividualAttendanceHistoryStatistic';
import { FindIndividualAttendanceQuery, FindIndividualAttendanceQueryVariables, useFindIndividualAttendanceQuery } from '../../../../../graphql/generated';
import graphlqlRequestClient from '../../../../../client/graphqlRequestClient';
import AttendanceStateCard from '../../../../Blocks/Cards/AttendanceStateCard';
import { getSearchSundayRange } from '../../../../../utils/dateUtils';
import { AttendanceHistoryType, AttendanceMemberType } from '../../../../../interface/attendance';
import { BarList, Color, Select, SelectItem } from "@tremor/react";
import { trackerType } from '../../../../../interface/ui';
import useMemberAttendance from '../../../../../hooks/useMemberAttendance';
import AttendanceNumberCard from '../../../../Blocks/Cards/AttendanceNumberCard';

interface IndividualAttendanceSatusProps {
  isOpen: boolean;
  memberId: string | null;
  memberName: string | null;
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

const IndividualAttendanceSatus = ({ memberId, memberName, isOpen, onResetHandler }: IndividualAttendanceSatusProps) => {
  const [ value, setValue ] = useState<string>("4");
  const { isLoading, numOfattended, numOfOffline, numOfOtherServiceAttended, trackData, minDate, maxDate } = useMemberAttendance(memberId, Number(value))
  
  

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
          <div className='flex justify-end items-center max-w-sm mx-auto mt-8'>
            <span className='text-sm mr-3'>조회기간</span>
            <div className="space-y-6">
              <Select value={value} onValueChange={setValue}>
                <SelectItem value="4">
                  4주
                </SelectItem>
                <SelectItem value="8">
                  8주
                </SelectItem>
                <SelectItem value="12">
                  12주
                </SelectItem>
              </Select>
            </div>
          </div>
          <div>
            {memberId && (
              <>
                <div className='mt-6 space-y-4'>
                  <AttendanceStateCard 
                    title='청년예배 출석'
                    minDate={minDate}
                    maxDate={maxDate}
                    numOfattended={numOfattended}
                    numOfOffline={numOfOffline}
                    searchRange={Number(value)}
                    data={trackData}
                  />
                  <AttendanceNumberCard 
                    title='참석하는 예배'
                    numOfattended={numOfattended}
                    numOfOtherServiceAttended={numOfOtherServiceAttended}
                    searchRange={Number(value)}
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
