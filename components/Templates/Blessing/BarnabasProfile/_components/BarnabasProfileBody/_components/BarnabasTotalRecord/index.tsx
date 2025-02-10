import {UserRoundCheckIcon, UserRoundIcon, UserRoundXIcon} from "lucide-react";
import {useQuery} from "react-query";
import {getBarnabasRecords} from "../../../../../../../../firebase/Barnabas/barnabas";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";

type Props = {
  id: string;
};

const BarnabasTotalRecord = ({id}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getBarnabasRecords", id],
    () => getBarnabasRecords(id),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: !!id,
    }
  );
  return (
    <div className="w-1/3 p-4 border border-gray-200 rounded-md">
      <div>
        <h3 className="border-b pb-1 mb-4 text-lg font-semibold">
          수료한 멘티 히스토리
        </h3>
        <div className="flex justify-between">
          <div className="flex-1 flex flex-col justify-center items-center pt-2 pb-4 shadow-md bg-white border-y border-l border-gray-100 rounded-l-lg">
            <div className="text-[36px] font-sans font-thin">
              {isLoading || isFetching ? (
                <Skeleton className="h-[54px] w-[36px]" />
              ) : data ? (
                data.total
              ) : (
                0
              )}
            </div>
            <div className="text-sm">전체양육기록</div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center pt-2 pb-4 shadow-md bg-gray-100 border-y border-r border-gray-100 rounded-r-lg">
            <div className="text-[36px] font-sans font-thin">
              {isLoading || isFetching ? (
                <Skeleton className="h-[54px] w-[36px]" />
              ) : data ? (
                data.thisYearpass
              ) : (
                0
              )}
            </div>
            <div className="text-sm">올해양육기록</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="border-b pb-1 mb-4 text-lg font-semibold">
          전체기간 히스토리
        </h3>
        <div className="flex justify-between">
          <div className="flex-1 flex flex-col justify-center items-center pt-4 pb-2">
            <div className="flex items-baseline space-x-1">
              <UserRoundIcon className="h-[14px] w-[14px]" />
              <span className="text-sm">만났던멘티</span>
            </div>
            <div className="text-[36px] font-sans font-thin">
              {isLoading || isFetching ? (
                <Skeleton className="h-[54px] w-[36px]" />
              ) : data ? (
                data.total
              ) : (
                0
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center pt-4 pb-2">
            <div className="flex items-baseline space-x-1">
              <UserRoundCheckIcon className="h-[14px] w-[14px]" />
              <span className="text-sm">수료한멘티</span>
            </div>
            <div className="text-[36px] font-sans font-thin">
              {isLoading || isFetching ? (
                <Skeleton className="h-[54px] w-[36px]" />
              ) : data ? (
                data.pass
              ) : (
                0
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center pt-4 pb-2">
            <div className="flex items-baseline space-x-1">
              <UserRoundXIcon className="h-[14px] w-[14px]" />
              <span className="text-sm">보류한멘티</span>
            </div>
            <div className="text-[36px] font-sans font-thin">
              {isLoading || isFetching ? (
                <Skeleton className="h-[54px] w-[36px]" />
              ) : data ? (
                data.fail
              ) : (
                0
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarnabasTotalRecord;
