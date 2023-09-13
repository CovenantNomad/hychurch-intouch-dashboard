import { toast } from "react-hot-toast";
import { db } from "../../client/firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import { DALLANTS_COLLCTION } from '../../interface/firebase';
import { DallantOthersListType, DallantOthersSubmitType, DallantRegisterOthersType } from "../../interface/Dallants";

export const createRegisterOthers = async (submitData: DallantRegisterOthersType) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const individualRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.OTHERS, submitData.userId);
        await setDoc(individualRef, submitData);

        toast.success(`입력이 완료되었습니다`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createTransaction Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const getOthersList = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        let resultList: DallantRegisterOthersType[] = []

        const othersRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.OTHERS);
        const querySanpshot = await getDocs(othersRef);

        if (!querySanpshot.empty) {
          querySanpshot.forEach(doc => {
            resultList.push(doc.data() as DallantRegisterOthersType)
          })
          
          return resultList

        } else {
          return null
        }
      }
    }
    
  } catch (error: any) {
    console.log("@getOthersList Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const createOthersTransaction = async (submitData: (DallantOthersSubmitType | undefined)[]) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        submitData.map(async (data) => {
          if (data !== undefined) {
            await runTransaction(db, async (transaction) => {
              const individualRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, data.userId);
              const individualDoc = await transaction.get(individualRef);
              if (individualDoc.exists()) {
                // 업데이트 후 내역저장
                const updatedAmount = individualDoc.data().totalAmount + data.amount
                transaction.update(individualRef, { totalAmount: updatedAmount })
                await addDoc(collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, data.userId, DALLANTS_COLLCTION.HISTORY), {
                  createdAt: data.createdAt,
                  description: data.description,
                  amount: data.amount
                });
              } else {
                // 신규 생성
                transaction.set(individualRef, {
                  cellId: data.cellId,
                  cellName: data.cellName,
                  userId: data.userId,
                  userName: data.userName,
                  totalAmount: data.amount
                })
                // 내역 추가하기
                await addDoc(collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, data.userId, DALLANTS_COLLCTION.HISTORY), {
                  createdAt: data.createdAt,
                  description: data.description,
                  amount: data.amount
                });
              }
            })
          }
        })
        toast.success(`입력이 완료되었습니다`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createOthersTransaction Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const getOthersDallents = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const othersRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.OTHERS);
        const querySanpshot = await getDocs(othersRef);

        if (!querySanpshot.empty) {
          let othersMemberIdList: string[] = []

          querySanpshot.forEach(doc => {
            othersMemberIdList.push(doc.data().userId)
          })

          let othersDallantList: DallantOthersListType[] = []

          othersMemberIdList.map(async (userId) => {
            const individualRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, userId);
            const individualDoc = await getDoc(individualRef);

            if (individualDoc.exists()) {
              othersDallantList.push(individualDoc.data() as DallantOthersListType)
            }
          })

          return othersDallantList

        } else {
          return null
        }
      }
    }
    
  } catch (error: any) {
    console.log("@getOthersDallents Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}