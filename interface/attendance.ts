import { CellLeaderAttendanceSubmissionStatus } from "../graphql/generated"

export interface AttendanceSubmissionType {
  cellId: string;
  cellName: string;
  cellCommunity: string;
  submissionStatus: CellLeaderAttendanceSubmissionStatus
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