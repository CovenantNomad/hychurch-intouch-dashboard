import dayjs from "dayjs";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {
  TAppointment,
  TBarnabaProfile,
  TMatching,
  TMatchingStatus,
  TMenteeStatus,
} from "../../interface/barnabas";
import {BARNABAS_COLLCTION} from "../../interface/firebase";
import {MemberWithTransferOut} from "../../interface/user";

export const registerBarnaba = async (profiles: TBarnabaProfile[]) => {
  try {
    // Firestore에 멤버 저장
    const savePromises = profiles.map(async (profile) => {
      // 각 멤버의 고유 레퍼런스를 생성
      const barnabaRef = doc(
        db,
        BARNABAS_COLLCTION.BARNABAS,
        BARNABAS_COLLCTION.DATA,
        BARNABAS_COLLCTION.BARNABAPROFILE,
        profile.id // 각 멤버의 id를 문서 ID로 사용
      );

      // Firestore에 데이터 저장
      await setDoc(barnabaRef, {
        id: profile.id,
        name: profile.name,
        gender: profile.gender || null,
        birthday: profile.birthday || null,
        isActive: profile.isActive,
        cohort: profile.cohort,
      });
    });

    // 모든 저장 프로세스가 완료될 때까지 대기
    await Promise.all(savePromises);
  } catch (error: any) {
    console.error("@registerBarnaba Error: ", error);
  }
};

export const fetchBarnabaMembers = async (): Promise<TBarnabaProfile[]> => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE
    );

    const querySnapshot = await getDocs(barnabasRef);

    // 데이터 매핑
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      gender: doc.data().gender || null,
      birthday: doc.data().birthday || null,
      isActive: doc.data().isActive,
      cohort: doc.data().cohort,
    }));
  } catch (error) {
    console.error("Error fetching barnaba members: ", error);
    throw new Error("바나바 멤버를 가져오는 중 에러가 발생했습니다.");
  }
};

export const getGroupedDataByCohort = async () => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE
    );

    const querySnapshot = await getDocs(barnabasRef);

    const groupedData = querySnapshot.docs.reduce((acc, doc) => {
      const data = {
        id: doc.id,
        name: doc.data().name,
        gender: doc.data().gender || null,
        birthday: doc.data().birthday || null,
        isActive: doc.data().isActive,
        cohort: doc.data().cohort,
      };

      const cohort = data.cohort; // cohort 값을 가져옴
      if (!acc[cohort]) {
        acc[cohort] = []; // cohort가 없으면 새 배열 생성
      }
      acc[cohort].push(data); // cohort 그룹에 데이터 추가

      return acc;
    }, {} as Record<string, any[]>);

    return groupedData;
  } catch (error) {
    console.error("Error fetching barnaba members: ", error);
    throw new Error("바나바 멤버를 가져오는 중 에러가 발생했습니다.");
  }
};

export const getGroupedBarnabasByAge = async () => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE
    );

    const barnabasQuery = query(barnabasRef, where("isActive", "==", true));

    const querySnapshot = await getDocs(barnabasQuery);

    const groupedData = querySnapshot.docs.reduce((acc, doc) => {
      const data = {
        id: doc.id,
        name: doc.data().name,
        gender: doc.data().gender || null,
        birthday: doc.data().birthday || null,
        isActive: doc.data().isActive,
        cohort: doc.data().cohort,
      };

      const age = dayjs(data.birthday).year(); // cohort 값을 가져옴
      if (!acc[age]) {
        acc[age] = []; // cohort가 없으면 새 배열 생성
      }
      acc[age].push(data); // cohort 그룹에 데이터 추가

      return acc;
    }, {} as Record<string, TBarnabaProfile[]>);

    return groupedData;
  } catch (error) {
    console.error("Error fetching barnaba members: ", error);
    throw new Error("바나바 멤버를 가져오는 중 에러가 발생했습니다.");
  }
};

export const fetchLatestMentorship = async (
  memberId: string
): Promise<TMatching | null> => {
  try {
    // Firestore 컬렉션 참조
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    // barnabaId가 memberId와 일치하는 문서 쿼리
    const mentorshipQuery = query(
      mentorshipRef,
      where("barnabaId", "==", memberId),
      orderBy("matchingDate", "desc"), // 최신 날짜 순으로 정렬
      limit(1) // 가장 최근 데이터 1개만 가져오기
    );

    // 쿼리 실행
    const querySnapshot = await getDocs(mentorshipQuery);

    // 결과가 없는 경우
    if (querySnapshot.empty) {
      return null;
    }

    // 가장 최근 데이터 반환
    const latestMentorship = querySnapshot.docs[0].data() as TMatching;
    return latestMentorship;
  } catch (error) {
    console.error(
      "Error fetching the latest mentorship for member:",
      memberId,
      error
    );
    throw new Error(
      "가장 최근 Mentorship 데이터를 가져오는 중 에러가 발생했습니다."
    );
  }
};

