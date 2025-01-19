import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {SERVICE_COLLCTION} from "../../interface/firebase";

// export const createTotalServiceAttendance = async ({
//   attendanceDate,
//   count,
// }: {
//   attendanceDate: string;
//   count: number;
// }) => {
//   try {
//     const serviceRef = doc(
//       db,
//       SERVICE_COLLCTION.SERVICES,
//       SERVICE_COLLCTION.DATA,
//       SERVICE_COLLCTION.TOTALATTENDANCE,
//       attendanceDate
//     );

//     await setDoc(serviceRef, {
//       count,
//     });
//   } catch (error: any) {
//     console.log("@createTotalServiceAttendance Error: ", error);
//   }
// };

export const createTotalServiceAttendance = async ({
  attendanceDate,
  count,
}: {
  attendanceDate: string;
  count: number;
}) => {
  try {
    const serviceRef = doc(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.TOTALATTENDANCE,
      attendanceDate
    );

    // Step 1: 현재 데이터 저장
    await setDoc(serviceRef, {
      count,
      date: attendanceDate,
    });

    // Step 2: TOTALATTENDANCE 컬렉션에서 최근 3개의 데이터를 가져오기
    const attendanceRef = collection(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.TOTALATTENDANCE
    );

    const recentQuery = query(attendanceRef, orderBy("date", "desc"), limit(3));
    const recentSnapshot = await getDocs(recentQuery);

    const recentCounts: number[] = [];
    recentSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.count) {
        recentCounts.push(data.count);
      }
    });

    // 평균값 계산
    const average =
      recentCounts.reduce((sum, value) => sum + value, 0) / recentCounts.length;

    // Step 3: MA4WEEK 컬렉션에 평균값 저장
    const maRef = doc(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.STATISTICS,
      SERVICE_COLLCTION.MA4WEEK,
      attendanceDate
    );

    await setDoc(maRef, {
      average: average.toFixed(2),
      date: attendanceDate,
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
};
