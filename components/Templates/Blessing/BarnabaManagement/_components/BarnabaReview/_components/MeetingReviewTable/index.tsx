import {TAppointment} from "../../../../../../../../interface/barnabas";
import MeetingReviewTableRow from "./_components/MeetingReviewTableRow/MeetingReviewTableRow";

type Props = {
  sortedGroupedAppointments: TAppointment[][];
};

const MeetingReviewTable = ({sortedGroupedAppointments}: Props) => {
  return (
    <>
      <div className="grid grid-cols-12 items-center py-3 border-y border-gray-200 text-sm font-semibold">
        <div className="col-span-1 flex justify-center">일자</div>
        <div className="col-span-1 flex justify-center">이름</div>
        <div className="col-span-8 flex justify-center">만남후기</div>
        <div className="col-span-1 flex justify-center">진행주차</div>
        <div className="col-span-1 flex justify-center">이전주차</div>
      </div>
      <MeetingReviewTableRow
        sortedGroupedAppointments={sortedGroupedAppointments}
      />
    </>
  );
};

export default MeetingReviewTable;
