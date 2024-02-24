import { db } from "../../client/firebaseConfig";
import { collection, collectionGroup, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { CELLMEETING_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";

type TAttendanceNumber = {
  date: string
  attendance: number
  absent: number
}

type TAttendancePercentage = {
  date: string
  attendanceRate: string
}

type TAttendanceLastFourWeekStatic = {
  date: string
  attendance: number
  absent: number
  total: number
  attendanceRate: string
}

export type TCellMeetingTermStatic = {
  absentAvg: number
  attendanceAvg: number
  attendanceRateAvg: number
  maxAttendance: number
  minAttendance: number
  maxAttendanceDate: string
  minAttendanceDate: string
  totalAvg: number
}

type TCellmeetingMonthlyStatic = {
  month: string
  attendanceAvg: number
  absentAvg: number
  totalAvg: number
  attendanceRate: number
}


export const getCellMeetingSeasonNumberStatics = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );
    
    const q = query(cellMeetingRef, orderBy('weekOfTerm'))

    const querySnapshot = await getDocs(q);

    const resultList: TAttendanceNumber[] = []

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          date: `${doc.data().dateString.split('-')[1]}-${doc.data().dateString.split('-')[2]}`,
          attendance: doc.data().attendance,
          absent: doc.data().absent,
        }
        resultList.push(temp)
      });
    };

    return resultList
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const getCellMeetingSeasonPercentageStatics = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );
    
    const q = query(cellMeetingRef, orderBy('weekOfTerm'))

    const querySnapshot = await getDocs(q);

    const resultList: TAttendancePercentage[] = []

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          date: `${doc.data().dateString.split('-')[1]}-${doc.data().dateString.split('-')[2]}`,
          attendanceRate: (doc.data().attendance / doc.data().total * 100).toFixed(2)
        }
        resultList.push(temp)
      });
    };

    return resultList
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const getCellMeetingSeasonOverviewStatics = async (term: string) => {
  try {
    const cellMeetingTermRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.TERM,
      term
    );

    const cellMeetingTermDoc = await getDoc(cellMeetingTermRef);

    if (cellMeetingTermDoc.exists()) {
      return cellMeetingTermDoc.data() as TCellMeetingTermStatic
    };
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}


export const getCellMeetingLastFourWeekStatics = async () => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
    );
    
    const q = query(cellMeetingRef, orderBy('weekOfTerm', 'desc'), limit(5))

    const querySnapshot = await getDocs(q);

    const resultList: TAttendanceLastFourWeekStatic[] = []

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          date: `${doc.data().dateString.split('-')[1]}-${doc.data().dateString.split('-')[2]}`,
          attendance: doc.data().attendance,
          absent: doc.data().absent,
          total: doc.data().total,
          attendanceRate: (doc.data().attendance / doc.data().total * 100).toFixed(2)
        }
        resultList.push(temp)
      });
    };

    return resultList
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const getCellMeetingMonthlyStatics = async ({ term }: { term: string }) => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.MONTHLY,
    );
    
    const q = query(cellMeetingRef, where('term', '==', term), orderBy('month'))

    const querySnapshot = await getDocs(q);

    const resultList: TCellmeetingMonthlyStatic[] = []

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let temp = {
          month: doc.data().month+'월',
          attendanceAvg: doc.data().attendanceAvg,
          absentAvg: doc.data().absentAvg,
          totalAvg: doc.data().totalAvg,
          attendanceRate: doc.data().attendanceRate,
        }
        resultList.push(temp)
      });
    };

    return resultList
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}