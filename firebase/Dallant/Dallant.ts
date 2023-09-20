import { DALLANTS_COLLCTION } from './../../interface/firebase';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { seasonNameForm, DallantsSettingType, DallantSubmitType, DallantMemberType, DallantCellType, OverallStaticDataType, DallantCellDetailType, CellStaticDataType, UserDallantType, DallantHistoryType } from "../../interface/Dallants";
import { toast } from "react-hot-toast";

export const getDallentSetting = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    return docSnap.data() as DallantsSettingType

  } catch (error: any) {
    console.log(error);
  }
};

export const createDallentSeason = async (data: seasonNameForm) => {
  try {
    // Update Setting
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);

    await updateDoc(DallantSettingRef, {
      isActivity: true,
      currentSeasonName: data.name
    });

    //SEASON Document 생성
    await setDoc(doc(db, DALLANTS_COLLCTION.DALLENTS, data.name), {});

    await setDoc(doc(db, DALLANTS_COLLCTION.DALLENTS, data.name, DALLANTS_COLLCTION.STATISTIC, DALLANTS_COLLCTION.OVERALL), {
      totalAmount: 0
    });

    toast.success(`새로운 시즌이 시작됩니다.`)

  } catch (error: any) {
    console.log("@createTalentSeason Error: ",error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const terminateDallentSeason = async () => {
  try {
    const talentSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);

    await updateDoc(talentSettingRef, {
      isActivity: false,
      currentSeasonName: ""
    });

    toast.success(`시즌이 종료되었습니다. 다음에 만나요 👋🏻`)

  } catch (error: any) {
    console.log("@terminateTalentSeason Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const createTransaction = async (submitData: (DallantSubmitType| undefined)[]) => {
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
                  createdTimestamp: serverTimestamp(),
                  description: data.description,
                  amount: data.amount,
                  totalAmount: updatedAmount
                });
                transaction.update(doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, data.cellId, DALLANTS_COLLCTION.MEMBERS, data.userId), {
                  totalAmount: updatedAmount
                })
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
                  createdTimestamp: serverTimestamp(),
                  description: data.description,
                  amount: data.amount,
                  totalAmount: data.amount
                });
                // 셀 신규 생성
                transaction.set(doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, data.cellId), {
                  cellId: data.cellId,
                  cellName: data.cellName,
                  community: data.community,
                  totalAmount: 0
                }, {
                  merge: false
                });
                // 셀 - 멤버 추가하기
                transaction.set(doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, data.cellId, DALLANTS_COLLCTION.MEMBERS, data.userId), {
                  userId: data.userId,
                  userName: data.userName,
                  totalAmount: data.amount
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
    console.log("@createTransaction Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const getCellsDallants = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        let resultTemp: DallantCellType[] = []

        const cellsRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS);
        const cellQuerySnapshot = await getDocs(cellsRef);

        if (!cellQuerySnapshot.empty) {
          for (const cell of cellQuerySnapshot.docs) {

            const membersRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, cell.id, DALLANTS_COLLCTION.MEMBERS);
            const memberquerySnapshot = await getDocs(membersRef)

            if (!memberquerySnapshot.empty) {
              resultTemp.push({
                id: cell.id,
                totalAmount: cell.data().totalAmount,
                participants: memberquerySnapshot.size 
              })
            } else {
              resultTemp.push({
                id: cell.id,
                totalAmount: cell.data().totalAmount,
                participants: 0
              })
            }
          }

          return resultTemp 

        } else {
          return resultTemp 
        }
      }
    }
    
  } catch (error: any) {
    console.log("@getCellDallents Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const getIndividualStatics = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const staticsRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.STATISTIC, DALLANTS_COLLCTION.OVERALL);
        const staticDoc = await getDoc(staticsRef);

        if (staticDoc.exists()) {
          return staticDoc.data() as OverallStaticDataType
        } else {
          // Firebase에서 해당 문서가 없는 경우
          return null
        }
      }
    }

    // Firebase에서 해당 문서가 없는 경우 또는 isActivity가 false인 경우
    return null;
    
  } catch (error: any) {
    console.log("@getIndividualStatics Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)

    // 에러 발생 시 반환할 값
    return null;
  }
}

export const getCellStatics = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const staticsRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.STATISTIC, DALLANTS_COLLCTION.CELLSTATISTIC);
        const staticDoc = await getDoc(staticsRef);

        if (staticDoc.exists()) {
          return staticDoc.data() as CellStaticDataType
        } else {
          // Firebase에서 해당 문서가 없는 경우
          return null
        }
      }
    }

    // Firebase에서 해당 문서가 없는 경우 또는 isActivity가 false인 경우
    return null;
    
  } catch (error: any) {
    console.log("@getCellStatics Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    // 에러 발생 시 반환할 값
    return null;
  }
}


export const getCellDallantDetail = async (cellId: string) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const cellRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, cellId);
        const cellDoc = await getDoc(cellRef);

        const membersRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.CELLS, cellId, DALLANTS_COLLCTION.MEMBERS);
        const memberquerySnapshot = await getDocs(membersRef)

        let resultTemp: DallantCellDetailType = {
          id: cellId,
          totalAmount: 0,
          members: []
        }

        if (cellDoc.exists()) {
          resultTemp.totalAmount = cellDoc.data().totalAmount;

          if (!memberquerySnapshot.empty) {
            memberquerySnapshot.forEach((member) => {
              resultTemp.members.push({
                userId: member.data().userId,
                userName: member.data().userName,
                totalAmount: member.data().totalAmount,
              });
            });

          }
        } 

        return resultTemp 
      }
    }

    return null;
    
  } catch (error: any) {
    console.log("@getCellDallents Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}


export const getUserDallant = async (userId: string) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const userRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {

          const userData = userDoc.data();

          const historyRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, userId, DALLANTS_COLLCTION.HISTORY);
          const historyQuery = query(historyRef, orderBy("createdTimestamp", "asc"))
          const historyQuerySnapshot = await getDocs(historyQuery)

          const historyData = !historyQuerySnapshot.empty
            ? historyQuerySnapshot.docs.map((history) => {
                const historyData = history.data();
                return {
                  docId: history.id,
                  description: historyData.description,
                  amount: historyData.amount,
                  createdAt: historyData.createdAt,
                  createdTimestamp: historyData.createdTimestamp,
                  totalAmount: historyData.totalAmount,
                };
              })
            : [];


          const userDallant: UserDallantType = {
            cellId: userData.cellId,
            cellName: userData.cellName,
            userId: userId,
            userName: userData.userName,
            totalAmount: userData.totalAmount,
            history: historyData,
          };

          return userDallant;

        } else {
          return null
        }
      }
    } 

    return null
    
  } catch (error: any) {
    console.log("@getCellDallents Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null
  }
}


export const updateTotalAmount = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const accountRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS);
        const accountQuerySnapshot = await getDocs(accountRef);

        if (!accountQuerySnapshot.empty) {
          for (const account of accountQuerySnapshot.docs) {

            const historyRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, account.id, DALLANTS_COLLCTION.HISTORY);
            const historyQuerySnapshot = await getDocs(historyRef)

            if (!historyQuerySnapshot.empty) {
              for (const singleHistory of historyQuerySnapshot.docs) {
                const singleRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.ACCOUNTS, account.id, DALLANTS_COLLCTION.HISTORY, singleHistory.id)
                await updateDoc(singleRef, {
                  totalAmount: account.data().totalAmount,
                  createdTimestamp: serverTimestamp(),
                })
              }
            } 
          }

        }
      }
    }
    
  } catch (error: any) {
    console.log("@getCellDallents Error: ", error);
    return null;
  }
}