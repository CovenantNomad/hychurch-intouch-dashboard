import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import {db} from "../../client/firebaseConfig";
import {CELLMEETING_COLLCTION} from "../../interface/firebase";

export type TTermSpecificInfoMationResults = {
  term: string;
  termYear: string;
  startDate: string;
  endDate: string;
  lengthOfWeek: string;
};

export type TTermStaticResults = {
  date: string;
  attendance: number;
  absent: number;
};

export type TAttendanceRateResults = {
  date: string;
  attendanceRate: string;
};

type TAttendanceLastFourWeekStatic = {
  date: string;
  attendance: number;
  absent: number;
  total: number;
  attendanceRate: string;
};

export type TCellMeetingWeeklyStatic = {
  dateString: string;
  attendance: number;
  absent: number;
  total: number;
  attendanceRate: string;
  term: string;
  weekOfTerm: number;
};

export type TCellMeetingTermStatic = {
  term: string;
  absentAvg: number;
  attendanceAvg: number;
  attendanceRateAvg: number;
  totalAvg: number;
  maxAttendance: string;
  maxAttendanceDate: string;
  minAttendance: string;
  minAttendanceDate: string;
  highRate: string;
  highRateDate: string;
  lowRate: string;
  lowRateDate: string;
};

export type TCellmeetingYearlyStatic = {
  absentAvg: number;
  attendanceAvg: number;
  attendanceRateAvg: number;
  maxAttendance: string;
  maxAttendanceDate: string;
  minAttendance: string;
  minAttendanceDate: string;
  highRate: string;
  highRateDate: string;
  lowRate: string;
  lowRateDate: string;
  totalAvg: number;
  termYear: string;
};

export type TCellmeetingMonthlyStatic = {
  year: string;
  month: string;
  dateString: string;
  attendanceAvg: number;
  absentAvg: number;
  totalAvg: number;
  attendanceRate: number;
};

const createDefaultTermStatic = (): TCellMeetingTermStatic => ({
  term: "",
  absentAvg: 0,
  attendanceAvg: 0,
  attendanceRateAvg: 0,
  maxAttendance: "0",
  minAttendance: "0",
  maxAttendanceDate: "",
  minAttendanceDate: "",
  highRate: "",
  highRateDate: "",
  lowRate: "",
  lowRateDate: "",
  totalAvg: 0,
});

export const getTermInfomation = async () => {
  try {
    let term = "";
    let termYear = "";

    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO,
    );

    const termInfoDocSnap = await getDoc(termInfoRef);

    if (termInfoDocSnap.exists()) {
      term = termInfoDocSnap.data().currentTerm;
      termYear = termInfoDocSnap.data().currentTermYear;

      return {
        term,
        termYear,
      };
    } else {
      console.log("Term info document does not exist.");
      return {term: "", termYear: ""}; // 기본값 반환
    }
  } catch (error: any) {
    console.log("@getTermInfomation Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

export const getTermSpecificInfomation = async () => {
  try {
    const termInfoRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO,
      CELLMEETING_COLLCTION.TERM,
    );

    const querySnapshot = await getDocs(termInfoRef);

    const termSpecificInfomationResuls: TTermSpecificInfoMationResults[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const infoTemp: TTermSpecificInfoMationResults = {
          term: doc.data().term || "",
          termYear: doc.data().termYear || "",
          startDate: doc.data().startDate || null,
          endDate: doc.data().endDate || null,
          lengthOfWeek: doc.data().lengthOfWeek || 0,
        };

        termSpecificInfomationResuls.push(infoTemp);
      });
    }

    return termSpecificInfomationResuls;
  } catch (error: any) {
    console.error("@getTermSpecificInfomation Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    throw new Error("Failed to fetch term-specific information.");
  }
};