export const fetchBarnabaWithoutActiveMentorship = async (): Promise<
  TBarnabaProfile[]
> => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE
    );

    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    // 1. isActive가 true인 바나바 멤버 가져오기
    const barnabasQuery = query(barnabasRef, where("isActive", "==", true));
    const barnabasSnapshot = await getDocs(barnabasQuery);
    const activeBarnabas = barnabasSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      gender: doc.data().gender || null,
      birthday: doc.data().birthday || null,
      isActive: doc.data().isActive,
      cohort: doc.data().cohort,
    }));

    // 2. mentorshipStatus가 in-progress인 멤버 가져오기
    const mentorshipQuery = query(
      mentorshipRef,
      where("status", "==", TMatchingStatus.PROGRESS)
    );
    const mentorshipSnapshot = await getDocs(mentorshipQuery);
    const activeMentorshipIds = mentorshipSnapshot.docs.map(
      (doc) => doc.data().barnabaId
    );

    // 3. Mentorship이 in-progress가 아닌 멤버 필터링
    const filteredBarnabas = activeBarnabas.filter(
      (barnaba) => !activeMentorshipIds.includes(barnaba.id)
    );

    return filteredBarnabas;
  } catch (error) {
    console.error(
      "Error fetching Barnaba members without active mentorship: ",
      error
    );
    throw new Error(
      "Mentorship이 진행 중이 아닌 멤버를 가져오는 중 에러가 발생했습니다."
    );
  }
};

export const fetchAvailableMentees = async (
  mentees: MemberWithTransferOut[]
): Promise<MemberWithTransferOut[]> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    // 1. 멘티 ID 추출
    const menteeIds = mentees.map((mentee) => mentee.id);

    // 2. Firestore 쿼리 실행
    const chunkedIds = chunkArray(menteeIds, 10); // 최대 10개씩 나눔
    let availableMenteeIds: string[] = [];

    const promises = chunkedIds.map(async (chunk) => {
      const q = query(mentorshipRef, where("menteeId", "in", chunk));
      const querySnapshot = await getDocs(q);

      // Firestore에 없는 멘티 ID만 추출
      const foundIds = querySnapshot.docs.map((doc) => doc.data().menteeId);
      const unavailableIds = chunk.filter((id) => !foundIds.includes(id));

      // Firestore에 없는 멘티 ID를 누적
      availableMenteeIds = availableMenteeIds.concat(unavailableIds);
    });

    await Promise.all(promises);

    // 3. 멘티 리스트에서 사용 가능한 ID만 반환
    const availableMentees = mentees.filter((mentee) =>
      availableMenteeIds.includes(mentee.id)
    );

    return availableMentees;
  } catch (error) {
    console.error("Error fetching available mentees: ", error);
    throw new Error(
      "멘토십이 진행되지 않은 멘티를 가져오는 중 에러가 발생했습니다."
    );
  }
};

// Helper 함수: 배열을 최대 n개씩 나눔
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

// 바나바 매칭 함수
export const createBarnabaMatching = async (
  matchingData: Omit<TMatching, "id">
): Promise<void> => {
  try {
    // Firestore 컬렉션 참조
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    // 1. 문서 추가 및 ID 자동 생성
    const docRef = await addDoc(mentorshipRef, {...matchingData});

    // 2. 생성된 ID를 필드에 포함시켜 업데이트
    await updateDoc(
      doc(
        db,
        BARNABAS_COLLCTION.BARNABAS,
        BARNABAS_COLLCTION.DATA,
        BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
        docRef.id
      ),
      {
        id: docRef.id, // 자동 생성된 문서 ID 저장
      }
    );
  } catch (error) {
    console.error("Error saving matching data:", error);
    throw new Error("매칭 데이터를 저장하는 중 에러가 발생했습니다.");
  }
};

