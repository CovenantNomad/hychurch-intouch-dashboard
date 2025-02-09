import {ArrowPathIcon} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import {useRecoilValue} from "recoil";
import {useMonthlyAppointments} from "../../../../../../hooks/barnabas/useMonthlyAppointment";
import {calendarSelectedDateState} from "../../../../../../stores/calendarDateState";
import AppointmentList from "./_components/AppointmentList";
import BarnabasCalendar from "./_components/BarnabasCalendar";

type Props = {};

const BarnabaSchedule = ({}: Props) => {
  const selectedDate = useRecoilValue(calendarSelectedDateState);
  const {groupedAppointments, isLoading, isFetching, refetch} =
    useMonthlyAppointments();

  const selectedAppointments =
    selectedDate &&
    groupedAppointments[dayjs(selectedDate).format("YYYY-MM-DD")]
      ? groupedAppointments[dayjs(selectedDate).format("YYYY-MM-DD")]
      : [];

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => refetch()}
            className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
        <BarnabasCalendar groupedAppointments={groupedAppointments} />
        <AppointmentList
          appointments={selectedAppointments}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default BarnabaSchedule;