export const getCellMeetingTermStatics = async () => {
  try {
    let term = "";
    let termYear = "";

    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO,
    );

    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );

    const termInfoDocSnap = await getDoc(termInfoRef);

    if (termInfoDocSnap.exists()) {
      term = termInfoDocSnap.data().currentTerm;
      termYear = termInfoDocSnap.data().currentTermYear;

      const q = query(
        cellMeetingRef,
        where("term", "==", term),
        orderBy("weekOfTerm"),
      );

      const querySnapshot = await getDocs(q);

      const termStatticResuls: TTermStaticResults[] = [];
      const attendanceRateResults: TAttendanceRateResults[] = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          let staticTemp = {
            date: `${doc.data().dateString.split("-")[1]}-${
              doc.data().dateString.split("-")[2]
            }`,
            attendance: doc.data().attendance,
            absent: doc.data().absent,
            attendanceRate: (
              (doc.data().attendance / doc.data().total) *
              100
            ).toFixed(2),
          };
          let rateTemp = {
            date: `${doc.data().dateString.split("-")[1]}-${
              doc.data().dateString.split("-")[2]
            }`,
            attendanceRate: (
              (doc.data().attendance / doc.data().total) *
              100
            ).toFixed(2),
          };
          termStatticResuls.push(staticTemp);
          attendanceRateResults.push(rateTemp);
        });
      }

      return {
        term,
        termYear,
        termStatticResuls,
        attendanceRateResults,
      };
    } else {
      console.log("Unable to verify information related to the term.");
      return null;
    }
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

// 한해, 상/하반기 통계 데이터
export const getCellMeetingTermOverviewStatics = async () => {
  try {
    let termYear = "";
    let termYearStatic: TCellMeetingTermStatic = createDefaultTermStatic();
    let firstTermStatic: TCellMeetingTermStatic = createDefaultTermStatic();
    let secondTermStatic: TCellMeetingTermStatic = createDefaultTermStatic();

    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO,
    );

    const termInfoDocSnap = await getDoc(termInfoRef);

    if (termInfoDocSnap.exists()) {
      termYear = termInfoDocSnap.data().currentTermYear;

      const firstTerm = termYear + "FIRST";
      const secondTerm = termYear + "SECOND";

      const cellMeetingYearRef = doc(
        db,
        CELLMEETING_COLLCTION.CELLMEETINGS,
        CELLMEETING_COLLCTION.STATISTICS,
        CELLMEETING_COLLCTION.YEAR,
        termYear,
      );

      const cellMeetingFirstTermRef = doc(
        db,
        CELLMEETING_COLLCTION.CELLMEETINGS,
        CELLMEETING_COLLCTION.STATISTICS,
        CELLMEETING_COLLCTION.TERM,
        firstTerm,
      );

      const cellMeetingSecondTermRef = doc(
        db,
        CELLMEETING_COLLCTION.CELLMEETINGS,
        CELLMEETING_COLLCTION.STATISTICS,
        CELLMEETING_COLLCTION.TERM,
        secondTerm,
      );

      const cellMeetingYearDoc = await getDoc(cellMeetingYearRef);

      if (cellMeetingYearDoc.exists()) {
        termYearStatic = cellMeetingYearDoc.data() as TCellMeetingTermStatic;
      }

      const cellMeetingFirstTermDoc = await getDoc(cellMeetingFirstTermRef);

      if (cellMeetingFirstTermDoc.exists()) {
        firstTermStatic =
          cellMeetingFirstTermDoc.data() as TCellMeetingTermStatic;
      }

      const cellMeetingSecondTermDoc = await getDoc(cellMeetingSecondTermRef);

      if (cellMeetingSecondTermDoc.exists()) {
        secondTermStatic =
          cellMeetingSecondTermDoc.data() as TCellMeetingTermStatic;
      }

      return {
        termYear,
        termYearStatic,
        firstTermStatic,
        secondTermStatic,
      };
    } else {
      console.log("Unable to verify information related to the term.");
      return null;
    }
  } catch (error: any) {
    console.log("@getCellMeetingYearStatic Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

// 가장 최근 셀모임 통계 getCellMeetingLastWeekStatics
export const getCellMeetingRecentStatics = async () => {
  try {
    let term = "";
    let termYear = "";

    // `INFO` 문서의 참조 생성
    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO,
    );

    // `WEEKLY` 컬렉션 참조 생성
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );

    // `INFO` 문서 데이터 가져오기
    const termInfoDocSnap = await getDoc(termInfoRef);

    if (termInfoDocSnap.exists()) {
      term = termInfoDocSnap.data().currentTerm; // 현재 `term` 값 가져오기
      termYear = termInfoDocSnap.data().currentTermYear;

      // 1. 첫 주 데이터 가져오기
      const firstWeekQuery = query(
        cellMeetingRef,
        where("term", "==", term),
        where("weekOfTerm", "==", 1),
      );
      const firstWeekSnapshot = await getDocs(firstWeekQuery);

      let firstWeekData = null;
      if (!firstWeekSnapshot.empty) {
        firstWeekData = firstWeekSnapshot.docs[0].data();
      }

      // 2. 최근 2개의 데이터 가져오기
      const recentQuery = query(
        cellMeetingRef,
        orderBy("date", "desc"),
        limit(2),
      );
      const recentSnapshot = await getDocs(recentQuery);

      let recentWeekData = null;
      let previousWeekData = null;
      if (!recentSnapshot.empty) {
        const recentDocs = recentSnapshot.docs.map((doc) => doc.data());
        recentWeekData = recentDocs[0]; // 가장 최근 데이터
        previousWeekData = recentDocs[1] || null; // 그 전주 데이터
      }

      // 리턴 데이터 구성
      return {
        recentDate: recentWeekData?.dateString || null,
        previousDate: previousWeekData?.dateString || null,
        firstWeekDate: firstWeekData?.dateString || null,
        recentTotal: recentWeekData?.total || 0,
        previousTotal: previousWeekData?.total || 0,
        firstWeekTotal: firstWeekData?.total || 0,
        recentAttendance: recentWeekData?.attendance || 0,
        recentAbsent: recentWeekData?.absent || 0,
        recentAttendanceRate: recentWeekData
          ? ((recentWeekData.attendance / recentWeekData.total) * 100).toFixed(
              2,
            )
          : null,
        previousAttendanceRate: previousWeekData
          ? (
              (previousWeekData.attendance / previousWeekData.total) *
              100
            ).toFixed(2)
          : null,
      };
    } else {
      console.log("Term information document does not exist.");
      return null;
    }
  } catch (error: any) {
    console.log("@getCellMeetingStatistics Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

// 최근 5주 셀모임 통계
export const getCellMeetingLastFourWeekStatics = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );

    const q = query(cellMeetingRef, orderBy("date", "desc"), limit(5));

    const querySnapshot = await getDocs(q);

    const resultList: TAttendanceLastFourWeekStatic[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          date: `${doc.data().dateString.split("-")[1]}-${
            doc.data().dateString.split("-")[2]
          }`,
          attendance: doc.data().attendance,
          absent: doc.data().absent,
          total: doc.data().total,
          attendanceRate: (
            (doc.data().attendance / doc.data().total) *
            100
          ).toFixed(2),
        };
        resultList.push(temp);
      });
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

