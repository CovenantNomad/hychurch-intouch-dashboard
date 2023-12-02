import React from 'react';
import useCommunity from '../../../../../hooks/useCommunity';
import CommunityAccordian from '../CommunityAccordian';
import { getMostRecentSunday } from '../../../../../utils/dateUtils';
import useCheckCellAttendanceSubmissions from '../../../../../hooks/useCheckCellAttendanceSubmissions';

interface AttendanceStatisticsHeaderProps {
  onSelectHandler: (id: string, name: string) => void
}

const AttendanceStatisticsHeader = ({ onSelectHandler }: AttendanceStatisticsHeaderProps) => {
  const recentSunday = getMostRecentSunday();
  const { isLoading, data } = useCommunity()
  const { isLoading: isCheckLoading, attendanceStatus, communityWay, communityTruth, communityLife, communityLight, specialCells } = useCheckCellAttendanceSubmissions(recentSunday.format('YYYY-MM-DD'))

  return (
    <div className='space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4'>
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'길'}
        cellList={data?.filter(community => community.communityName === "길")[0].cellList}
        checkSubmission={communityWay}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'진리'}
        cellList={data?.filter(community => community.communityName === "진리")[0].cellList}
        checkSubmission={communityTruth}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'생명'}
        cellList={data?.filter(community => community.communityName === "생명")[0].cellList}
        checkSubmission={communityLife}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'빛'}
        cellList={data?.filter(community => community.communityName === "빛")[0].cellList}
        checkSubmission={communityLight}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'특별'}
        cellList={data?.filter(community => community.communityName === "스페셜")[0].cellList}
        checkSubmission={specialCells}
        onSelectHandler={onSelectHandler}
      />
    </div>
  );
};

export default AttendanceStatisticsHeader;
