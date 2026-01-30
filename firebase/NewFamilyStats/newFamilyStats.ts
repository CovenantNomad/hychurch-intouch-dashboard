import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import toast from "react-hot-toast";
import {db} from "../../client/firebaseConfig";
import {NEWMEMBER_COLLECTION} from "../../interface/firebase";
import {
  TNewFamilyBirthYearStats,
  TNewFamilyRatioStats,
  TNewFamilyRegionStats,
} from "../../interface/newFamily";

// 가장 최근 예배 통계
export const getNewFamilyRecentStats = async () => {
  try {
    // WEEKLY 컬렉션 참조 생성
    const weeklyRef = collection(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.WEEKLY,
    );

    // 2. 최근 2개의 데이터 가져오기
    const recentQuery = query(weeklyRef, orderBy("date", "desc"), limit(2));
    const recentSnapshot = await getDocs(recentQuery);

    let recentWeekData = null;
    let previousWeekData = null;
    if (!recentSnapshot.empty) {
      const recentDocs = recentSnapshot.docs.map((doc) => doc.data());
      recentWeekData = recentDocs[0]; // 가장 최근 데이터
      previousWeekData = recentDocs[1] || null; // 그 전주 데이터
    }

    const accumulationRef = collection(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.YEARLY,
    );

    const accumulationQuery = query(
      accumulationRef,
      orderBy("year", "desc"),
      limit(1),
    );

    const accumulationSnapshot = await getDocs(accumulationQuery);

    const totalValue =
      accumulationSnapshot.docs.length > 0
        ? (() => {
            const data = accumulationSnapshot.docs[0].data();
            return {
              total: data.total,
              female: data.female,
              male: data.male,
            };
          })()
        : null;

    // 리턴 데이터 구성
    return {
      recentDate: recentWeekData?.dateString || null,
      previousDate: previousWeekData?.dateString || null,
      recentCounMale: recentWeekData?.male || 0,
      previousCountMale: previousWeekData?.male || 0,
      recentFemale: recentWeekData?.female || 0,
      previousFemale: previousWeekData?.female || 0,
      recentGroup1: recentWeekData?.group1 || 0,
      previousGroup1: previousWeekData?.group1 || 0,
      recentGroup2: recentWeekData?.group2 || 0,
      previousGroup2: previousWeekData?.group2 || 0,
      recentGroup3: recentWeekData?.group3 || 0,
      previousGroup3: previousWeekData?.group3 || 0,
      recentGroup4: recentWeekData?.group4 || 0,
      previousGroup4: previousWeekData?.group4 || 0,
      recentGroup5: recentWeekData?.group5 || 0,
      previousGroup5: previousWeekData?.group5 || 0,
      recentGroup6: recentWeekData?.group6 || 0,
      previousGroup6: previousWeekData?.group6 || 0,
      recentGroup7: recentWeekData?.group7 || 0,
      previousGroup7: previousWeekData?.group7 || 0,
      recentGroup8: recentWeekData?.group5 || 0,
      previousGroup8: previousWeekData?.group8 || 0,
      recentTotal: recentWeekData?.total || 0,
      previousTotal: previousWeekData?.total || 0,
      accumulateRegistration: totalValue?.total || 0,
      accumulateMale: totalValue?.male || 0,
      accumulateFemale: totalValue?.female || 0,
    };
  } catch (error: any) {
    console.log("@getNewFamilyRecentStats Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

export const getNewFamilyCountStats = async () => {
  try {
    // TOTAL_ATTENDANCE 컬렉션 참조
    const weeklyRef = collection(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.WEEKLY,
    );

    // TOTAL_ATTENDANCE에서 최근 20개 데이터 가져오기
    const weeklyQuery = query(weeklyRef, orderBy("date", "desc"), limit(20));
    const weeklySnapshot = await getDocs(weeklyQuery);

    const weeklyData = weeklySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        date: data.dateString,
        count: data.total,
      };
    });

    const resultData = weeklyData.reverse().map((registration) => {
      return {
        date: registration.date,
        count: registration.count,
      };
    });

    // 결과 반환
    return resultData;
  } catch (error: any) {
    console.log("@getNewFamilyCountStats Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
    return null;
  }
};

// 성별/연령별 통계
export const getNewFamilyRatioStats =
  async (): Promise<TNewFamilyRatioStats | null> => {
    try {
      // 컬렉션 참조
      const yearlyRef = collection(
        db,
        NEWMEMBER_COLLECTION.NEWMEMBERS,
        NEWMEMBER_COLLECTION.MEMBER,
        NEWMEMBER_COLLECTION.YEARLY,
      );

      // 가장 최근 데이터 가져오기
      const yearlyQuery = query(yearlyRef, orderBy("year", "desc"), limit(1));
      const yearlySnapshot = await getDocs(yearlyQuery);

      // 데이터가 존재하는 경우 변환
      if (!yearlySnapshot.empty) {
        const doc = yearlySnapshot.docs[0];
        const data = doc.data();
        return {
          date: data.year, // 확인 필요: 'year'가 문자열로 저장된 필드인지
          male: Number(data.male || 0),
          female: Number(data.female || 0),
          group1: Number(data.group1 || 0),
          group2: Number(data.group2 || 0),
          group3: Number(data.group3 || 0),
          group4: Number(data.group4 || 0),
          group5: Number(data.group5 || 0),
          group6: Number(data.group6 || 0),
          group7: Number(data.group7 || 0),
          group8: Number(data.group8 || 0),
          total: Number(data.total || 0),
        };
      }

      // 데이터가 없는 경우 null 반환
      return null;
    } catch (error: any) {
      console.log("@getNewFamilyRatioStats Error: ", error);
      toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
      return null;
    }
  };

export const getNewFamilyBirthYearStats =
  async (): Promise<TNewFamilyBirthYearStats | null> => {
    try {
      // 컬렉션 참조
      const yearlyRef = collection(
        db,
        NEWMEMBER_COLLECTION.NEWMEMBERS,
        NEWMEMBER_COLLECTION.BIRTHYEAR,
        NEWMEMBER_COLLECTION.YEARLY,
      );

      // 가장 최근 데이터 가져오기
      const yearlyQuery = query(yearlyRef, orderBy("year", "desc"), limit(1));
      const yearlySnapshot = await getDocs(yearlyQuery);

      // 데이터가 존재하는 경우 변환
      if (!yearlySnapshot.empty) {
        const doc = yearlySnapshot.docs[0];
        const data = doc.data();
        const formattedData: TNewFamilyBirthYearStats = {
          ...data,
          date: data.date || "",
          month: data.month || "",
          year: data.year || "",
        };

        return formattedData;
      }

      // 데이터가 없는 경우 null 반환
      return null;
    } catch (error: any) {
      console.log("@getNewFamilyRatioStats Error: ", error);
      toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
      return null;
    }
  };

//지역통계
export const getNewFamilyRegionStats =
  async (): Promise<TNewFamilyRegionStats | null> => {
    try {
      // 컬렉션 참조
      const yearlyRef = collection(
        db,
        NEWMEMBER_COLLECTION.NEWMEMBERS,
        NEWMEMBER_COLLECTION.REGION,
        NEWMEMBER_COLLECTION.YEARLY,
      );

      // 가장 최근 데이터 가져오기
      const yearlyQuery = query(yearlyRef, orderBy("year", "desc"), limit(1));
      const yearlySnapshot = await getDocs(yearlyQuery);

      // 데이터가 존재하는 경우 변환
      if (!yearlySnapshot.empty) {
        const doc = yearlySnapshot.docs[0];
        const data = doc.data();

        // 서울 합계 계산
        const seoulSum = Object.values(data.seoul || {}).reduce<number>(
          (sum, count) => sum + Number(count), // `count`를 숫자로 변환
          0, // 초기값
        );

        const gyeonggiSum = Object.values(data.gyeonggi || {}).reduce<number>(
          (sum, count) => sum + Number(count), // `count`를 숫자로 변환
          0, // 초기값
        );

        // 반환 데이터 구조
        return {
          date: data.year || "", // 확인 필요: 'year' 필드가 문자열로 저장되었는지
          seoulSum,
          gyeonggiSum,
          local: Number(data.local || 0),
          seoulDetails: data.seoul || {},
          gyeonggiDetails: data.gyeonggi || {},
        };
      }

      // 데이터가 없는 경우 null 반환
      return null;
    } catch (error: any) {
      console.log("@getNewFamilyRegionStats Error: ", error);
      toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`);
      return null;
    }
  };
