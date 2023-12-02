import React, { Dispatch, SetStateAction } from 'react';
import AttendnaceServiceOptionAccordian from '../AttendnaceServiceOptionAccordian';
import AttendanceServiceAccordian from '../AttendanceServiceAccordian';
import { AttendnaceCartType } from '../../Organisms/SpecialCellsAttendance/AttendanceSidePanel';

type AttendanceOptionPanelProps = {
  selectedService: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedService: Dispatch<SetStateAction<string | null>>
  setAttendnaceCart: Dispatch<SetStateAction<AttendnaceCartType[]>>;
}

const AttendanceOptionPanel = ({selectedService, setOpen, setSelectedService, setAttendnaceCart}: AttendanceOptionPanelProps) => {
  return (
    <div className='h-full'>
      
    </div>
  );
};

export default AttendanceOptionPanel;