//월간 셀모임 통계
export const getCellMeetingMonthlyStatics = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.MONTHLY,
    );

    const q = query(cellMeetingRef, orderBy("date", "desc"), limit(13));

    const querySnapshot = await getDocs(q);

    let resultList: TCellmeetingMonthlyStatic[] = [];

    if (!querySnapshot.empty) {
      resultList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          year: data.year,
          month: data.month,
          dateString: `${data.year}.${data.month.toString().padStart(2, "0")}`,
          attendanceAvg: data.attendanceAvg,
          absentAvg: data.absentAvg,
          totalAvg: data.totalAvg,
          attendanceRate: data.attendanceRate,
        };
      });

      resultList.reverse();
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

export const getCellMeetingStatsByPeriod = async ({
  cellId,
  from,
  to,
}: {
  cellId: string;
  from: Date;
  to: Date;
}) => {
  let accumulatedAttendanceNumber = 0;
  let accumulatedTotalNumber = 0;
  let accumulatedAbsentNumber = 0;

  const cellRef = collection(
    db,
    CELLMEETING_COLLCTION.CELLMEETINGS,
    CELLMEETING_COLLCTION.DATA,
    CELLMEETING_COLLCTION.CELLLIST,
    cellId,
    CELLMEETING_COLLCTION.CELLHISTORY,
  );

  const q = query(
    cellRef,
    where("baseDate", ">=", from),
    where("baseDate", "<=", to),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("데이터 없음");
    return;
  } else {
    const n = querySnapshot.docs.length;
    querySnapshot.forEach((doc) => {
      accumulatedAttendanceNumber += doc.data().attendanceList.length;
      accumulatedTotalNumber += doc.data().totalMemberList.length;
      accumulatedAbsentNumber += doc.data().absentList.length;
    });

    const averageAttendance = accumulatedAttendanceNumber / n;
    const averageAbsent = accumulatedAbsentNumber / n;
    const averageTotal = accumulatedTotalNumber / n;

    return {
      averageAttendance,
      averageAbsent,
      averageTotal,
    };
  }
};

