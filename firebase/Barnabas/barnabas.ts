import dayjs from "dayjs";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {
  TAmazingCourse,
  TAmazingCourseStatus,
  TAmazingMember,
  TAmazingMentorshipStatus,
  TAppointment,
  TAppointmentStatus,
  TBarnabaProfile,
  TBarnabasDetail,
  TBarnabasHistory,
  TMatching,
  TMatchingStatus,
  TMenteeAttendance,
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
        profile.id, // 각 멤버의 id를 문서 ID로 사용
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
      BARNABAS_COLLCTION.BARNABAPROFILE,
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
      BARNABAS_COLLCTION.BARNABAPROFILE,
    );

    const querySnapshot = await getDocs(barnabasRef);

    const groupedData = querySnapshot.docs.reduce(
      (acc, doc) => {
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
      },
      {} as Record<string, any[]>,
    );

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
      BARNABAS_COLLCTION.BARNABAPROFILE,
    );

    const barnabasQuery = query(barnabasRef, where("isActive", "==", true));

    const querySnapshot = await getDocs(barnabasQuery);

    const groupedData = querySnapshot.docs.reduce(
      (acc, doc) => {
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
      },
      {} as Record<string, TBarnabaProfile[]>,
    );

    return groupedData;
  } catch (error) {
    console.error("Error fetching barnaba members: ", error);
    throw new Error("바나바 멤버를 가져오는 중 에러가 발생했습니다.");
  }
};

export const fetchLatestMentorship = async (
  memberId: string,
): Promise<TMatching | null> => {
  try {
    // Firestore 컬렉션 참조
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
    );

    // barnabaId가 memberId와 일치하는 문서 쿼리
    const mentorshipQuery = query(
      mentorshipRef,
      where("barnabaId", "==", memberId),
      orderBy("matchingDate", "desc"), // 최신 날짜 순으로 정렬
      limit(1), // 가장 최근 데이터 1개만 가져오기
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
      error,
    );
    throw new Error(
      "가장 최근 Mentorship 데이터를 가져오는 중 에러가 발생했습니다.",
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
      BARNABAS_COLLCTION.BARNABAPROFILE,
    );

    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
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

    {
      /* 중복도 가능한것 같아서 우선 보류 */
    }
    // // 2. mentorshipStatus가 in-progress인 멤버 가져오기
    // const mentorshipQuery = query(
    //   mentorshipRef,
    //   where("status", "==", TMatchingStatus.PROGRESS)
    // );
    // const mentorshipSnapshot = await getDocs(mentorshipQuery);
    // const activeMentorshipIds = mentorshipSnapshot.docs.map(
    //   (doc) => doc.data().barnabaId
    // );

    // // 3. Mentorship이 in-progress가 아닌 멤버 필터링
    // const filteredBarnabas = activeBarnabas.filter(
    //   (barnaba) => !activeMentorshipIds.includes(barnaba.id)
    // );

    return activeBarnabas;
  } catch (error) {
    console.error(
      "Error fetching Barnaba members without active mentorship: ",
      error,
    );
    throw new Error(
      "Mentorship이 진행 중이 아닌 멤버를 가져오는 중 에러가 발생했습니다.",
    );
  }
};

