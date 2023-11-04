import { Timestamp, collectionGroup, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { CELLMEETING_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";

export const getCellMeeting = async (cellId: string, baseDate: string) => {
  try {
    const cellMeeting = query(collectionGroup(db, CELLMEETING_COLLCTION.CELLMEETING, ), where('cellId', '==', cellId), where('attendedAt', '==', baseDate));
    const querySnapshot = await getDocs(cellMeeting);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
    
    }

    return null;
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}