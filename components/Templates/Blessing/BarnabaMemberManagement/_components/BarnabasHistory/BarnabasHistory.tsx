import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getBarnabasHistory} from "../../../../../../firebase/Barnabas/barnabas";
import SkeletonTable from "../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasHistoryTable from "./_components/BarnabasHistoryTable";

type Props = {};

const BarnabasHistory = ({}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getBarnabasHistory"],
    () => getBarnabasHistory(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <div className="flex justify-between items-center py-3 mb-8">
          <h6 className="text-lg font-medium">바나바양육 전체이력</h6>
        </div>
        <div>
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : data && data.length !== 0 ? (
            <BarnabasHistoryTable data={data} />
          ) : (
            <div className="h-32 flex flex-col justify-center items-center space-y-1">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <span className="text-sm text-gray-500">
                바나바 양육 이력이 없습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnabasHistory;
