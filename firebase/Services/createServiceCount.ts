import {doc, setDoc} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {SERVICE_COLLCTION} from "../../interface/firebase";

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

    await setDoc(serviceRef, {
      count,
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
};
