import {TAppointment} from "../../../../../../../../interface/barnabas";

type Props = {
  appointments: TAppointment[];
};

const MeetingReviewTable = ({appointments}: Props) => {
  return (
    <>
      <div className="grid grid-cols-12 items-center py-3 border-y border-gray-200 text-sm font-semibold">
        <div className="col-span-1 flex justify-center">일자</div>
        <div className="col-span-1 flex justify-center">이름</div>
        <div className="col-span-9 flex justify-center">만남후기</div>
        <div className="col-span-1 flex justify-center">진행주차</div>
      </div>
      {appointments.map((appointment) => (
        <div
          key={appointment.appointmentId}
          className="grid grid-cols-12 items-center py-2 border-b border-gray-200 text-sm"
        >
          <div className="col-span-1 flex justify-center">
            {appointment.date}
          </div>
          <div className="col-span-1 flex justify-center leading-[1.6]">
            멘티: {appointment.menteeName}
            <br />
            바나바: {appointment.barnabaName}
          </div>
          <div className="col-span-9 whitespace-pre-wrap leading-[1.6] px-4">
            {appointment.review}
          </div>
          <div className="col-span-1 flex justify-center text-center">
            {appointment.week}주차 <br />({appointment.scheduledMeetingCount}
            주과정)
          </div>
        </div>
      ))}
    </>
  );
};

export default MeetingReviewTable;
