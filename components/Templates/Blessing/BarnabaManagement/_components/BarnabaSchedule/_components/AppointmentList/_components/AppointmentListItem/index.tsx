"use client";

import {TAppointment} from "../../../../../../../../../../interface/barnabas";
import {LocationDisplay} from "./_components/AppointmentDisplay/LocationDisplay";
import {TimeDisplay} from "./_components/AppointmentDisplay/TimeDisplay";
import ColorBar from "./_components/ColorBar";

type Props = {
  appointment: TAppointment;
  index: number;
};

const AppointmentListItem = ({appointment, index}: Props) => {
  return (
    <div className="flex items-center py-3 text-sm mt-2">
      {/* 컬러 바 표시 */}
      <ColorBar index={index} />
      {/* 일정 정보 */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="inline-block">{appointment.barnabaName}</span>
          <div className="w-[1px] h-3 bg-gray-300" />
          <span>{appointment.menteeName}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>
            ({appointment.week}주차 / {appointment.scheduledMeetingCount}주차)
          </span>
        </div>
      </div>
      {/* 시간 및 장소 */}
      <div className="text-right space-y-0.5">
        <TimeDisplay hour={appointment.hour} minute={appointment.minute} />
        <LocationDisplay place={appointment.place} />
      </div>
    </div>
  );
};

export default AppointmentListItem;
