import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from '@tremor/react';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import useOrderedCellList from '../../../../hooks/useOrderedCellList';
import CellMeetingCellStaticTableHeader from './CellMeetingCellStaticTable/CellMeetingCellStaticTableHeader';
import CellMeetingAttendanceTableRowSkeleton from '../CellMeetingAttendanceTable/CellMeetingAttendanceTableRowSkeleton';
import CellMeetingCellStaticTableRowSkeleton from './CellMeetingCellStaticTable/CellMeetingCellStaticTableRowSkeleton';
import CellMeetingCellStaticTableRow from './CellMeetingCellStaticTable/CellMeetingCellStaticTableRow';

type CellMeetingCellStaticSectionProps = {}

export type TDateRangePickerStringValue = {
  from?: string;
  to?: string;
}

const CellMeetingCellStaticSection = ({}: CellMeetingCellStaticSectionProps) => {
  const { isLoading, orderedCellList } = useOrderedCellList()

  const today = new Date()
  const [ dateRagnge, setDateRagnge ] = useState<DateRangePickerValue>({
      from: new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0),
      to: new Date(today.getFullYear(), today.getMonth(), 0, 23, 59)
    });

  return (
    <>
      <div className="pt-3 pb-1 lg:hidden">
        <p className="font-bold leading-[1.5]">
          이번주 셀모임 출석명단은 PC전용 화면입니다
          <br/>
          모바일에서는 셀모임 출석인원만 보여줍니다.
        </p>
      </div>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        기간별 셀별 셀모임 출석 통계
      </h3>
      <div className='py-4'>
        <DateRangePicker
          className="max-w-lg mx-auto"
          value={dateRagnge}
          onValueChange={setDateRagnge}
          locale={ko}
          selectPlaceholder="기간을 선택할 수 있습니다"
        >
          <DateRangePickerItem
            key="thisTerm"
            value="thisTerm"
            from={new Date(today.getFullYear(), 0, 28, 0, 0)}
            to={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59)}
          >
            상반기 전체(1.28~오늘)
          </DateRangePickerItem>
          <DateRangePickerItem
            key="thisMonth"
            value="thisMonth"
            from={new Date(today.getFullYear(), today.getMonth() - 1, 1, 0, 0)}
            to={new Date(today.getFullYear(), today.getMonth(), 0, 23, 59)}
          >
            이번달
          </DateRangePickerItem>
          <DateRangePickerItem 
            key="previousMonth" 
            value="previousMonth" 
            from={new Date(today.getFullYear(), today.getMonth() - 2, 1, 23, 59)} 
            to={new Date(today.getFullYear(), today.getMonth() - 1, 0, 23, 59)}
          >
            지난한달
          </DateRangePickerItem>
        </DateRangePicker>
      </div>
      <table className="hidden relative min-w-full border border-gray-200 lg:table">
        <CellMeetingCellStaticTableHeader />
        {isLoading ? (
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <CellMeetingCellStaticTableRowSkeleton key={index} />
            ))}
          </tbody>
        ) : (
          <tbody className="divide-y divide-gray-200">
            {orderedCellList ? (
              orderedCellList?.map(cell => (
                <CellMeetingCellStaticTableRow key={cell.id} cellId={cell.id} cellName={cell.name} from={dateRagnge.from!} to={dateRagnge.to!} />
              ))
            ) : (
              <tr className="grid grid-cols-1 items-center text-center divide-x">
                <td className="h-full col-span-1 flex items-center justify-center text-base font-bold py-6">요청하신 데이터가 존재하지 않습니다</td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </>
  );
};

export default CellMeetingCellStaticSection;
