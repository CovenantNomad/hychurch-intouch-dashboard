import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useQuery} from "react-query";
import {getServiceAttendnaceWeekly} from "../../../../../../../../firebase/Services/serviceStatic";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ServiceAttendanceWeeklyTable from "./_components/ServiceAttendanceWeeklyTable";

type Props = {};

const IntouchServiceAttendanceStatics = ({}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getServiceAttendnaceWeekly"],
    () => getServiceAttendnaceWeekly(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center pb-5 mb-5">
        <div>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            셀편성 청년 중 예배별 참석현황
          </h3>
        </div>
      </div>
      {isLoading && isFetching ? (
        <div>
          <Skeleton className="w-full h-32" />
        </div>
      ) : data ? (
        <ServiceAttendanceWeeklyTable data={data} />
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            예배 관련 통계 데이터를 조회하지 못했습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default IntouchServiceAttendanceStatics;
