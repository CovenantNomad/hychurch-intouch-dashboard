import dayjs from "dayjs";
import {useMemo} from "react";
import {useQuery} from "react-query";
import {useRecoilValue} from "recoil";
import {fetchMonthlyAppointments} from "../../firebase/Barnabas/barnabas";
import {TGroupedAppointments} from "../../interface/barnabas";
import {calendarCurrentDateState} from "../../stores/calendarDateState";

export function useMonthlyAppointments() {
  const currentDate = useRecoilValue(calendarCurrentDateState);

  const {
    isLoading,
    isFetching,
    data: appointments = [],
    refetch,
  } = useQuery(
    ["monthlyAppointments", dayjs(currentDate).format("YYYY-MM")],
    () =>
      fetchMonthlyAppointments(
        dayjs(currentDate).year(),
        dayjs(currentDate).month() + 1 // dayjs의 month는 0부터 시작
      ),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const groupedAppointments: TGroupedAppointments = useMemo(() => {
    const grouped: TGroupedAppointments = {};
    appointments.forEach((appointment) => {
      if (!grouped[appointment.date]) {
        grouped[appointment.date] = [];
      }
      grouped[appointment.date].push(appointment);
    });
    return grouped;
  }, [appointments]);

  return {groupedAppointments, isLoading, isFetching, refetch};
}
