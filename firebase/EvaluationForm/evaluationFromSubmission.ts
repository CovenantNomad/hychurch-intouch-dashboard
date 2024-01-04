import { collection, doc, getDoc, getDocs, query, runTransaction, where } from "firebase/firestore";
import { db } from "../../client/firebaseConfig";
import { EVALUATIONFORM_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";
import { EvaluationSettingType, IndividualEvaluationDataType, TEvaluationSubmission } from "../../interface/EvaluationFormTypes";


export const getEvaluationSubmissionCheck = async ( seasonName: string, communityName: string ) => {
  try {
    const submissionRef = collection(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, seasonName, EVALUATIONFORM_COLLCTION.SUBMISSION);
    // const communityQuery = query(submissionRef, where("community", "==", communityName));

    let tempList: TEvaluationSubmission[] = []

    const querySnapshot = await getDocs(submissionRef);
    querySnapshot.forEach((doc) => {
      const data = {
        cellId: doc.data().cellId,
        cellName: doc.data().cellName,
        submissionStatus: doc.data().submissionStatus,
        submissionDate: doc.data().submissionDate,
      }
      tempList.push(data)
    });

    return tempList
    
  } catch (error: any) {
    console.log("@getEvaluationSubmissionByComm Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const getEvaluationFormByUserId = async ( userId: string ) => {
  try {
    console.log('시작점!')
    const settingRef = doc(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, EVALUATIONFORM_COLLCTION.SETTINGS)
    const settingDoc = await getDoc(settingRef);

    if (settingDoc.exists()) {
      if (settingDoc.data().isActive) {
        const seasonName = settingDoc.data().seasonName

        const memberDocRef = doc(
          db,
          EVALUATIONFORM_COLLCTION.EVALUATIONFORM,
          seasonName,
          EVALUATIONFORM_COLLCTION.MEMBERLIST,
          userId
        )

        const memberDoc = await getDoc(memberDocRef)

        if (memberDoc.exists()) {

          console.log(memberDoc.exists())
          return memberDoc.data() as IndividualEvaluationDataType
        } else {
          return null
        }

      } else {
        return null
      }
    }

  } catch (error: any) {
    console.log('@getCellMeeting Error: ', error)
    return null
  }
}