export const fetchAvailableMentees = async (
  mentees: MemberWithTransferOut[],
): Promise<MemberWithTransferOut[]> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
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
      availableMenteeIds.includes(mentee.id),
    );

    return availableMentees;
  } catch (error) {
    console.error("Error fetching available mentees: ", error);
    throw new Error(
      "멘토십이 진행되지 않은 멘티를 가져오는 중 에러가 발생했습니다.",
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
  matchingData: Omit<TMatching, "id">,
): Promise<void> => {
  try {
    // Firestore 컬렉션 참조
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
    );

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      matchingData.barnabaId,
    );

    // Firestore 트랜잭션 사용
    await runTransaction(db, async (transaction) => {
      // 1️⃣ 바나바 히스토리 문서 읽기
      const historySnapshot = await transaction.get(historyRef);

      const name = historySnapshot.exists()
        ? (historySnapshot.data()?.barnabaName ?? "알 수 없음")
        : matchingData.barnabaName;

      const newTotal =
        (historySnapshot.exists() ? historySnapshot.data().total : 0) + 1;
      const passCount = historySnapshot.exists()
        ? (historySnapshot.data()?.pass ?? 0)
        : 0;
      const failCount = historySnapshot.exists()
        ? (historySnapshot.data()?.fail ?? 0)
        : 0;
      const isActiveStatus = historySnapshot.exists()
        ? (historySnapshot.data()?.isActive ?? true)
        : true;

      // 2️⃣ 새로운 매칭 문서 추가 및 ID 생성
      const docRef = await addDoc(mentorshipRef, {...matchingData});
      const newMatchingId = docRef.id;

      // 3️⃣ 생성된 ID를 포함하여 매칭 문서 업데이트
      transaction.update(docRef, {id: newMatchingId});

      // 4️⃣ `total`, `pass`, `fail` 값이 항상 존재하도록 보장
      transaction.set(historyRef, {
        barnabaName: name,
        total: newTotal,
        pass: passCount, // ✅ `undefined` 방지
        fail: failCount, // ✅ `undefined` 방지
        isActive: isActiveStatus,
      });

      // 5️⃣ barnabasDetails 컬렉션에 새로운 문서 추가
      const detailsRef = doc(
        collection(historyRef, "barnabasDetails"),
        newMatchingId,
      );
      transaction.set(detailsRef, {
        matchingId: newMatchingId,
        menteeId: matchingData.menteeId,
        menteeName: matchingData.menteeName || "알 수 없음",
        matchingDate: matchingData.matchingDate,
        scheduledMeetingCount: matchingData.scheduledMeetingCount,
        status: matchingData.status,
      });
    });
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
      menteeData.id, // 멘티 ID를 문서 ID로 사용
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
      {merge: true},
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
        BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      );
      const amazingRef = collection(
        db,
        BARNABAS_COLLCTION.BARNABAS,
        BARNABAS_COLLCTION.DATA,
        BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
      );

      // Barnaba 쿼리
      const barnabaSnapshot = await getDocs(
        query(barnabaRef, where("menteeId", "==", member.id)),
      );

      // Amazing 쿼리
      const amazingSnapshot = await getDocs(
        query(amazingRef, where("menteeId", "==", member.id)),
      );

      // 상태 저장
      statuses[member.id] = {
        isInBarnaba: !barnabaSnapshot.empty && amazingSnapshot.empty, // 어메이징이 있으면 false
        barnabaStatus:
          !barnabaSnapshot.empty && amazingSnapshot.empty
            ? barnabaSnapshot.docs[0]?.data().status || null
            : null,

        isInAmazing: !amazingSnapshot.empty,
        amazingStatus: !amazingSnapshot.empty
          ? amazingSnapshot.docs[0]?.data().status || null
          : null,
      };
    }),
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
  menteeId: string,
): Promise<{
  mentorship: TMatching;
  barnabaProfile: TBarnabaProfile | null;
} | null> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
    );

    // Firestore에서 menteeId가 일치하는 문서 조회
    const q = query(mentorshipRef, where("menteeId", "==", menteeId));
    const querySnapshot = await getDocs(q);

    // 문서가 없는 경우 null 반환
    if (querySnapshot.empty) {
      console.log(`No mentorship found for menteeId: ${menteeId}`);
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
      mentorshipData.barnabaId,
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
  matchingId: string,
): Promise<TAppointment[]> => {
  try {
    // Firestore 컬렉션 참조
    const meetingRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const meetingQuery = query(
      meetingRef,
      where("matchingId", "==", matchingId),
    );

    const querySnapshot = await getDocs(meetingQuery);

    if (querySnapshot.empty) {
      return [];
    }

    const meetings: TAppointment[] = querySnapshot.docs.map(
      (doc) => doc.data() as TAppointment,
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
  status: TMatchingStatus,
): Promise<TMatching[]> => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
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
        }) as TMatching,
    );

    return mentorships;
  } catch (error) {
    console.error("@getProgressBarnabasCourse: ", error);
    throw new Error(
      "현재 진행중인 바나바 과정을 가져오는 중 에러가 발생했습니다.",
    );
  }
};

