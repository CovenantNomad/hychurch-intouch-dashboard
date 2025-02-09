import {useQuery} from "react-query";
import {fetchLatestMentorship} from "../../../../../../../../../../firebase/Barnabas/barnabas";
import {
  TBarnabaProfile,
  TMatchingStatus,
} from "../../../../../../../../../../interface/barnabas";
import {getGender} from "../../../../../../../../../../utils/utils";
import Skeleton from "../../../../../../../../../Atoms/Skeleton/Skeleton";

type Props = {
  member: TBarnabaProfile;
};

const BarnabasProgressCard = ({member}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["fetchLatestMentorship", member.id],
    () => fetchLatestMentorship(member.id),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: !!member.id,
    }
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b px-5 pt-2 pb-1">
        {member.name}{" "}
        <span className="text-xs">{getGender(member.gender!)}</span>
      </div>
      <div>
        {isLoading || isFetching ? (
          <Skeleton className="w-[110px] h-[80px]" />
        ) : data ? (
          <div
            className={`px-5 py-2 ${
              data.status === TMatchingStatus.PROGRESS
                ? "bg-yellow-500"
                : data.status === TMatchingStatus.PENDING
                ? "bg-gray-500 text-gray-300"
                : "bg-emerald-500"
            }`}
          >
            <div className="font-bold">
              {data.status === TMatchingStatus.PROGRESS
                ? "과정진행중"
                : data.status === TMatchingStatus.PENDING
                ? "과정지연중"
                : "진행가능"}
            </div>
            <div className="mt-1">
              <span className="block text-xs">
                {data.status === TMatchingStatus.PROGRESS ||
                data.status === TMatchingStatus.PENDING
                  ? "(마지막매칭일)"
                  : "(마지막완료일)"}
              </span>
              <span className="block text-sm">
                {data.status === TMatchingStatus.PROGRESS ||
                data.status === TMatchingStatus.PENDING
                  ? data.matchingDate
                  : data.completedDate || data.matchingDate}
              </span>
            </div>
          </div>
        ) : (
          <div className="px-5 py-2 bg-emerald-500">
            <div className="font-bold">진행가능</div>
            <div className="mt-1">
              <span className="block text-xs">(마지막매칭일)</span>
              <span className="block text-sm">양육이력없음</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarnabasProgressCard;
