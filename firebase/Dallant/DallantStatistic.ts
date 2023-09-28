import { DALLANTS_COLLCTION } from './../../interface/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, runTransaction, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { DallantsSettingType, DallantSubmitType, DallantCellType, OverallStaticDataType, DallantCellDetailType, CellStaticDataType, UserDallantType, CreateSeasonSubmitDate, DallantHistoryType, UpdateUserHistroyType, DeleteUserHistroyType, DeleteCellMemberType, DallantCellStaticType } from "../../interface/Dallants";
import { toast } from "react-hot-toast";


export const getCellsStatistic = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        let resultTemp: DallantCellStaticType[] = []

        const cellsRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS);
        const cellQuerySnapshot = await getDocs(cellsRef);

        if (!cellQuerySnapshot.empty) {
          for (const cell of cellQuerySnapshot.docs) {

            const membersRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, cell.id, DALLANTS_COLLCTION.MEMBERS);
            const memberquerySnapshot = await getDocs(membersRef)

            if (!memberquerySnapshot.empty) {
              resultTemp.push({
                cellId: cell.data().cellId,
                cellName: cell.data().cellName,
                totalAmount: cell.data().totalAmount,
                participants: memberquerySnapshot.size 
              })
            } else {
              resultTemp.push({
                cellId: cell.data().cellId,
                cellName: cell.data().cellName,
                totalAmount: cell.data().totalAmount,
                participants: 0
              })
            }
          }

          return resultTemp 

        } else {
          return null 
        }
      }
    }
    
  } catch (error: any) {
    console.log("@getCellsStatistic Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null 
  }
}