//바나바일정 현재주차 약속정보 가져오기
export const getAppointmentByMatchingId = async (
  matchingId: string,
  completedMeetingCount: string,
): Promise<TAppointment | null> => {
  try {
    // Firestore 컬렉션 참조
    const meetingRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const queryWeek = (Number(completedMeetingCount) + 1).toString();

    const meetingQuery = query(
      meetingRef,
      where("matchingId", "==", matchingId),
      where("week", "==", queryWeek),
      limit(1),
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
  barnabaId,
  status,
  description,
  menteeId,
  menteeName,
}: {
  matchingId: string;
  barnabaId: string;
  status: TMatchingStatus;
  description?: string;
  menteeId: string;
  menteeName: string;
}) => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      matchingId,
    );

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      barnabaId,
    );

    const detailsRef = doc(
      collection(historyRef, "barnabasDetails"),
      matchingId,
    );

    const appointmentsRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const amazingMentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
      menteeId,
    );

    const today = dayjs(new Date()).format("YYYY-MM-DD");

    const appointmentsQuery = query(
      appointmentsRef,
      where("matchingId", "==", matchingId),
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);

    await runTransaction(db, async (transaction) => {
      const historySnap = await transaction.get(historyRef);
      const currentHistory = historySnap.exists()
        ? historySnap.data()
        : {total: 0, pass: 0, fail: 0};

      let passCount = currentHistory.pass ?? 0;
      let failCount = currentHistory.fail ?? 0;

      // ✅ 상태가 "completed"이면 pass +1 증가
      if (status === TMatchingStatus.COMPLETED) {
        passCount += 1;
      }
      // ✅ 상태가 "failed"이면 fail +1 증가
      if (status === TMatchingStatus.FAILED) {
        failCount += 1;
      }

      // ✅ 히스토리 업데이트 (pass/fail 증가)
      transaction.update(historyRef, {
        pass: passCount,
        fail: failCount,
      });

      // ✅ 멘토십 상태 업데이트
      transaction.update(mentorshipRef, {
        status,
        description,
        completedDate: today,
      });

      // ✅ barnabasDetails 컬렉션 업데이트
      transaction.update(detailsRef, {
        status,
        completedDate: today,
      });

      // ✅ appointments의 matchingStatus 업데이트
      appointmentsSnapshot.forEach((appointmentDoc) => {
        transaction.update(appointmentDoc.ref, {
          matchingStatus: status,
          status:
            status === TMatchingStatus.FAILED &&
            appointmentDoc.data().status === TAppointmentStatus.SCHEDULED
              ? TAppointmentStatus.CANCELED
              : appointmentDoc.data().status,
        });
      });

      // ✅ "completed" 상태일 경우, 어메이징 멘토십 등록
      if (status === TMatchingStatus.COMPLETED) {
        transaction.set(
          amazingMentorshipRef,
          {
            menteeId,
            menteeName,
            status: TAmazingMentorshipStatus.WAITING,
          },
          {merge: true},
        );
      }
    });
  } catch (error) {
    console.error("바나바 멘토십 업데이트 실패:", error);
    throw new Error("멘토십 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};

//바나바일정 만남 횟수 업데이트 함수
export const updateScheduledMeetingCount = async ({
  matchingId,
  barnabaId,
  scheduledMeetingCount,
}: {
  matchingId: string;
  barnabaId: string;
  scheduledMeetingCount: string;
}): Promise<{success: boolean}> => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      matchingId,
    );

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      barnabaId,
    );

    const detailsRef = doc(
      collection(historyRef, "barnabasDetails"),
      matchingId,
    );

    const appointmentsRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const appointmentsQuery = query(
      appointmentsRef,
      where("matchingId", "==", matchingId),
    );

    const appointmentsSnapshot = await getDocs(appointmentsQuery);

    await runTransaction(db, async (transaction) => {
      // 바나바 멘토십
      transaction.update(mentorshipRef, {
        scheduledMeetingCount,
      });

      // 바나바 히스토리 상세
      transaction.update(detailsRef, {
        scheduledMeetingCount,
      });

      // 해당 matchingId의 모든 만남 일정
      appointmentsSnapshot.forEach((appointmentDoc) => {
        transaction.update(appointmentDoc.ref, {
          scheduledMeetingCount,
        });
      });
    });

    return {success: true};
  } catch (error) {
    console.error("@updateScheduledMeetingCount:", error);
    throw new Error("예정된 주차를 변경하는 중 오류가 발생했습니다.");
  }
};

