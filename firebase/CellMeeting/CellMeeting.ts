import { collection, collectionGroup, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { CELLMEETING_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";
import { TCellMeetingSubmissionDataForCell } from "../../interface/cellMeeting";
import { DateRangePickerValue } from "@tremor/react";
// import { TDateRangePickerStringValue } from "../../components/Templates/Attendance/CellMeetingStatistic";

export const getCellMeetingByCellId = async (cellId: string, baseDateString: string) => {
  try {
    const cellMeetingRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.DATA,
      CELLMEETING_COLLCTION.CELLLIST,
      cellId,
      CELLMEETING_COLLCTION.CELLHISTORY,
      baseDateString
    );

    const cellMeetingDoc = await getDoc(cellMeetingRef);

    if (cellMeetingDoc.exists()) {
      return cellMeetingDoc.data() as TCellMeetingSubmissionDataForCell
    };

    return null;
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const getThisWeekCellMeetingStatics = async (baseDateString: string) => {
  try {
    let totalNumber = 0
    let attendanceNumber = 0
    let absentNumber = 0

    const thiwWeekQuery = query(collectionGroup(db, CELLMEETING_COLLCTION.CELLHISTORY), where('baseDateString', '==', baseDateString));
    const querySnapshot = await getDocs(thiwWeekQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        attendanceNumber += doc.data().attendanceList.length
        absentNumber += doc.data().absentList.length
      });

      totalNumber = attendanceNumber + absentNumber
    };

    return {
      totalNumber,
      attendanceNumber,
      absentNumber
    };
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}


// 통계
// export const getCellMeetingStatsByPeriod = async ({ cellId, dateRagnge }: {cellId: string, dateRagnge: DateRangePickerValue}) => {
//   let allAttendanceList: { userId: string; userName: string; }[] = []

//   let accumulatedAttendance = 0
//   let accumulatedTotalNumber = 0

//   const weeklyAttendanceCount: {
//     [baseDateString: string]: {
//       attendanceNumber: number;
//       totalNumber: number;
//     }
//   } = {};
  
//   const cellRef = collection(
//     db,
//     CELLMEETING_COLLCTION.CELLMEETINGS,
//     CELLMEETING_COLLCTION.DATA,
//     CELLMEETING_COLLCTION.CELLLIST,
//     cellId,
//     CELLMEETING_COLLCTION.CELLHISTORY
//   );

//   const q = query(cellRef, where('baseDate', '>=', dateRagnge.from), where('baseDate', '<=', dateRagnge.to));

//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.empty) {
//     console.log('쿼리 결과 없음')

//     return 

//   } else {
//     console.log('쿼리 있음')
//     const n = querySnapshot.docs.length
//     console.log('데이터 수: ', n)
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data())
//       console.log(doc.data().attendanceList)
//       allAttendanceList.push(doc.data().attendanceList)
//       accumulatedAttendance += doc.data().attendanceList.length
//       accumulatedTotalNumber += doc.data().totalMemberList.length
//       if (!weeklyAttendanceCount[doc.data().baseDateString]) {
//         weeklyAttendanceCount[doc.data().baseDateString] = { attendanceNumber: doc.data().attendanceList.length, totalNumber: doc.data().totalList.length}
//       }
//     });

//     console.log('왜 여기로 안오지?')
//     const groupedAttendances = groupByAttendanceCount(allAttendanceList);

//     console.log("그룹핑: ", groupedAttendances)

//     const averageAttendance = accumulatedAttendance/n
//     const averageTotal = accumulatedTotalNumber/n

//     const attendanceRate = accumulatedAttendance/accumulatedTotalNumber * 100

//     return {
//       attendanceRate,
//       accumulatedAttendance,
//       accumulatedTotalNumber,
//       averageAttendance,
//       averageTotal,
//       weeklyAttendanceCount,
//       groupedAttendances,
//     }
//   }
// }





const countAttendances = (attendances: Attendance[]) => {
  const attendanceCount: AttendanceCount = {};

  attendances.forEach((attendance) => {
    if (!attendanceCount[attendance.userId]) {
      attendanceCount[attendance.userId] = { count: 0, userName: attendance.userName };
    }
    attendanceCount[attendance.userId].count += 1;
  });

  return attendanceCount;
};

const groupByAttendanceCount = (attendances: Attendance[]): GroupedAttendances => {
  const grouped: GroupedAttendances = {};
  const attendanceCount = countAttendances(attendances);

  Object.entries(attendanceCount).forEach(([userId, { count, userName }]) => {
    if (!grouped[count]) {
      grouped[count] = [];
    }
    grouped[count].push({ userId, userName });
  });

  return grouped;
};

type Attendance = {
  userId: string;
  userName: string;
};

type AttendanceCount = {
  [userId: string]: {
    count: number;
    userName: string;
  };
};

type GroupedAttendances = {
  [count: number]: Attendance[];
};
