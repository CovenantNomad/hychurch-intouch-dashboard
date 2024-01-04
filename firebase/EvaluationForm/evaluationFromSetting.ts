import toast from "react-hot-toast";
import { db } from "../../client/firebaseConfig";
import { EVALUATIONFORM_COLLCTION } from "../../interface/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { EvaluationSettingType, TEvaluationSettingForm } from "../../interface/EvaluationFormTypes";

export const getEvalutationActivation = async () => {
  try {
    const settingRef = doc(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, EVALUATIONFORM_COLLCTION.SETTINGS);
    const settingDoc = await getDoc(settingRef);

    if (!settingDoc.exists()) {
      toast.error(`DB가 없습니다. 개발팀에 연락주세요.`)
      return null;  
    } else {
      return settingDoc.data() as EvaluationSettingType
    }
    
  } catch (error: any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}


export const onActivateEvaluationForm = async (newSeasonName: string) => {
  try {
    const convertedSeasonName = `${newSeasonName.split(" ")[0].slice(0, -1)}${newSeasonName.split(" ")[1] === '상반기' ? 'FIRSTHALF' : 'SECONDHALF'}`
    const settingRef = doc(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, EVALUATIONFORM_COLLCTION.SETTINGS);
    await updateDoc(settingRef, {
      isActive: true,
      seasonName: convertedSeasonName
    })

    toast.success(`셀평가서를 위한 초기세팅을 마쳤습니다.\n입력기간과 열람기간을 추가로 설정해주세요.`)

  } catch (error : any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const onInActivateEvaluationForm = async () => {
  try {
    const settingRef = doc(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, EVALUATIONFORM_COLLCTION.SETTINGS);
    await updateDoc(settingRef, {
      isActive: false,
      seasonName: "",
      entryPeriod: {},
      viewingPeriod: {}
    })

    toast.success(`셀평가서를 종료합니다.`)

  } catch (error : any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}

export const updateEvalutionFormSetting = async (data: TEvaluationSettingForm) => {
  try {
    const settingRef = doc(db, EVALUATIONFORM_COLLCTION.EVALUATIONFORM, EVALUATIONFORM_COLLCTION.SETTINGS);
    await updateDoc(settingRef, {
      entryPeriod: data.entryPeriod,
      viewingPeriod: data.viewingPeriod,
    })

    toast.success(`입력기간과 열람기간을 설정하였습니다`)

  } catch (error : any) {
    console.log("@getCellMeeting Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
    return null;
  }
}