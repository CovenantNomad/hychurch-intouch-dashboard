import { collectionGroup, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { CELLMEETING_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";
import { TCellMeetingSubmissionDataForCell } from "../../interface/cellMeeting";

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