//현재 멘티 중 바나바 완료한 현황 불러오기
export const getCompletedOrFailedMentorships = async (
  menteeIds: string[],
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
    BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
  );

  // 🔥 최대 10개씩 Firestore에서 "in" 조건으로 조회 (Firestore의 제한 사항 고려)
  const chunkSize = 10;
  const promises = [];

  for (let i = 0; i < menteeIds.length; i += chunkSize) {
    const chunk = menteeIds.slice(i, i + chunkSize);
    const mentorshipQuery = query(
      mentorshipRef,
      where("menteeId", "in", chunk), // ✅ `in` 필터는 하나만 사용
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

export const reStartBarnabaMentorship = async ({
  matchingId,
  barnabaId,
  reset,
}: {
  matchingId: string;
  barnabaId: string;
  reset: boolean;
}) => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAMENTORSHIPS,
      matchingId,
    );

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      barnabaId,
    );

    const detailsRef = doc(
      collection(historyRef, "barnabasDetails"),
      matchingId,
    );

    const appointmentsRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const appointmentsQuery = query(
      appointmentsRef,
      where("matchingId", "==", matchingId),
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);

    const today = dayjs(new Date()).format("YYYY-MM-DD");

    await runTransaction(db, async (transaction) => {
      // 🔹 히스토리 문서 조회
      const historySnap = await transaction.get(historyRef);
      const currentHistory = historySnap.exists()
        ? historySnap.data()
        : {total: 0, pass: 0, fail: 0};

      let failCount = currentHistory.fail ?? 0;

      // ✅ fail -1 감소 (최소 0 이상)
      if (failCount > 0) {
        failCount -= 1;
      }

      // 🔹 히스토리 업데이트
      transaction.update(historyRef, {
        fail: failCount,
      });

      // 🔹 barnabasDetails 업데이트
      transaction.update(detailsRef, {
        status: TMatchingStatus.PROGRESS,
        completedDate: "",
      });

      // ✅ 멘토쉽 상태 변경
      if (reset) {
        // ✅ reset = true → appointments 전체 삭제 및 초기화
        appointmentsSnapshot.forEach((appointmentDoc) => {
          transaction.delete(appointmentDoc.ref);
        });

        transaction.update(mentorshipRef, {
          status: TMatchingStatus.PROGRESS,
          firstMeetingDate: "",
          lastMeetingDate: "",
          matchingDate: today,
          completedMeetingCount: 0,
          completedDate: "",
          description: "",
        });
      } else {
        appointmentsSnapshot.forEach((appointmentDoc) => {
          transaction.update(appointmentDoc.ref, {
            matchingStatus: TMatchingStatus.PROGRESS,
          });
        });
        // ✅ reset = false → 상태만 변경
        transaction.update(mentorshipRef, {
          status: TMatchingStatus.PROGRESS,
          completedDate: "",
          description: "",
        });
      }
    });
  } catch (error) {
    console.error("바나바 멘토십 업데이트 실패:", error);
    throw new Error("멘토십 상태를 업데이트하는 중 오류가 발생했습니다.");
  }
};

//바나바 양육 이력 가져오기
export const getBarnabasHistory = async (): Promise<
  Omit<TBarnabasHistory, "barnabasDetails">[]