export const saveMenteeProfile = async (menteeData: MemberWithTransferOut) => {
  try {
    if (!menteeData || !menteeData.id) {
      throw new Error("멘티 데이터 또는 ID가 없습니다.");
    }

    const menteeRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MENTEEPROFILE,
      menteeData.id // 멘티 ID를 문서 ID로 사용
    );

    await setDoc(
      menteeRef,
      {
        id: menteeData.id,
        name: menteeData.name,
        birthday: menteeData.birthday,
        gender: menteeData.gender,
        phone: menteeData.phone,
        address: menteeData.address,
        registrationDate: menteeData.registrationDate,
        description: "",
      },
      {merge: true}
    );
  } catch (error) {
    console.error("멘티 프로필 저장 중 오류 발생:", error);
    throw new Error("멘티 프로필 저장 중 오류가 발생했습니다.");
  }
};

// 멘티 진행과정 호출함수
export const fetchMenteeStatuses = async (members: MemberWithTransferOut[]) => {
  const statuses: Record<string, TMenteeStatus> = {};

  await Promise.all(
    members.map(async (member) => {
      const barnabaRef = collection(
        db,
        BARNABAS_COLLCTION.BARNABAS,
        BARNABAS_COLLCTION.DATA,
        BARNABAS_COLLCTION.BARNABAMENTORSHIPS
      );
      const amazingRef = collection(
        db,
        BARNABAS_COLLCTION.BARNABAS,
        BARNABAS_COLLCTION.DATA,
        BARNABAS_COLLCTION.AMAZINGMENTORSHIPS
      );

      // Barnaba 쿼리
      const barnabaSnapshot = await getDocs(
        query(barnabaRef, where("menteeId", "==", member.id))
      );

      // Amazing 쿼리
      const amazingSnapshot = await getDocs(
        query(amazingRef, where("menteeId", "==", member.id))
      );

      // 상태 저장
      statuses[member.id] = {
        isInBarnaba: !barnabaSnapshot.empty,
        barnabaStatus: barnabaSnapshot.empty
          ? null
          : barnabaSnapshot.docs[0]?.data().status || null,

        isInAmazing: !amazingSnapshot.empty,
        amazingStatus: amazingSnapshot.empty
          ? null
          : amazingSnapshot.docs[0]?.data().status || null,
      };
    })
  );

  return statuses;
};

// 멘티 진행상태 업데이트 함수
export const updateSingleMemberStatus = async (memberId: string) => {
  const barnabaRef = collection(db, "barnabamentorship");
  const amazingRef = collection(db, "amazingMentorship");

  // Firestore 쿼리 실행
  const [barnabaSnapshot, amazingSnapshot] = await Promise.all([
    getDocs(query(barnabaRef, where("menteeId", "==", memberId))),
    getDocs(query(amazingRef, where("menteeId", "==", memberId))),
  ]);

  return {
    isInBarnaba: !barnabaSnapshot.empty,
    barnabaStatus: barnabaSnapshot.empty
      ? null
      : barnabaSnapshot.docs[0]?.data().status || null,
    isInAmazing: !amazingSnapshot.empty,
    amazingStatus: amazingSnapshot.empty
      ? null
      : amazingSnapshot.docs[0]?.data().status || null,
  };
};

{
  /* 멘티 디테일 페이지 */
}

// 멘티 개인 바나바 데이터 호출
export const fetchIndividualBarnabaMentorship = async (
  menteeId: string
): Promise<{
  mentorship: TMatching;
  barnabaProfile: TBarnabaProfile | null;
} | null> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    // Firestore에서 menteeId가 일치하는 문서 조회
    const q = query(mentorshipRef, where("menteeId", "==", menteeId));
    const querySnapshot = await getDocs(q);

    // 문서가 없는 경우 null 반환
    if (querySnapshot.empty) {
      console.warn(`No mentorship found for menteeId: ${menteeId}`);
      return null;
    }

    // 첫 번째 멘토십 데이터 가져오기
    const docData = querySnapshot.docs[0];
    const mentorshipData = {
      id: docData.id,
      ...docData.data(),
    } as TMatching;

    // barnabaId를 이용해 바나바 프로필 정보 가져오기
    const barnabaRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE,
      mentorshipData.barnabaId
    );

    const barnabaDoc = await getDoc(barnabaRef);
    const barnabaProfile = barnabaDoc.exists()
      ? ({id: barnabaDoc.id, ...barnabaDoc.data()} as TBarnabaProfile)
      : null;

    return {mentorship: mentorshipData, barnabaProfile};
  } catch (error) {
    console.error("Error fetching Barnaba mentorship:", error);
    throw new Error("바나바 멘토십 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

//바나바 세부만남 일정 전체 불러오기
export const getAllMeetingsByMatchingId = async (
  matchingId: string
): Promise<TAppointment[]> => {
  try {
    // Firestore 컬렉션 참조
    const meetingRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES
    );

    const meetingQuery = query(
      meetingRef,
      where("matchingId", "==", matchingId)
    );

    const querySnapshot = await getDocs(meetingQuery);

    if (querySnapshot.empty) {
      return [];
    }

    const meetings: TAppointment[] = querySnapshot.docs.map(
      (doc) => doc.data() as TAppointment
    );

    return meetings;
  } catch (error) {
    console.error("@getAppointmentByMatchingId: ", error);
    throw new Error("이번주 만남일정을 가져오는 중 에러가 발생했습니다.");
  }
};

{
  /* 탭3 - 바나바과정 */
}

//현재진행상태 멘토십 가져오기
export const getBarnabasCourseByStatus = async (
  status: TMatchingStatus
): Promise<TMatching[]> => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS
    );

    const barnabasQuery = query(barnabasRef, where("status", "==", status));

    const querySnapshot = await getDocs(barnabasQuery);

    if (querySnapshot.empty) {
      return [];
    }

    const mentorships: TMatching[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as TMatching)
    );

    return mentorships;
  } catch (error) {
    console.error("@getProgressBarnabasCourse: ", error);
    throw new Error(
      "현재 진행중인 바나바 과정을 가져오는 중 에러가 발생했습니다."
    );
  }
};

