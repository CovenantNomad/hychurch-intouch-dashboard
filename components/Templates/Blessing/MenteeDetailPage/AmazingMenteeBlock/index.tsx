import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getAmazingMentorshipByMenteeId} from "../../../../../firebase/Barnabas/barnabas";
import {TAmazingMentorshipStatus} from "../../../../../interface/barnabas";
import Skeleton from "../../../../Atoms/Skeleton/Skeleton";

type Props = {
  userId: string;
};

const AmazingMenteeBlock = ({userId}: Props) => {
  const {data, isLoading, error} = useQuery(
    ["getAmazingMentorshipByMenteeId", userId],
    () => getAmazingMentorshipByMenteeId(userId),
    {
      enabled: !!userId, // menteeId가 존재할 때만 실행
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    }
  );

  if (error) {
    return (
      <div className="border px-4 py-8 rounded-md">
        <p className="text-sm text-center">
          어메이징 과정 데이터를 가져오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="border p-6 rounded-xl shadow-sm">
      <h3 className="text-base font-medium">어메이징 과정</h3>
      {isLoading ? (
        <Skeleton className="h-5 mt-4" />
      ) : data ? (
        <div>
          <div className="flex justify-between items-center">
            <div className="text-sm space-x-2">
              {data.status === TAmazingMentorshipStatus.PENDING && (
                <span className="text-white bg-gray-600 px-2 py-1 rounded-full">
                  보류
                </span>
              )}
              {data.status === TAmazingMentorshipStatus.WAITING && (
                <span className="text-white bg-amber-500 px-2 py-1 rounded-full">
                  대기중
                </span>
              )}
              {data.status === TAmazingMentorshipStatus.PROGRESS && (
                <>
                  <span className="text-base font-medium">
                    {data.amazingCohort}기
                  </span>
                  <span className="text-white bg-emerald-500 px-2 py-1 rounded-full">
                    진행중
                  </span>
                </>
              )}
              {data.status === TAmazingMentorshipStatus.COMPLETED && (
                <>
                  <span className="text-base font-medium">
                    {data.amazingCohort}기
                  </span>
                  <span className="text-white bg-blue-500 px-2 py-1 rounded-full">
                    완료
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50px] flex flex-col justify-center items-center">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="block text-sm text-gray-600 mt-1">
            어메이징 과정에 대한 데이터가 존재하지 않습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default AmazingMenteeBlock;