> => {
  try {
    const historyRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
    );

    const querySnapshot = await getDocs(historyRef);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        barnabaId: doc.id,
        barnabaName: data.barnabaName || "Unknown",
        total: data.total || 0,
        pass: data.pass || 0,
        fail: data.fail || 0,
        isActive: data.isActive || false,
      } as Omit<TBarnabasHistory, "barnabasDetails">;
    });
  } catch (error) {
    console.error("@getBarnabasHistory: ", error);
    throw new Error("바나바 양육 이력을 가져오는 중 에러가 발생했습니다.");
  }
};

export async function fetchMonthlyAppointments(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1); // 해당 달의 시작일
  const endDate = new Date(year, month, 0); // 해당 달의 마지막일

  const barnabasRef = collection(
    db,
    BARNABAS_COLLCTION.BARNABAS,
    BARNABAS_COLLCTION.DATA,
    BARNABAS_COLLCTION.MEETINGSCHEDULES,
  );

  const q = query(
    barnabasRef,
    where("date", ">=", startDate.toISOString().split("T")[0]),
    where("date", "<=", endDate.toISOString().split("T")[0]),
  );

  const querySnapshot = await getDocs(q);

  const appointments: TAppointment[] = querySnapshot.docs.map(
    (doc) => doc.data() as TAppointment,
  );

  return appointments;
}

export const getBarnabasYearlyRecords = async (
  year: number,
): Promise<Omit<TBarnabasHistory, "barnabasDetails">[]> => {
  try {
    const historyRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
    );

    const historySnapshot = await getDocs(historyRef);

    const barnabasYearlyHistory = await Promise.all(
      historySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const detailRef = collection(
          historyRef,
          doc.id,
          BARNABAS_COLLCTION.BARNABASDETAILS,
        );

        const q = query(
          detailRef,
          where("status", "in", [
            TMatchingStatus.COMPLETED,
            TMatchingStatus.FAILED,
          ]),
          where("completedDate", ">=", `${year}-01-01`),
          where("completedDate", "<=", `${year}-12-31`),
        );

        const querySnapshot = await getDocs(q);

        let total = querySnapshot.size;
        let pass = 0;
        let fail = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === TMatchingStatus.COMPLETED) pass += 1;
          if (data.status === TMatchingStatus.FAILED) fail += 1;
        });

        return {
          barnabaId: doc.id,
          barnabaName: data.barnabaName || "Unknown",
          total: total || 0,
          pass: pass || 0,
          fail: fail || 0,
          isActive: data.isActive || false,
        };
      }),
    );

    return barnabasYearlyHistory;
  } catch (error) {
    console.error("@getBarnabasYearlyRecords:", error);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
};

export const getMenteeAttendanceByDate = async (
  date: string,
): Promise<TMenteeAttendance[]> => {
  try {
    const attendanceRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.ATTENDANCES,
      BARNABAS_COLLCTION.DATE,
      date,
    );

    const querySnapshot = await getDocs(attendanceRef);

    if (querySnapshot.empty) {
      return [];
    }

    const menteeAttendances: TMenteeAttendance[] = querySnapshot.docs.map(
      (doc) => doc.data() as TMenteeAttendance,
    );

    return menteeAttendances;
  } catch (error) {
    console.error("@checkAttendanceSubmit:", error);
    throw new Error("멘티 예배출석 제출 여부를 조회하는데 실패했습니다.");
  }
};

export const updateBarnabaActiveStatus = async (
  barnabaId: string,
  isActive: boolean,
): Promise<{success: boolean}> => {
  try {
    const barnabaRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE,
      barnabaId,
    );

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      barnabaId,
    );

    await updateDoc(barnabaRef, {isActive});

    await updateDoc(historyRef, {isActive});

    return {success: true};
  } catch (error) {
    console.error("❌ 바나바 isActive 상태 변경 실패:", error);
    throw new Error("바나바의 활성 상태를 변경하는 중 오류가 발생했습니다.");
  }
};

