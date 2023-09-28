import React from 'react';
import { useQuery } from 'react-query';
import { getCellsStatistic } from '../../../../../firebase/Dallant/DallantStatistic';
import CellDallantRank from '../Cell/CellDallantRank';
import CellParticipantRank from '../Cell/CellParticipantRank';

interface DallantStaticCellProps {}

const DallantStaticCell = ({}: DallantStaticCellProps) => {
  const { isLoading, isFetching, data } = useQuery(
    ['getCellsStatistic'], 
    getCellsStatistic,
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  
  return (
    <div className='space-y-8'>
      <CellDallantRank isLoading={isLoading} isFetching={isFetching} data={data} />
      <CellParticipantRank isLoading={isLoading} isFetching={isFetching} data={data}/>
    </div>
  );
};

export default DallantStaticCell;
