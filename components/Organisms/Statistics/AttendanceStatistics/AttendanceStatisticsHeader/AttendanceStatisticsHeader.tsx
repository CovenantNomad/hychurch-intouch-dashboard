import React from 'react';
import CommunityAccordian from '../CommunityAccordian';
import { getMostRecentSunday } from '../../../../../utils/dateUtils';
import useCheckCellAttendanceSubmissions from '../../../../../hooks/useCheckCellAttendanceSubmissions';

interface AttendanceStatisticsHeaderProps {
  onSelectHandler: (id: string, name: string) => void
}

const AttendanceStatisticsHeader = ({ onSelectHandler }: AttendanceStatisticsHeaderProps) => {
  const recentSunday = getMostRecentSunday();
  const { isLoading: isCheckLoading, communityWay, communityTruth, communityLife, communityLight, specialCells } = useCheckCellAttendanceSubmissions(recentSunday.format('YYYY-MM-DD'))

  return (
    <div className='space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4'>
      <CommunityAccordian 
        isLoading={isCheckLoading}
        communityName={'길'}
        checkSubmission={communityWay}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isCheckLoading}
        communityName={'진리'}
        checkSubmission={communityTruth}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isCheckLoading}
        communityName={'생명'}
        checkSubmission={communityLife}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isCheckLoading}
        communityName={'빛'}
        checkSubmission={communityLight}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isCheckLoading}
        communityName={'특별'}
        checkSubmission={specialCells}
        onSelectHandler={onSelectHandler}
      />
    </div>
  );
};

export default AttendanceStatisticsHeader;
