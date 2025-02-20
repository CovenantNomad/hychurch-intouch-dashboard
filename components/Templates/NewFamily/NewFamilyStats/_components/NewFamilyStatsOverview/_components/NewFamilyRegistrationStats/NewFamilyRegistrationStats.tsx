import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {ArrowPathIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getNewFamilyCountStats} from "../../../../../../../../firebase/NewFamilyStats/newFamilyStats";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import NewFamilyCountChart from "./_components/NewFamilyCountChart/NewFamilyCountChart";

type Props = {};

const NewFamilyRegistrationStats = ({}: Props) => {
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getNewFamilyCountStats"],
    () => getNewFamilyCountStats(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <div className="border rounded-md p-4">
        {isLoading ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <>
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                새가족등록 주간 통계{" "}
                <span className="text-sm text-gray-600">(기간: 최근 20주)</span>
              </h3>
              <div className="flex justify-end items-center mb-1">
                {isFetching && (
                  <span className="animate-pulse text-xs mr-4">
                    새로고침 중..
                  </span>
                )}
                <button
                  onClick={() => refetch()}
                  className="flex items-center text-xs hover:bg-gray-100 py-2 px-3 rounded-md"
                >
                  새로고침 <ArrowPathIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
            <NewFamilyCountChart data={data} />
          </>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              새가족 등록 주간 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFamilyRegistrationStats;
