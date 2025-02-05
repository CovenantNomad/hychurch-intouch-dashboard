import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getBarnabasCourseByStatus} from "../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../interface/barnabas";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasProcessTable from "../ProgressBarnabasCourse/_components/BarnabasProcessTable";

type Props = {};

const PendingBarnabasCourse = ({}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getBarnabasCourseByStatus", TMatchingStatus.PENDING],
    () => getBarnabasCourseByStatus(TMatchingStatus.PENDING),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <h4 className="text-lg font-semibold">
        현재 <span className="text-amber-500">지연중인</span> 바나바과정
      </h4>
      <div className="mt-8">
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
  );
};

export default PendingBarnabasCourse;
