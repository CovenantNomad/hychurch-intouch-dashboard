import {useQuery} from "react-query";
import {fetchIndividualBarnabaMentorship} from "../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../interface/barnabas";
import {getGender} from "../../../../../utils/utils";
import EmptyState from "../../../../Atoms/EmptyStates/EmptyState";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../ui/Accordion";
import MenteeBarnabasMeetings from "./_components/MenteeBarnabasMeetings";

type Props = {
  userId: string;
};

const BarnabaMenteeBlock = ({userId}: Props) => {
  const {data, isLoading, isFetching, error} = useQuery(
    ["fetchBarnabaMentorship", userId],
    () => fetchIndividualBarnabaMentorship(userId),
    {
      enabled: !!userId, // menteeId가 존재할 때만 실행
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    }
  );

  if (error) {
    return (
      <div className="border px-4 py-8 rounded-md">
        <p className="text-sm text-center">
          바나바 과정 데이터를 가져오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="border px-4 py-4 rounded-md">
      {isLoading || isFetching ? (
        <div className="py-4">로딩중...</div>
      ) : data ? (
        <div>
          <h3 className="text-base font-medium">바나바 과정</h3>
          <div className="flex justify-between mt-4">
            <div className="text-sm space-x-2">
              <span>담당 바나바:</span>
              <span>
                {data.barnabaProfile?.name}{" "}
                {getGender(data.barnabaProfile?.gender!)}
              </span>
            </div>
            <div className="text-sm space-x-2">
              <span>진행상태</span>
              {data.mentorship.status === TMatchingStatus.PENDING && (
                <span className="text-white bg-gray-600 px-2 py-1 rounded-full">
                  지연중
                </span>
              )}
              {data.mentorship.status === TMatchingStatus.PROGRESS && (
                <span className="text-white bg-emerald-500 px-2 py-1 rounded-full">
                  진행중
                </span>
              )}
              {data.mentorship.status === TMatchingStatus.COMPLETED && (
                <span className="text-white bg-blue-500 px-2 py-1 rounded-full">
                  수료
                </span>
              )}
              {data.mentorship.status === TMatchingStatus.FAILED && (
                <span className="text-white bg-amber-500 px-2 py-1 rounded-full">
                  보류
                </span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="border rounded-lg text-sm">
              <div className="flex">
                <div className="flex-1 flex items-center py-2 px-4 border-r border-b">
                  <div className="flex-1">시작일</div>
                  <div className="flex-[2]">
                    {data.mentorship.matchingDate || ""}
                  </div>
                </div>
                <div className="flex-1 flex items-center py-2 px-4 border-b">
                  <div className="flex-1">종료일</div>
                  <div className="flex-[2]">
                    {data.mentorship.completedDate || ""}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1 flex items-center py-2 px-4 border-r">
                  <div className="flex-1">첫 만남</div>
                  <div className="flex-[2]">
                    {data.mentorship.firstMeetingDate || ""}
                  </div>
                </div>
                <div className="flex-1 flex items-center py-2 px-4">
                  <div className="flex-1">마지막 만남</div>
                  <div className="flex-[2]">
                    {data.mentorship.lastMeetingDate || ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-base font-medium">세부일정</h4>
            <Accordion type="multiple" className="mt-1">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger>
                  <div className="flex items-center space-x-3">
                    <span>
                      진행된 만남: {data.mentorship.completedMeetingCount}회
                    </span>
                    <span>|</span>
                    <span>
                      예정된 만남: {data.mentorship.scheduledMeetingCount}회
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <MenteeBarnabasMeetings matchingId={data.mentorship.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <EmptyState text="바나바 과정에 대한 데이터가 존재하지 않습니다." />
      )}
    </div>
  );
};

export default BarnabaMenteeBlock;
