import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../client/firebaseConfig";
import { BarnabasType, COLLCTION } from "./../interface/firebase";

export const createBarnabas = async (submitData: BarnabasType) => {
  try {
    const docRef = await addDoc(collection(db, COLLCTION.BARNABAS), submitData);
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const getBarnabas = async () => {
  try {
    const barnabasRef = collection(db, COLLCTION.BARNABAS);
    const querySnapshot = await getDocs(barnabasRef);
    let temp: any[] = [];
    querySnapshot.forEach(async (doc) => {
      let menteeList: any[] = [];
      const query = await getDocs(
        collection(db, COLLCTION.BARNABAS, doc.id, COLLCTION.MENTEES)
      );
      query.forEach((data) => {
        menteeList.push(data.data());
      });
      temp.push({
        ...doc.data(),
        menteeList: menteeList,
      });
    });
    return temp;
  } catch (error) {
    console.log(error);
  }
};
