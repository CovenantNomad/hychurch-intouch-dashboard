import { DateRangePickerValue } from '@tremor/react';
import React from 'react';
import { getCellMeetingStatsByPeriod } from '../../../../../firebase/CellMeeting/CellMeetingStatic';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import CellMeetingCellStaticTableColumnSkeleton from './CellMeetingCellStaticTableColumnSkeleton';

type CellMeetingCellStaticTableRowProps = {
  cellId: string
  cellName: string
  from: Date;
  to: Date;
}

const CellMeetingCellStaticTableRow = ({ cellId, cellName, from, to }: CellMeetingCellStaticTableRowProps) => {
  const { isLoading, isFetching, data } = useQuery(
    ['getCellMeetingStatsByPeriod', cellId, from, to], 
    () => getCellMeetingStatsByPeriod({cellId, from, to }),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  

  return (
    <tr className="grid grid-cols-12 items-center text-center divide-x">
      <td className="h-full col-span-4 flex items-center justify-between py-2 px-5">
        <span className="flex items-center">
          {cellName} 
        </span>
      </td>
      {isLoading ? (
        <CellMeetingCellStaticTableColumnSkeleton />
      ) : (
        <>
          {data ? (
            <>
              <td className="h-full col-span-2 flex items-center justify-center text-sm py-1">
                <span>{Math.round(data.averageAttendance)}명</span>
              </td>
              <td className="h-full col-span-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
                <span>{Math.round(data.averageAbsent)}명</span>
              </td>
              <td className="h-full col-span-2 flex items-center justify-center text-sm py-1">
                <span>{Math.round(data.averageTotal)}명</span>
              </td>
              <td className="h-full col-span-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
                <span>{((data.averageAttendance / data.averageTotal) * 100).toFixed(2)}%</span>
              </td>
            </>
          ) : (
            <>
              <td className="h-full col-span-2 flex items-center justify-center text-sm py-1">
                <span>0</span>
              </td>
              <td className="h-full col-span-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
                <span>0</span>
              </td>
              <td className="h-full col-span-2 flex items-center justify-center text-sm py-1">
                <span>0</span>
              </td>
              <td className="h-full col-span-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
                <span>0</span>
              </td>
            </>
          )}
        </>
      )}
    </tr>
  );
};

export default CellMeetingCellStaticTableRow;