export const getBarnabasProfileById = async (
  barnabaId: string,
): Promise<TBarnabaProfile | null> => {
  try {
    // Firestore 컬렉션 참조
    const barnabasRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.BARNABAPROFILE,
      barnabaId,
    );

    const docSnapshot = await getDoc(barnabasRef);

    if (!docSnapshot.exists()) {
      throw new Error("바나바 프로필이 등록되어 있지 않습니다.");
    }

    // 데이터 매핑
    return docSnapshot.data() as TBarnabaProfile;
  } catch (error) {
    console.error("Error fetching barnaba members: ", error);
    throw new Error("바나바 프로필을 가져오는 중 에러가 발생했습니다.");
  }
};

export const getBarnabasRecords = async (profileId: string) => {
  try {
    const currentYear = dayjs().year();

    const historyRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      profileId,
    );

    const thisYearHistoryRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      profileId,
      BARNABAS_COLLCTION.BARNABASDETAILS,
    );

    // 🎯 Firestore에서 status 필터링 먼저
    const q = query(
      thisYearHistoryRef,
      where("status", "in", [
        TMatchingStatus.COMPLETED,
        TMatchingStatus.FAILED,
      ]),
    );

    const [docSnap, querySnapshot] = await Promise.all([
      getDoc(historyRef),
      getDocs(q),
    ]);

    // 🎯 JavaScript에서 completedDate 필터링 수행
    const filteredDocs = querySnapshot.docs.filter((doc) => {
      const data = doc.data();
      return (
        data.completedDate >= `${currentYear}-01-01` &&
        data.completedDate <= `${currentYear}-12-31`
      );
    });

    // pass와 fail 분류
    let thisYearpass = 0;
    filteredDocs.forEach((doc) => {
      const data = doc.data();
      if (data.status === TMatchingStatus.COMPLETED) {
        thisYearpass++;
      }
    });

    if (docSnap.exists()) {
      const {total, pass, fail} = docSnap.data();
      return {total, pass, fail, thisYearpass};
    } else {
      console.log("해당 프로필의 기록을 찾을 수 없습니다.");
      return {
        total: 0,
        pass: 0,
        fail: 0,
        thisYearpass: 0,
      };
    }
  } catch (error) {
    console.error("@getBarnabasRecords:", error);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
};

export const getBarnabasYearlyRecordsById = async (
  profileId: string,
  year: number,
): Promise<TBarnabasDetail[]> => {
  try {
    const historyRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.STATS,
      BARNABAS_COLLCTION.HISTORY,
      profileId,
      BARNABAS_COLLCTION.BARNABASDETAILS,
    );

    const q = query(
      historyRef,
      where("status", "in", [
        TMatchingStatus.COMPLETED,
        TMatchingStatus.FAILED,
      ]),
      where("completedDate", ">=", `${year}-01-01`),
      where("completedDate", "<=", `${year}-12-31`),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const yearlyRecords: TBarnabasDetail[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        matchingId: doc.id, // Firestore 문서 ID
        completedDate: data.completedDate,
        matchingDate: data.matchingDate,
        menteeId: data.menteeId,
        menteeName: data.menteeName,
        scheduledMeetingCount: data.scheduledMeetingCount,
        status: data.status,
      } as TBarnabasDetail;
    });

    return yearlyRecords;
  } catch (error) {
    console.error("@getBarnabasYearlyRecords:", error);
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
};

export const openAmazingCourse = async (
  courseData: Omit<TAmazingCourse, "members">,
) => {
  try {
    const coursesRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
      courseData.cohort,
    );

    const existingCourse = await getDoc(coursesRef);

    if (existingCourse.exists()) {
      return {
        success: false,
        message: "이미 존재하는 기수입니다.",
      };
    }

    const newCourse = {
      ...courseData,
      members: [], // 초기에는 멤버 없음
    };

    await setDoc(coursesRef, newCourse);

    return {
      success: true,
      message: `어메이징 ${courseData.cohort}기가 개설 되었습니다. `,
    };
  } catch (error) {
    console.error("@openAmazingCourse", error);
    throw new Error("어메이징 과정을 생성하는 중 오류가 발생했습니다.");
  }
};

