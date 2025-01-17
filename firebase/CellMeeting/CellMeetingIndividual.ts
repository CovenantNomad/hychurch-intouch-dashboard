import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import toast from "react-hot-toast";
import {db} from "../../client/firebaseConfig";
import {TIndividaulCellmeetingData} from "../../interface/cellMeeting";
import {CELLMEETING_COLLCTION} from "../../interface/firebase";

export const getCellMeetingIndividualHistory = async (userId: string) => {
  try {
    const cellMeetingRef = collection(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.DATA,
      CELLMEETING_COLLCTION.MEMBERLIST,
      userId,
      CELLMEETING_COLLCTION.HISTORY
    );

    const q = query(cellMeetingRef, orderBy("baseDate", "desc"), limit(52));

    const querySnapshot = await getDocs(q);

    const resultList: TIndividaulCellmeetingData[] = [];

    if (!querySnapshot.empty) {
      resultList.push(
        ...querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            baseDate: data.baseDate,
            baseDateString: data.baseDateString,
            hasAttended: data.hasAttended,
          };
        })
      );
    }

    return resultList;
  } catch (error: any) {
    console.log("@getCellMeetingIndividualHistory Error: ", error);
    const errorMessage = error.message
      ? error.message.split(":")[0]
      : "알 수 없는 에러";
    toast.error(`에러가 발생하였습니다\n${errorMessage}`);
    return null;
  }
};
