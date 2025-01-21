import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import toast from "react-hot-toast";
import {db} from "../../client/firebaseConfig";
import {TServiceAttendanceWeekly} from "../../interface/attendance";
import {SERVICE_COLLCTION} from "../../interface/firebase";

// 가장 최근 예배 통계
export const getServiceRecentStatics = async () => {
  try {
    // WEEKLY 컬렉션 참조 생성
    const serviceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.SERVICEATTENDANCE
    );

    // 2. 최근 2개의 데이터 가져오기
    const recentQuery = query(serviceRef, orderBy("date", "desc"), limit(2));
    const recentSnapshot = await getDocs(recentQuery);

    let recentWeekData = null;
    let previousWeekData = null;
    if (!recentSnapshot.empty) {
      const recentDocs = recentSnapshot.docs.map((doc) => doc.data());
      recentWeekData = recentDocs[0]; // 가장 최근 데이터
      previousWeekData = recentDocs[1] || null; // 그 전주 데이터
    }

    const countRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.TOTALATTENDANCE
    );

    const recentCountQuery = query(countRef, orderBy("date", "desc"), limit(2));
    const recentCountSnapshot = await getDocs(recentCountQuery);

    let recentWeekCountData = null;
    let previousWeekCountData = null;
    if (!recentCountSnapshot.empty) {
      const recentDocs = recentCountSnapshot.docs.map((doc) => doc.data());
      recentWeekCountData = recentDocs[0]; // 가장 최근 데이터
      previousWeekCountData = recentDocs[1] || null; // 그 전주 데이터
    }

    // 리턴 데이터 구성
    return {
      recentDate: recentWeekData?.dateString || null,
      previousDate: previousWeekData?.dateString || null,
      recentCountTotal: recentWeekCountData?.count || 0,
      previousCountTotal: previousWeekCountData?.count || 0,
      recentCell: recentWeekData?.fifthOff || 0,
      previousCell: previousWeekData?.fifthOff || 0,
      recentNonCell: recentWeekData?.nonCellMember || 0,
      previousNonCell: previousWeekData?.nonCellMember || 0,
      recentOffline: recentWeekData?.fifthOff || 0,
      recentOnline: recentWeekData?.fifthOnline || 0,
      previousOffline: previousWeekData?.fifthOff || 0,
      previousOnline: previousWeekData?.fifthOnline || 0,
      recentTotal: recentWeekData?.total || 0,
      previousTotal: previousWeekData?.total || 0,
    };
  } catch (error: any) {
    console.log("@getCellMeetingStatistics Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

export const getServiceTotalCountStatics = async () => {
  try {
    // TOTAL_ATTENDANCE 컬렉션 참조
    const serviceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.TOTALATTENDANCE
    );

    // MA4WEEK 컬렉션 참조
    const maRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.STATISTICS,
      SERVICE_COLLCTION.MA4WEEK
    );

    // TOTAL_ATTENDANCE에서 최근 20개 데이터 가져오기
    const totalAttendanceQuery = query(
      serviceRef,
      orderBy("date", "desc"),
      limit(20)
    );
    const totalAttendanceSnapshot = await getDocs(totalAttendanceQuery);

    const totalAttendanceData = totalAttendanceSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        date: data.date,
        count: data.count,
      };
    });

    // MA4WEEK에서 최근 20개 데이터 가져오기
    const ma4WeekQuery = query(maRef, orderBy("date", "desc"), limit(20));
    const ma4WeekSnapshot = await getDocs(ma4WeekQuery);

    const ma4WeekData = ma4WeekSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      acc[data.date] = Math.ceil(data.average);
      return acc;
    }, {} as Record<string, number>);

    // TOTAL_ATTENDANCE와 MA4WEEK 데이터를 합치기
    const mergedData = totalAttendanceData.reverse().map((attendance) => {
      return {
        date: attendance.date,
        count: attendance.count,
        average: ma4WeekData[attendance.date] || null, // MA4WEEK 데이터가 없으면 null
      };
    });

    // 결과 반환
    return mergedData;
  } catch (error: any) {
    console.log("@getServiceTotalCountStatics Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

// 인터치예배 셀편성/미편성 인원 비율
export const getServiceRatioStatics = async (): Promise<
  {date: string; fifthOff?: number; nonCellMember?: number}[] | null
> => {
  try {
    // SERVICE_ATTENDANCE 컬렉션 참조
    const serviceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.SERVICEATTENDANCE
    );

    // TOTAL_ATTENDANCE에서 최근 20개 데이터 가져오기
    const serviceAttendanceQuery = query(
      serviceRef,
      orderBy("date", "desc"),
      limit(20)
    );
    const serviceAttendanceSnapshot = await getDocs(serviceAttendanceQuery);

    const serviceAttendanceData = serviceAttendanceSnapshot.docs
      .reverse()
      .map((doc) => {
        const data = doc.data();
        return {
          date: doc.data().dateString,
          fifthOff: data.fifthOff,
          nonCellMember: data.nonCellMember,
        };
      });

    // 결과 반환
    return serviceAttendanceData;
  } catch (error: any) {
    console.log("@getServiceRatioStatics Error: ", error);

    const errorMessage = error.message || "알 수 없는 에러가 발생했습니다.";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};

// 인터치예배 온라인/오프라인 인원 비율
export const getServiceOnOffRatioStatics = async (): Promise<
  {date: string; online?: number; offline?: number; total?: number}[] | null
> => {
  try {
    // SERVICE_ATTENDANCE 컬렉션 참조
    const serviceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.SERVICEATTENDANCE
    );

    // TOTAL_ATTENDANCE에서 최근 20개 데이터 가져오기
    const serviceAttendanceQuery = query(
      serviceRef,
      orderBy("date", "desc"),
      limit(20)
    );
    const serviceAttendanceSnapshot = await getDocs(serviceAttendanceQuery);

    const serviceAttendanceData = serviceAttendanceSnapshot.docs
      .reverse()
      .map((doc) => {
        const data = doc.data();
        return {
          date: doc.data().dateString,
          offline: data.fifthOff,
          online: data.fifthOnline,
          total: data.fifthTotal,
        };
      });

    // 결과 반환
    return serviceAttendanceData;
  } catch (error: any) {
    console.log("@getServiceRatioStatics Error: ", error);

    const errorMessage = error.message || "알 수 없는 에러가 발생했습니다.";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};

// 인터치예배 온라인/오프라인 인원 비율
export const getServiceAttendnaceWeekly = async (): Promise<
  TServiceAttendanceWeekly[] | null
> => {
  try {
    // SERVICE_ATTENDANCE 컬렉션 참조
    const serviceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.SERVICEATTENDANCE
    );

    // TOTAL_ATTENDANCE에서 최근 20개 데이터 가져오기
    const serviceAttendanceQuery = query(
      serviceRef,
      orderBy("date", "desc"),
      limit(20)
    );
    const serviceAttendanceSnapshot = await getDocs(serviceAttendanceQuery);

    const serviceAttendanceData = serviceAttendanceSnapshot.docs
      .reverse()
      .map((doc) => {
        const data = doc.data();
        const formattedData: TServiceAttendanceWeekly = {
          firstOff: data.firstOff,
          firstOnline: data.firstOnline,
          firstTotal: data.firstTotal,
          secondOff: data.secondOff,
          secondOnline: data.secondOnline,
          secondTotal: data.secondTotal,
          thirdOff: data.thirdOff,
          thirdOnline: data.thirdOnline,
          thirdTotal: data.thirdTotal,
          fourthOff: data.fourthOff,
          fourthOnline: data.fourthOnline,
          fourthTotal: data.fourthTotal,
          fifthOff: data.fifthOff,
          fifthOnline: data.fifthOnline,
          fifthTotal: data.fifthTotal,
          totalOff: data.totalOff,
          totalOnline: data.totalOnline,
          nonCellMember: data.nonCellMember,
          total: data.total,
          date: data.date,
          dateString: data.dateString,
          month: data.month,
          year: data.year,
          term: data.term,
          termYear: data.termYear,
          weekOfMonth: data.weekOfMonth,
          weekOfYear: data.weekOfYear,
          weekOfTerm: data.weekOfTerm,
        };
        return formattedData;
      });

    // 결과 반환
    return serviceAttendanceData;
  } catch (error: any) {
    console.log("@getServiceRatioStatics Error: ", error);

    const errorMessage = error.message || "알 수 없는 에러가 발생했습니다.";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};
