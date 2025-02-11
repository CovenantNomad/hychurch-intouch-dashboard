import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getGroupedDataByCohort} from "../../../../../../firebase/Barnabas/barnabas";
import SkeletonTable from "../../../../../Atoms/Skeleton/SkeletonTable";
import AddBarnabas from "./_components/AddBarnabas";
import CohortList from "./_components/CohortList";

type Props = {};

const BarnabasCohorts = ({}: Props) => {
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getGroupedDataByCohort"],
    () => getGroupedDataByCohort(),
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
        <div className="flex justify-between items-end py-3 border-b mb-8">
          <h6 className="text-lg font-medium">바나바 기수별 명단</h6>
          <AddBarnabas />
        </div>
        <div>
          {isLoading ? (
            <SkeletonTable />
          ) : data ? (
            <CohortList data={data} isFetching={isFetching} refetch={refetch} />
          ) : (
            <div className="h-32 flex flex-col justify-center items-center space-y-1">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <span className="text-sm text-gray-500">
                바나바 데이터를 조회하지 못했습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnabasCohorts;