//바나바일정 현재주차 약속정보 가져오기
export const getAppointmentByMatchingId = async (
  matchingId: string
): Promise<TAppointment | null> => {
  try {
    // Firestore 컬렉션 참조
    const meetingRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES
    );

    const meetingQuery = query(
      meetingRef,
      where("matchingId", "==", matchingId),
      orderBy("week", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(meetingQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    return doc.data() as TAppointment;
  } catch (error) {
    console.error("@getAppointmentByMatchingId: ", error);
    throw new Error("이번주 만남일정을 가져오는 중 에러가 발생했습니다.");
  }
};

export const updateBarnabaMentorship = async ({
  matchingId,
  status,
  description,
}: {
  matchingId: string;
  status: TMatchingStatus;
  description?: string;
}) => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      matchingId
    );

    const today = dayjs(new Date()).format("YYYY-MM-DD");

    await updateDoc(mentorshipRef, {
      status,
      description,
      completedDate: today,
    });
  } catch (error) {
    console.error("바나바 멘토십 업데이트 실패:", error);
    throw new Error("멘토십 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};

//현재 멘티 중 바나바 완료한 현황 불러오기
export const getCompletedOrFailedMentorships = async (
  menteeIds: string[]
): Promise<{
  completedMap: Map<string, TMatching>;
  failedMap: Map<string, TMatching>;
}> => {
  const completedMap = new Map<string, TMatching>();
  const failedMap = new Map<string, TMatching>();

  if (!menteeIds.length) return {completedMap, failedMap};

  const mentorshipRef = collection(
    db,
    BARNABAS_COLLCTION.BARNABAS,
    BARNABAS_COLLCTION.DATA,
    BARNABAS_COLLCTION.BARNABAMENTORSHIPS
  );

  // 🔥 최대 10개씩 Firestore에서 "in" 조건으로 조회 (Firestore의 제한 사항 고려)
  const chunkSize = 10;
  const promises = [];

  for (let i = 0; i < menteeIds.length; i += chunkSize) {
    const chunk = menteeIds.slice(i, i + chunkSize);
    const mentorshipQuery = query(
      mentorshipRef,
      where("menteeId", "in", chunk) // ✅ `in` 필터는 하나만 사용
    );
    promises.push(getDocs(mentorshipQuery));
  }

  const querySnapshots = await Promise.all(promises);

  querySnapshots.forEach((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data() as TMatching;

      // ✅ Firestore에서 가져온 후 `status`를 필터링
      if (data.status === TMatchingStatus.COMPLETED) {
        completedMap.set(data.menteeId, data);
      } else if (data.status === TMatchingStatus.FAILED) {
        failedMap.set(data.menteeId, data);
      }
    });
  });

  return {completedMap, failedMap};
};

export const reStartBarnabaMentorship = async (matchingId: string) => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      matchingId
    );

    await updateDoc(mentorshipRef, {
      status: TMatchingStatus.PROGRESS,
      completedDate: "",
    });
  } catch (error) {
    console.error("바나바 멘토십 업데이트 실패:", error);
    throw new Error("멘토십 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};
