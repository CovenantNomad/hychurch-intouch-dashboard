import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useQuery} from "react-query";
import {getCellMeetingTermOverviewStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";
import CellMeetingStaticTable from "./_components/CellMeetingStaticTable";

type CellMeetingSeasonOverviewTableProps = {};

const CellMeetingSeasonOverviewTable =
  ({}: CellMeetingSeasonOverviewTableProps) => {
    const {isLoading, isFetching, data} = useQuery(
      ["getCellMeetingYearOverviewStatics"],
      () => getCellMeetingTermOverviewStatics(),
      {
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
      }
    );

    return (
      <div>
        {isLoading ? (
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-4 border">
              <Skeleton className="w-[240px] h-[18px]" />
              <Skeleton className="w-full h-[320px]" />
            </div>
            <div className="col-span-4 border">
              <Skeleton className="w-[240px] h-[18px]" />
              <Skeleton className="w-full h-[320px]" />
            </div>
            <div className="col-span-4 border">
              <Skeleton className="w-[240px] h-[18px]" />
              <Skeleton className="w-full h-[320px]" />
            </div>
          </div>
        ) : (
          <>
            {data ? (
              <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-4 border">
                  <CellMeetingStaticTable
                    termDisplay={data.termYear + "년"}
                    data={data.termYearStatic}
                  />
                </div>
                <div className="col-span-4 border">
                  <CellMeetingStaticTable
                    termDisplay={data.termYear + "년" + " 상반기"}
                    data={data.firstTermStatic}
                  />
                </div>
                <div className="col-span-4 border">
                  <CellMeetingStaticTable
                    termDisplay={data.termYear + "년" + " 하반기"}
                    data={data.secondTermStatic}
                  />
                </div>
              </div>
            ) : (
              <div className="h-[369px] grid grid-cols-12 gap-x-6">
                <div className="flex flex-col justify-center items-center col-span-4 border">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                  <span className="block text-sm text-gray-600 mt-1">
                    올해 셀모임 통계를 조회하지 못했습니다.
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center col-span-4 border">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                  <span className="block text-sm text-gray-600 mt-1">
                    상반기 셀모임 통계를 조회하지 못했습니다.
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center col-span-4 border">
                  <ExclamationTriangleIcon className="h-6 w-6" />
                  <span className="block text-sm text-gray-600 mt-1">
                    하반기 셀모임 통계를 조회하지 못했습니다.
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

export default CellMeetingSeasonOverviewTable;
