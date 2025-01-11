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
      termYear: inputValue.termYear,
      weekOfMonth: Number(inputValue.weekOfMonth),
      weekOfYear: Number(inputValue.weekOfYear),
      weekOfTerm: Number(inputValue.weekOfTerm),
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

//월간데이터 입력
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
      date: new Date(inputValue.date),
    });
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

//반기데이터 입력
export async function insertTermCellMeetingValue({
  inputValue,
}: {
  inputValue: TTERMCellMeetingInput;
}) {
  try {
    let term = "";

    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO
    );

    const termInfoDocSnap = await getDoc(termInfoRef);

    if (!termInfoDocSnap.exists() || !termInfoDocSnap.data().currentTerm) {
      throw new Error("Current term is not available in the database.");
    }

    term = termInfoDocSnap.data().currentTerm;

    const termRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.TERM,
      term
    );

    const docSnapshot = await getDoc(termRef);

    const dataToUpdate: Partial<TTERMCellMeetingInput> = {
      absentAvg: inputValue.absentAvg
        ? Number(inputValue.absentAvg)
        : undefined,
      attendanceAvg: inputValue.attendanceAvg
        ? Number(inputValue.attendanceAvg)
        : undefined,
      totalAvg: inputValue.totalAvg ? Number(inputValue.totalAvg) : undefined,
      attendanceRateAvg: inputValue.attendanceRateAvg
        ? Number(inputValue.attendanceRateAvg)
        : undefined,
    };

    if (inputValue.maxAttendance)
      dataToUpdate.maxAttendance = inputValue.maxAttendance;
    if (inputValue.maxAttendanceDate)
      dataToUpdate.maxAttendanceDate = inputValue.maxAttendanceDate;
    if (inputValue.minAttendance)
      dataToUpdate.minAttendance = inputValue.minAttendance;
    if (inputValue.minAttendanceDate)
      dataToUpdate.minAttendanceDate = inputValue.minAttendanceDate;
    if (inputValue.highRate) dataToUpdate.highRate = inputValue.highRate;
    if (inputValue.highRateDate)
      dataToUpdate.highRateDate = inputValue.highRateDate;
    if (inputValue.lowRate) dataToUpdate.lowRate = inputValue.lowRate;
    if (inputValue.lowRateDate)
      dataToUpdate.lowRateDate = inputValue.lowRateDate;

    if (docSnapshot.exists()) {
      await updateDoc(termRef, dataToUpdate);
    } else {
      await setDoc(termRef, {
        absentAvg: Number(inputValue.absentAvg) || 0,
        attendanceAvg: Number(inputValue.attendanceAvg) || 0,
        totalAvg: Number(inputValue.totalAvg) || 0,
        attendanceRateAvg: Number(inputValue.attendanceRateAvg) || 0,
        maxAttendance: inputValue.maxAttendance || "",
        maxAttendanceDate: inputValue.maxAttendanceDate || "",
        minAttendance: inputValue.minAttendance || "",
        minAttendanceDate: inputValue.minAttendanceDate || "",
        highRate: inputValue.highRate || "",
        highRateDate: inputValue.highRateDate || "",
        lowRate: inputValue.lowRate || "",
        lowRateDate: inputValue.lowRateDate || "",
      });
    }
  } catch (error: any) {
    console.log("@insertTermCellMeetingValue Error: ", error);
    throw new Error("Failed to insert or update term cell meeting value.");
  }
}

//연간데이터 입력
export async function insertYearCellMeetingValue({
  inputValue,
}: {
  inputValue: TTERMCellMeetingInput;
}) {
  try {
    let termYear = "";

    const termInfoRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.INFO
    );

    const termInfoDocSnap = await getDoc(termInfoRef);

    if (!termInfoDocSnap.exists() || !termInfoDocSnap.data().currentTerm) {
      throw new Error("Current term is not available in the database.");
    }

    termYear = termInfoDocSnap.data().currentTermYear;

    const termRef = doc(
      db,
      CELLMEETING_COLLCTION.CELLMEETINGS,
      CELLMEETING_COLLCTION.STATISTICS,
      CELLMEETING_COLLCTION.YEAR,
      termYear
    );

    const docSnapshot = await getDoc(termRef);

    const dataToUpdate: Partial<TTERMCellMeetingInput> = {
      absentAvg: inputValue.absentAvg
        ? Number(inputValue.absentAvg)
        : undefined,
      attendanceAvg: inputValue.attendanceAvg
        ? Number(inputValue.attendanceAvg)
        : undefined,
      totalAvg: inputValue.totalAvg ? Number(inputValue.totalAvg) : undefined,
      attendanceRateAvg: inputValue.attendanceRateAvg
        ? Number(inputValue.attendanceRateAvg)
        : undefined,
    };

    if (inputValue.maxAttendance)
      dataToUpdate.maxAttendance = inputValue.maxAttendance;
    if (inputValue.maxAttendanceDate)
      dataToUpdate.maxAttendanceDate = inputValue.maxAttendanceDate;
    if (inputValue.minAttendance)
      dataToUpdate.minAttendance = inputValue.minAttendance;
    if (inputValue.minAttendanceDate)
      dataToUpdate.minAttendanceDate = inputValue.minAttendanceDate;
    if (inputValue.highRate) dataToUpdate.highRate = inputValue.highRate;
    if (inputValue.highRateDate)
      dataToUpdate.highRateDate = inputValue.highRateDate;
    if (inputValue.lowRate) dataToUpdate.lowRate = inputValue.lowRate;
    if (inputValue.lowRateDate)
      dataToUpdate.lowRateDate = inputValue.lowRateDate;

    if (docSnapshot.exists()) {
      await updateDoc(termRef, dataToUpdate);
    } else {
      await setDoc(termRef, {
        absentAvg: Number(inputValue.absentAvg) || 0,
        attendanceAvg: Number(inputValue.attendanceAvg) || 0,
        totalAvg: Number(inputValue.totalAvg) || 0,
        attendanceRateAvg: Number(inputValue.attendanceRateAvg) || 0,
        maxAttendance: inputValue.maxAttendance || "",
        maxAttendanceDate: inputValue.maxAttendanceDate || "",
        minAttendance: inputValue.minAttendance || "",
        minAttendanceDate: inputValue.minAttendanceDate || "",
        highRate: inputValue.highRate || "",
        highRateDate: inputValue.highRateDate || "",
        lowRate: inputValue.lowRate || "",
        lowRateDate: inputValue.lowRateDate || "",
      });
    }
  } catch (error: any) {
    console.log("@insertYearCellMeetingValue Error: ", error);
    throw new Error("Failed to insert or update yearly cell meeting value.");
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
    throw new Error("Failed to insert or update term cell meeting value.");
  }
}
