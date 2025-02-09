import dayjs from "dayjs";
import {useRecoilValue} from "recoil";
import {TAppointment} from "../../../../../../../../interface/barnabas";
import {calendarSelectedDateState} from "../../../../../../../../stores/calendarDateState";
import {groupAndSortDailyAppointments} from "../../../../../../../../utils/utils";
import SkeletonListItem from "../../../../../../../Atoms/Skeleton/SkeletonListItem";
import AppointmentAccordion from "./_components/AppointmentAccordion";

type Props = {
  appointments: TAppointment[];
  isLoading: boolean;
  isFetching: boolean;
};

const AppointmentList = ({isLoading, isFetching, appointments}: Props) => {
  const selectedDate = useRecoilValue(calendarSelectedDateState);

  const sortedAppointments = groupAndSortDailyAppointments(appointments);

  return (
    <div className="pt-6 pb-32">
      <h4 className="px-6 pb-4">
        {dayjs(selectedDate)?.format("YYYY. MM. DD.")}{" "}
        <span className="inline-block ml-2 text-sm tracking-wide">
          {appointments.length !== 0 && `(전체일정: ${appointments.length}개)`}
        </span>
      </h4>
      <div>
        {isLoading || isFetching ? (
          <div className="px-6">
            <SkeletonListItem />
          </div>
        ) : appointments.length !== 0 ? (
          <AppointmentAccordion sortedAppointments={sortedAppointments} />
        ) : (
          <div className="h-40 flex items-center justify-center px-6 py-4">
            <span className="text-lg font-semibold">일정 없음</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
