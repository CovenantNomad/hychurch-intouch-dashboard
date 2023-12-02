import React from 'react';
import { AttendanceStatus } from '../../../../../interface/attendance';
import NotSubmittedAlert from '../../../../Atoms/Alerts/AttendnaceAlert/NotSubmittedAlert';
import TemporarySaveAlert from '../../../../Atoms/Alerts/AttendnaceAlert/TemporarySaveAlert';
import CompletedAlert from '../../../../Atoms/Alerts/AttendnaceAlert/CompletedAlert';

type SpecialCellAttendanceStatusAlertProps = {
  cellName: string;
  attendanceStatus: AttendanceStatus
}

const SpecialCellAttendanceStatusAlert = ({ cellName, attendanceStatus }: SpecialCellAttendanceStatusAlertProps) => {

  return (
    <div>
      {attendanceStatus === AttendanceStatus.NOT_SUBMITTED && <NotSubmittedAlert cellName={cellName} />}
      {attendanceStatus === AttendanceStatus.TEMPORARY_SAVE && <TemporarySaveAlert />}
      {attendanceStatus === AttendanceStatus.COMPLETE && <CompletedAlert cellName={cellName} />}
    </div>
  );
};

export default SpecialCellAttendanceStatusAlert;