//셀모임 연간데이터 모두
export const getCellMeetingHistoricalYearly = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.YEAR,
    );

    const q = query(cellMeetingRef, orderBy("termYear", "desc"), limit(12));

    const querySnapshot = await getDocs(q);

    const resultList: TCellmeetingYearlyStatic[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          absentAvg: doc.data().absentAvg,
          attendanceAvg: doc.data().attendanceAvg,
          attendanceRateAvg: doc.data().attendanceRateAvg,
          maxAttendance: doc.data().maxAttendance,
          minAttendance: doc.data().minAttendance,
          maxAttendanceDate: doc.data().maxAttendanceDate,
          minAttendanceDate: doc.data().minAttendanceDate,
          highRate: doc.data().highRate,
          highRateDate: doc.data().highRateDate,
          lowRate: doc.data().lowRate,
          lowRateDate: doc.data().lowRateDate,
          totalAvg: doc.data().totalAvg,
          termYear: doc.data().termYear,
        };
        resultList.push(temp);
      });
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

//셀모임 텀 데이터 (12개씩 / 페이지네이션 구현 X)
export const getCellMeetingHistoricalTerms = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.TERM,
    );

    const q = query(cellMeetingRef, limit(12));

    const querySnapshot = await getDocs(q);

    const resultList: TCellMeetingTermStatic[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          term: doc.id,
          absentAvg: doc.data().absentAvg,
          attendanceAvg: doc.data().attendanceAvg,
          attendanceRateAvg: doc.data().attendanceRateAvg,
          maxAttendance: doc.data().maxAttendance,
          minAttendance: doc.data().minAttendance,
          maxAttendanceDate: doc.data().maxAttendanceDate,
          minAttendanceDate: doc.data().minAttendanceDate,
          highRate: doc.data().highRate,
          highRateDate: doc.data().highRateDate,
          lowRate: doc.data().lowRate,
          lowRateDate: doc.data().lowRateDate,
          totalAvg: doc.data().totalAvg,
        };
        resultList.push(temp);
      });
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

export const getCellMeetingHistoricalMonthly = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.MONTHLY,
    );

    const q = query(cellMeetingRef, orderBy("date", "desc"), limit(13));

    const querySnapshot = await getDocs(q);

    const resultList: TCellmeetingMonthlyStatic[] = [];

    if (!querySnapshot.empty) {
      resultList.push(
        ...querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            absentAvg: data.absentAvg,
            attendanceAvg: data.attendanceAvg,
            totalAvg: data.totalAvg,
            attendanceRate: data.attendanceRate,
            year: data.year,
            month: data.month,
            // year와 month를 2자리 형식으로 보장
            dateString: `${data.year}-${String(data.month).padStart(2, "0")}`,
          };
        }),
      );
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeetingHistoricalMonthly Error: ", error);
    const errorMessage = error.message
      ? error.message.split(":")[0]
      : "알 수 없는 에러";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};

export const getCellMeetingHistoricalWeekly = async (lastDoc: any = null) => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );

    let q = query(cellMeetingRef, orderBy("date", "desc"), limit(12));

    // 이전 페이지의 마지막 문서 기준으로 시작
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);

    const resultList: TCellMeetingWeeklyStatic[] = [];

    // 마지막 문서 저장
    let lastVisible = null;

    if (!querySnapshot.empty) {
      resultList.push(
        ...querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            absent: data.absent,
            attendance: data.attendance,
            total: data.total,
            attendanceRate: ((data.attendance / data.total) * 100)
              .toFixed(2)
              .padStart(2, "0"),
            dateString: data.dateString,
            term: data.term,
            weekOfTerm: data.weekOfTerm,
          };
        }),
      );

      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

    return {data: resultList, lastVisible};
  } catch (error: any) {
    console.log("@getCellMeetingHistoricalWeekly Error: ", error);
    const errorMessage = error.message
      ? error.message.split(":")[0]
      : "알 수 없는 에러";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};

export const fetchCellMeetingHistoricalWeekly = async ({pageParam = null}) => {
  return await getCellMeetingHistoricalWeekly(pageParam);
};
