//CELL MEETING

import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {
  TMonthlyCellMeetingInput,
  TTERMCellMeetingInput,
  TWeeklyCellMeetingInput,
  TWeeklyServiceInput,
} from "../../interface/CMS";
import {
  CELLMEETING_COLLCTION,
  SERVICE_COLLCTION,
} from "../../interface/firebase";

export async function insertWeeklyCellMeetingValue(
  inputValue: TWeeklyCellMeetingInput
) {
  try {
    const weeklyRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.WEEKLY,
      inputValue.dateString
    );

    await setDoc(weeklyRef, {
      absent: Number(inputValue.absent),
      attendance: Number(inputValue.attendance),
      total: Number(inputValue.total),
      date: new Date(inputValue.date),
      dateString: inputValue.dateString,
      month: inputValue.month,
      year: inputValue.year,
      term: inputValue.term,
      weekOfMonth: Number(inputValue.weekOfMonth),
      weekOfYear: Number(inputValue.weekOfYear),
      weekOfTerm: Number(inputValue.weekOfTerm),
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

export async function insertMonthlyCellMeetingValue(
  inputValue: TMonthlyCellMeetingInput
) {
  try {
    const monthlyRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.MONTHLY,
      `${inputValue.year}-${inputValue.month}`
    );

    await setDoc(monthlyRef, {
      absentAvg: Number(inputValue.absentAvg),
      attendanceAvg: Number(inputValue.attendanceAvg),
      totalAvg: Number(inputValue.totalAvg),
      attendanceRate: Number(inputValue.attendanceRate),
      month: inputValue.month,
      year: inputValue.year,
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

export async function insertTermCellMeetingValue({
  term,
  inputValue,
}: {
  term: string;
  inputValue: TTERMCellMeetingInput;
}) {
  try {
    const termRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.TERM,
      term
    );

    const docSnapshot = await getDoc(termRef);

    if (docSnapshot.exists()) {
      const dataToUpdate: Partial<TTERMCellMeetingInput> = {};
      dataToUpdate.absentAvg = Number(inputValue.absentAvg);
      dataToUpdate.attendanceAvg = Number(inputValue.attendanceAvg);
      dataToUpdate.totalAvg = Number(inputValue.totalAvg);
      dataToUpdate.attendanceRateAvg = Number(inputValue.attendanceRateAvg);
      if (
        inputValue.maxAttendance !== undefined &&
        Number(inputValue.maxAttendance) !== 0
      ) {
        dataToUpdate.maxAttendance = Number(inputValue.maxAttendance);
      }

      if (
        inputValue.maxAttendanceDate !== undefined &&
        inputValue.maxAttendanceDate !== ""
      ) {
        dataToUpdate.maxAttendanceDate = inputValue.maxAttendanceDate;
      }

      if (
        inputValue.minAttendance !== undefined &&
        Number(inputValue.minAttendance) !== 0
      ) {
        dataToUpdate.minAttendance = Number(inputValue.minAttendance);
      }

      if (
        inputValue.minAttendanceDate !== undefined &&
        inputValue.minAttendanceDate !== ""
      ) {
        dataToUpdate.minAttendanceDate = inputValue.minAttendanceDate;
      }

      // 문서가 존재하면 updateDoc을 사용하여 업데이트합니다.
      await updateDoc(termRef, dataToUpdate);
    } else {
      // 문서가 존재하지 않으면 setDoc을 사용하여 새로 생성합니다.
      await setDoc(termRef, {
        absentAvg: Number(inputValue.absentAvg),
        attendanceAvg: Number(inputValue.attendanceAvg),
        totalAvg: Number(inputValue.totalAvg),
        attendanceRateAvg: Number(inputValue.attendanceRateAvg),
        maxAttendance: Number(inputValue.maxAttendance),
        maxAttendanceDate: inputValue.maxAttendanceDate,
        minAttendance: Number(inputValue.minAttendance),
        minAttendanceDate: inputValue.minAttendanceDate,
      });
    }
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

export async function insertYearCellMeetingValue({
  year,
  inputValue,
}: {
  year: string;
  inputValue: TTERMCellMeetingInput;
}) {
  try {
    const termRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.YEAR,
      year
    );

    const docSnapshot = await getDoc(termRef);

    if (docSnapshot.exists()) {
      const dataToUpdate: Partial<TTERMCellMeetingInput> = {};
      dataToUpdate.absentAvg = Number(inputValue.absentAvg);
      dataToUpdate.attendanceAvg = Number(inputValue.attendanceAvg);
      dataToUpdate.totalAvg = Number(inputValue.totalAvg);
      dataToUpdate.attendanceRateAvg = Number(inputValue.attendanceRateAvg);
      if (
        inputValue.maxAttendance !== undefined &&
        Number(inputValue.maxAttendance) !== 0
      ) {
        dataToUpdate.maxAttendance = Number(inputValue.maxAttendance);
      }

      if (
        inputValue.maxAttendanceDate !== undefined &&
        inputValue.maxAttendanceDate !== ""
      ) {
        dataToUpdate.maxAttendanceDate = inputValue.maxAttendanceDate;
      }

      if (
        inputValue.minAttendance !== undefined &&
        Number(inputValue.minAttendance) !== 0
      ) {
        dataToUpdate.minAttendance = Number(inputValue.minAttendance);
      }

      if (
        inputValue.minAttendanceDate !== undefined &&
        inputValue.minAttendanceDate !== ""
      ) {
        dataToUpdate.minAttendanceDate = inputValue.minAttendanceDate;
      }

      // 문서가 존재하면 updateDoc을 사용하여 업데이트합니다.
      await updateDoc(termRef, dataToUpdate);
    } else {
      // 문서가 존재하지 않으면 setDoc을 사용하여 새로 생성합니다.
      await setDoc(termRef, {
        absentAvg: Number(inputValue.absentAvg),
        attendanceAvg: Number(inputValue.attendanceAvg),
        totalAvg: Number(inputValue.totalAvg),
        attendanceRateAvg: Number(inputValue.attendanceRateAvg),
        maxAttendance: Number(inputValue.maxAttendance),
        maxAttendanceDate: inputValue.maxAttendanceDate,
        minAttendance: Number(inputValue.minAttendance),
        minAttendanceDate: inputValue.minAttendanceDate,
      });
    }
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

//예배출석
export async function insertWeeklyServiceValue(
  inputValue: TWeeklyServiceInput
) {
  try {
    const weeklyRef = doc(
      db,
      SERVICE_COLLCTION.SERVICES,
      SERVICE_COLLCTION.DATA,
      SERVICE_COLLCTION.SERVICEATTENDANCE,
      inputValue.dateString
    );

    await setDoc(weeklyRef, {
      thirdOff: Number(inputValue.thirdOff),
      thirdOnline: Number(inputValue.thirdOnline),
      fourthOff: Number(inputValue.fourthOff),
      fourthOnline: Number(inputValue.fourthOnline),
      fifthOff: Number(inputValue.fifthOff),
      fifthOnline: Number(inputValue.fifthOnline),
      totalOff: Number(inputValue.totalOff),
      totalOnline: Number(inputValue.totalOnline),
      total: Number(inputValue.total),
      date: inputValue.date,
      dateString: inputValue.dateString,
      month: inputValue.month,
      year: inputValue.year,
      term: inputValue.term,
      weekOfMonth: Number(inputValue.weekOfMonth),
      weekOfYear: Number(inputValue.weekOfYear),
      weekOfTerm: Number(inputValue.weekOfTerm),
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}
