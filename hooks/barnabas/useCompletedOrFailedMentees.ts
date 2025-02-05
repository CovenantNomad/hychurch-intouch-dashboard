import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import graphlqlRequestClient from "../../client/graphqlRequestClient";
import {getCompletedOrFailedMentorships} from "../../firebase/Barnabas/barnabas";
import {
  FindBlessingCellQuery,
  FindBlessingCellQueryVariables,
  useFindBlessingCellQuery,
  UserCellTransferStatus,
} from "../../graphql/generated";
import {TMatching, TMatchingStatus} from "../../interface/barnabas";
import {SpecialCellIdType} from "../../interface/cell";
import {getTodayString} from "../../utils/dateUtils";

export const useCompletedOrFailedMentees = () => {
  const [completedMentees, setCompletedMentees] = useState<TMatching[]>([]);
  const [failedMentees, setFailedMentees] = useState<TMatching[]>([]);
  const now = dayjs();
  const [datafilter, setDatafilter] = useState({
    min: getTodayString(dayjs(now.set("year", -2))),
    max: getTodayString(now),
  });
  const {isLoading: isMenteeLoading, data: menteeData} =
    useFindBlessingCellQuery<
      FindBlessingCellQuery,
      FindBlessingCellQueryVariables
    >(
      graphlqlRequestClient,
      {
        id: Number(SpecialCellIdType.Blessing),
        transferOutStatus: [UserCellTransferStatus.Ordered],
        transferOutDateFilter: {
          between: {
            min: datafilter.min,
            max: datafilter.max,
          },
        },
      },
      {
        staleTime: 10 * 60 * 1000,
        cacheTime: 15 * 60 * 1000,
      }
    );

  const menteeIds =
    menteeData?.findCell?.members.map((mentee) => mentee.id) || [];

  // 2️⃣ Firestore에서 "completed" OR "failed" 상태의 멘토십 데이터 가져오기
  const {isLoading: isMentorshipLoading, data: mentorshipData} = useQuery(
    ["getCompletedOrFailedMentorships"],
    () => getCompletedOrFailedMentorships(menteeIds),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: menteeIds.length > 0,
    }
  );

  // 3️⃣ 멘티 데이터를 Firestore 결과와 매칭하여 분류
  useEffect(() => {
    if (!mentorshipData) return;

    // 🔹 "completed" 상태의 멘티 필터링 & 매핑
    const completedData: TMatching[] = menteeIds
      .filter((menteeId) => mentorshipData.completedMap.has(menteeId))
      .map((menteeId) => {
        const mentorshipDetails = mentorshipData.completedMap.get(menteeId);

        return {
          id: mentorshipDetails?.id || "", // Firestore 문서 ID
          barnabaId: mentorshipDetails?.barnabaId || "",
          menteeId: menteeId,
          barnabaName: mentorshipDetails?.barnabaName || "알 수 없음",
          menteeName: mentorshipDetails?.menteeName || "알 수 없음",
          status: mentorshipDetails?.status || TMatchingStatus.COMPLETED,
          firstMeetingDate: mentorshipDetails?.firstMeetingDate || undefined, // ✅ null 대신 undefined
          lastMeetingDate: mentorshipDetails?.lastMeetingDate || undefined, // ✅ null 대신 undefined
          matchingDate: mentorshipDetails?.matchingDate || "",
          completedDate: mentorshipDetails?.completedDate || "",
          completedMeetingCount:
            mentorshipDetails?.completedMeetingCount ?? "0",
          scheduledMeetingCount:
            mentorshipDetails?.scheduledMeetingCount ?? "0",
          description: mentorshipDetails?.description || "",
        };
      });

    // 🔹 "failed" 상태의 멘티 필터링 & 매핑
    const failedData: TMatching[] = menteeIds
      .filter((menteeId) => mentorshipData.failedMap.has(menteeId))
      .map((menteeId) => {
        const mentorshipDetails = mentorshipData.failedMap.get(menteeId);

        return {
          id: mentorshipDetails?.id || "",
          barnabaId: mentorshipDetails?.barnabaId || "",
          menteeId: menteeId,
          barnabaName: mentorshipDetails?.barnabaName || "알 수 없음",
          menteeName: mentorshipDetails?.menteeName || "알 수 없음",
          status: mentorshipDetails?.status || TMatchingStatus.FAILED,
          firstMeetingDate: mentorshipDetails?.firstMeetingDate || undefined, // ✅ null 대신 undefined
          lastMeetingDate: mentorshipDetails?.lastMeetingDate || undefined, // ✅ null 대신 undefined
          matchingDate: mentorshipDetails?.matchingDate || "",
          completedDate: mentorshipDetails?.completedDate || "",
          completedMeetingCount:
            mentorshipDetails?.completedMeetingCount ?? "0",
          scheduledMeetingCount:
            mentorshipDetails?.scheduledMeetingCount ?? "0",
          description: mentorshipDetails?.description || "",
        };
      });

    // ✅ `useState` 업데이트
    setCompletedMentees(completedData);
    setFailedMentees(failedData);
  }, [mentorshipData]);

  return {
    completedMentees,
    failedMentees,
    isLoading: isMenteeLoading || isMentorshipLoading,
  };
};
