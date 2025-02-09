import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getBarnabasCourseByStatus} from "../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../interface/barnabas";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasProcessTable from "./_components/BarnabasProcessTable";

type Props = {};

const ProgressBarnabasCourse = ({}: Props) => {
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getBarnabasCourseByStatus", TMatchingStatus.PROGRESS],
    () => getBarnabasCourseByStatus(TMatchingStatus.PROGRESS),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <h4 className="text-lg font-semibold">
        현재 <span className="text-emerald-500">진행중인</span> 바나바과정
      </h4>
      <div className="mt-6">
        <div className="flex justify-end mb-1">
          <button
            onClick={() => refetch()}
            className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
        <div>
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : data ? (
            <BarnabasProcessTable data={data} />
          ) : (
            <div className="h-32 flex flex-col justify-center items-center space-y-1">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <span className="text-sm text-gray-500">
                현재 진행중인 바나바과정이 없습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBarnabasCourse;
