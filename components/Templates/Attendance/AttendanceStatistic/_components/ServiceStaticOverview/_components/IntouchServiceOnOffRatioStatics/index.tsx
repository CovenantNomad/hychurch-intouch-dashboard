import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useQuery} from "react-query";
import {getServiceOnOffRatioStatics} from "../../../../../../../../firebase/Services/serviceStatic";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import IntouchServiceOnOffRatioChart from "./_components/IntouchServiceOnOffRatioChart";

type Props = {};

const IntouchServiceOnOffRatioStatics = ({}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getServiceOnOffRatioStatics"],
    () => getServiceOnOffRatioStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <div className="border rounded-md p-4">
        {isLoading || isFetching ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              인터치예배 성전/온라인 예배자 통계{" "}
              <span className="text-sm text-gray-600">
                (기준: 셀편성인원 / 기간: 최근 20주)
              </span>
            </h3>
            <IntouchServiceOnOffRatioChart data={data} />
          </>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              인터치예배 성전계수 인원에 대한 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntouchServiceOnOffRatioStatics;
