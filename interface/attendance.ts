import {Dayjs} from "dayjs";
import {
  CellLeaderAttendanceSubmissionStatus,
  UserGrade,
} from "../graphql/generated";

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

export type SundaysResult = {
  reference: Dayjs;
  mostRecentSunday: Dayjs;
  year: number;
  month: number; // 1~12
  sundays: Dayjs[];
};

// 출석 프린터 버전
export type AttendanceMember = {
  id: string;
  name: string;
  grade: UserGrade;
  histories: AttendanceHistoryForPrint[];
};

export type AttendanceHistoryForPrint = {
  attendedAt: string; // 서버에서 오는 값(ISO or YYYY-MM-DD)
  isOnline: boolean;
  churchService: {id: string; name: string};
};

export type PersonWithHistories = {
  histories: AttendanceHistoryForPrint[];
};

export type AttendanceCell = {
  cellName: string;
  leader: AttendanceMember;
  members: AttendanceMember[];
};

export type CheongSheetData = {
  cheongNumber: number;
  cells: AttendanceCell[];
};

export type GroupPlan = {
  cheongNumber: number; // 1~8
  groupName: string; // "1청"
  cellIds: number[];
};
