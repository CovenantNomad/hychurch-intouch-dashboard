import { FieldValue, Timestamp } from "firebase/firestore";

export type TSubmissionObject = {
  userId: string;
  userName: string;
}

export type TCellMeetingSubmissionDataForCell = {
  cellId: string;
  cellName: string;
  baseDate: Date;
  baseDateString: string;
  totalMemberList: TSubmissionObject[];
  attendanceList: TSubmissionObject[];
  absentList: TSubmissionObject[];
  submittedAt: Timestamp;
}

export type TCellMeetingSubmissionDataForMember = {
  userId: string;
  userName: string;
  cellId: string;
  cellName: string;
  baseDate: Date;
  baseDateString: string;
  hasAttended: boolean;
}

export interface CellMeetingGlobalState {
  tempAttendanceList: TCellMeetingSubmissionDataForMember[] | null
}