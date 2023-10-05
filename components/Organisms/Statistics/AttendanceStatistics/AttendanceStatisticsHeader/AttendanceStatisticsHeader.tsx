import React from 'react';
import useCommunity from '../../../../../hooks/useCommunity';
import CommunityAccordian from '../CommunityAccordian';

interface AttendanceStatisticsHeaderProps {
  onSelectHandler: (id: string, name: string) => void
}

const AttendanceStatisticsHeader = ({ onSelectHandler }: AttendanceStatisticsHeaderProps) => {
  const { isLoading, data } = useCommunity()

  return (
    <div className='space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4'>
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'길'}
        cellList={data?.filter(community => community.communityName === "길")[0].cellList}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'진리'}
        cellList={data?.filter(community => community.communityName === "진리")[0].cellList}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'생명'}
        cellList={data?.filter(community => community.communityName === "생명")[0].cellList}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian 
        isLoading={isLoading}
        communityName={'빛'}
        cellList={data?.filter(community => community.communityName === "빛")[0].cellList}
        onSelectHandler={onSelectHandler}
      />
    </div>
  );
};

export default AttendanceStatisticsHeader;