export const getAmazingCourse = async (): Promise<TAmazingCourse[]> => {
  try {
    const coursesRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
    );

    const q = query(
      coursesRef,
      where("status", "==", TAmazingCourseStatus.OPEN),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const amazingCourses: TAmazingCourse[] = querySnapshot.docs.map((doc) => {
      return doc.data() as TAmazingCourse;
    });

    return amazingCourses;
  } catch (error) {
    console.error("@getAmazingCourse", error);
    throw new Error("어메이징 과정을 불러오는 중 오류가 발생했습니다.");
  }
};

export const updateAmazingCourseDate = async (
  cohort: string,
  date: string,
): Promise<{success: boolean; message: string}> => {
  try {
    const courseRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
      cohort,
    );

    // 🔹 해당 기수가 존재하는지 확인
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      return {
        success: false,
        message: `${cohort}기 과정을 찾을 수 없습니다.`,
      };
    }

    // 🔹 날짜 포맷 검증 및 업데이트
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    await updateDoc(courseRef, {date: formattedDate});

    return {
      success: true,
      message: `${cohort}기의 시작일이 ${formattedDate}로 업데이트되었습니다.`,
    };
  } catch (error) {
    console.error("@updateAmazingCourseDate:", error);
    throw new Error("어메이징 과정 날짜 업데이트 중 오류가 발생했습니다.");
  }
};

export const closeAmazingCourse = async (
  cohort: string,
): Promise<{success: boolean; message: string}> => {
  try {
    const courseRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
      cohort,
    );

    // 🔹 해당 기수가 존재하는지 확인
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      return {
        success: false,
        message: `${cohort}기 과정을 찾을 수 없습니다.`,
      };
    }

    const courseData = courseSnap.data();
    if (!courseData || !Array.isArray(courseData.members)) {
      return {
        success: false,
        message: `${cohort}기수에 참여자 데이터가 존재하지 않습니다.`,
      };
    }

    await runTransaction(db, async (transaction) => {
      // 🔹 과정 상태를 `CLOSED`로 업데이트
      transaction.update(courseRef, {status: TAmazingCourseStatus.CLOSED});

      // 🔹 모든 멘티의 상태를 `COMPLETED`로 업데이트
      courseData.members.forEach((member: {menteeId: string}) => {
        const mentorshipRef = doc(
          db,
          BARNABAS_COLLCTION.BARNABAS,
          BARNABAS_COLLCTION.DATA,
          BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
          member.menteeId,
        );
        transaction.update(mentorshipRef, {
          status: TAmazingMentorshipStatus.COMPLETED,
        });
      });
    });

    return {
      success: true,
      message: `${cohort}기가 성공적으로 종료되었습니다.`,
    };
  } catch (error) {
    console.error("@closeAmazingCourse:", error);
    throw new Error("어메이징 과정을 종료하는 중 오류가 발생했습니다.");
  }
};

export const registerAmazingCourse = async (
  cohort: string,
  registerData: TAmazingMember,
): Promise<{success: boolean; message: string}> => {
  try {
    const coursesRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
      cohort,
    );

    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
      registerData.menteeId,
    );

    const courseDoc = await getDoc(coursesRef);
    if (!courseDoc.exists()) {
      console.log(
        `해당 기수(${registerData.amazingCohort})가 존재하지 않습니다.`,
      );
      return {
        success: false,
        message: `해당 기수(${registerData.amazingCohort})가 존재하지 않습니다.`,
      };
    }

    await updateDoc(coursesRef, {
      members: arrayUnion({
        menteeId: registerData.menteeId,
        menteeName: registerData.menteeName,
        status: registerData.status,
      }),
    });

    const mentorshipDoc = await getDoc(mentorshipRef);
    if (!mentorshipDoc.exists()) {
      // 문서가 없으면 새로 생성
      await setDoc(mentorshipRef, registerData);
    } else {
      // 문서가 있으면 기존 데이터 업데이트
      await updateDoc(mentorshipRef, registerData);
    }

    return {
      success: true,
      message: `${registerData.menteeName}, ${registerData.amazingCohort}기에 등록되었습니다.`,
    };
  } catch (error) {
    console.error("@registerAmazingCourse:", error);
    throw new Error("바나바의 활성 상태를 변경하는 중 오류가 발생했습니다.");
  }
};

