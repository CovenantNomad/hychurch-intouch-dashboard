import {CellLeaderAttendanceSubmissionStatus} from "../graphql/generated";

export enum AttendanceStatus {
  NOT_SUBMITTED = "NOT_SUBMITTED",
  TEMPORARY_SAVE = "TEMPORARY_SAVE",
  COMPLETE = "COMPLETE",
}

export interface AttendanceSubmissionType {
  cellId: string;
  cellName: string;
  cellCommunity: string;
  submissionStatus: CellLeaderAttendanceSubmissionStatus;
}

export interface AttendanceMemberType {
  id: string;
  name: string;
  attendance: boolean;
  isOnline: boolean;
  serviceId?: string;
  serviceName?: string;
}

export interface AttendanceHistoryType {
  isAttended: boolean;
  attendedAt: string;
  isOnline: boolean;
  serviceId?: string;
  serviceName?: string;
}

export interface TempSavedAttendanceHistory {
  userId: string;
  userName: string;
  churchServiceId: string;
  attendedAt: string;
  isOnline: boolean;
  description?: string | null | undefined;
}

export interface AttendanceHistory {
  id: string;
  attendedAt: string;
  user: {
    id: string;
    name: string;
  };
  churchService: {
    id: string;
    name: string;
  };
  isOnline: boolean;
  description?: string | null | undefined;
}

export interface AttendanceGlobalState {
  status: AttendanceStatus;
  attendanceDate: string;
  tempAttendanceList: TempSavedAttendanceHistory[] | null;
  attendanceList: AttendanceHistory[] | null;
}

export type TServiceAttendanceWeekly = {
  firstOff: number;
  firstOnline: number;
  firstTotal: number;
  secondOff: number;
  secondOnline: number;
  secondTotal: number;
  thirdOff: number;
  thirdOnline: number;
  thirdTotal: number;
  fourthOff: number;
  fourthOnline: number;
  fourthTotal: number;
  fifthOff: number;
  fifthOnline: number;
  fifthTotal: number;
  totalOff: number;
  totalOnline: number;
  nonCellMember: number;
  total: number;
  date: Date;
  dateString: string;
  month: string;
  year: string;
  term: string;
  termYear: string;
  weekOfMonth: number;
  weekOfYear: number;
  weekOfTerm: number;
};
