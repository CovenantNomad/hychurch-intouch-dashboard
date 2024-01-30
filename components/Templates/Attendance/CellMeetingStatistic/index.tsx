import React, { useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import { useQuery } from 'react-query';
import { getCellMeetingStatsByPeriod } from '../../../../firebase/CellMeeting/CellMeeting';
import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from '@tremor/react';
import { ko } from "date-fns/locale";

type CellMeetingStatisticProps = {}

const CellMeetingStatistic = ({}: CellMeetingStatisticProps) => {
  // new Date 여서 계속 쿼리 돌꺼임
  const [dateRagnge, setDateRagnge] = useState<DateRangePickerValue>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  

  const { isLoading: isDataLoading, isFetching: isDataFetching, data } = useQuery(
    ['getCellMeetingByCellId', 2, dateRagnge], 
    () => getCellMeetingStatsByPeriod({ cellId: '2', dateRagnge }),
    {
      enabled: !!dateRagnge,
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )


  return (
    <BlockContainer firstBlock>
      {/* <DateRangePicker
        className="max-w-md mx-auto"
        value={dateRagnge}
        onValueChange={setDateRagnge}
        locale={ko}
        selectPlaceholder="Seleccionar"
        color="rose"
      >
        <DateRangePickerItem key="previousMonth" value="previousMonth" from={new Date(2023, 11, 1)} to={new Date(2023, 11, 31)}>
          지난한달
        </DateRangePickerItem>
        <DateRangePickerItem
          key="thisMonth"
          value="thisMonth"
          from={new Date(2024, 0, 1)}
          to={new Date(2024, 0, 31)}
        >
          이번달
        </DateRangePickerItem>
      </DateRangePicker> */}
      현재 페이지는 개발 중에 있습니다
    </BlockContainer>
  );
};

export default CellMeetingStatistic;