export const getAmazingWaitingList = async (): Promise<TAmazingMember[]> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
    );

    const q = query(
      mentorshipRef,
      where("status", "==", TAmazingMentorshipStatus.WAITING),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const waitingList: TAmazingMember[] = querySnapshot.docs.map((doc) => {
      return doc.data() as TAmazingMember;
    });

    return waitingList;
  } catch (error) {
    console.error("@getAmazingWaitingList:", error);
    throw new Error("어메이징 대기자 명단을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getAmazingHoldingList = async (): Promise<TAmazingMember[]> => {
  try {
    const mentorshipRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
    );

    const q = query(
      mentorshipRef,
      where("status", "==", TAmazingMentorshipStatus.PENDING),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const holdingList: TAmazingMember[] = querySnapshot.docs.map((doc) => {
      return doc.data() as TAmazingMember;
    });

    return holdingList;
  } catch (error) {
    console.error("@getAmazingWaitingList:", error);
    throw new Error("어메이징 대기자 명단을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getAmazingMentorshipByMenteeId = async (
  menteeId: string,
): Promise<TAmazingMember | null> => {
  try {
    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
      menteeId,
    );

    const docSnap = await getDoc(mentorshipRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as TAmazingMember;
  } catch (error) {
    console.error("@getAmazingMentorshipByMenteeId:", error);
    throw new Error("어메이징 멘토십 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

export const updateAmazingMenteeStatus = async (
  cohort: string,
  menteeId: string,
  status: TAmazingMentorshipStatus,
): Promise<{success: boolean; message: string}> => {
  try {
    const courseRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZING,
      cohort,
    );

    const mentorshipRef = doc(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.AMAZINGMENTORSHIPS,
      menteeId,
    );

    // 🔹 해당 기수가 존재하는지 확인
    const courseSnap = await getDoc(courseRef);
    if (!courseSnap.exists()) {
      return {
        success: false,
        message: `${cohort}기 과정을 찾을 수 없습니다.`,
      };
    }

    // 🔹 Firestore 트랜잭션 사용
    await runTransaction(db, async (transaction) => {
      const courseData = (await transaction.get(courseRef)).data();

      if (!courseData || !Array.isArray(courseData.members)) {
        return {
          success: false,
          message: `${cohort}기 과정에서 해당 멤버를 찾을 수 없습니다.`,
        };
      }

      // 🔹 members 배열에서 해당 멘티 제거
      const updatedMembers = courseData.members.filter(
        (member: {menteeId: string}) => member.menteeId !== menteeId,
      );

      // 🔹 courseRef의 members 업데이트
      transaction.update(courseRef, {members: updatedMembers});

      // 🔹 mentorshipRef의 상태 변경
      transaction.update(mentorshipRef, {status});
    });

    return {
      success: true,
      message: `멘티의 상태가 업데이트되었습니다.`,
    };
  } catch (error) {
    console.error("@updateAmazingCourseDate:", error);
    throw new Error("어메이징 과정 날짜 업데이트 중 오류가 발생했습니다.");
  }
};

// 탭4 - 만남후기
export const getAllMeetingReivews = async (): Promise<TAppointment[]> => {
  try {
    // Firestore 컬렉션 참조
    const meetingRef = collection(
      db,
      BARNABAS_COLLCTION.BARNABAS,
      BARNABAS_COLLCTION.DATA,
      BARNABAS_COLLCTION.MEETINGSCHEDULES,
    );

    const meetingQuery = query(
      meetingRef,
      where("review", "!=", ""),
      where("status", "==", "completed"),
      where("matchingStatus", "==", "progress"),
      orderBy("review"),
      orderBy("date", "desc"),
    );

    const querySnapshot = await getDocs(meetingQuery);

    if (querySnapshot.empty) {
      return [];
    }

    const meetings: TAppointment[] = querySnapshot.docs.map(
      (doc) => doc.data() as TAppointment,
    );

    return meetings;
  } catch (error) {
    console.error("@getAllMeetingReviews: ", error);
    throw new Error("만남 리뷰 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};
