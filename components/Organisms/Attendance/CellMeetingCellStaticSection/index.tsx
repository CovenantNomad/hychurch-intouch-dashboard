import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from '@tremor/react';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';

type CellMeetingCellStaticSectionProps = {}

export type TDateRangePickerStringValue = {
  from?: string;
  to?: string;
}

const CellMeetingCellStaticSection = ({}: CellMeetingCellStaticSectionProps) => {
  const today = new Date()
  const [dateRagnge, setDateRagnge] = useState<DateRangePickerValue>({
      from: new Date(today.getFullYear(), today.getMonth(), 1, 0, 0),
      to: new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59)
    });
  return (
    <div>
      <DateRangePicker
        className="max-w-md mx-auto"
        value={dateRagnge}
        onValueChange={setDateRagnge}
        locale={ko}
        selectPlaceholder="Seleccionar"
        color="rose"
      >
        <DateRangePickerItem 
          key="previousMonth" 
          value="previousMonth" 
          from={new Date(2023, 11, 1)} 
          to={new Date(2023, 11, 31)}
        >
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
      </DateRangePicker>
    </div>
  );
};

export default CellMeetingCellStaticSection;
