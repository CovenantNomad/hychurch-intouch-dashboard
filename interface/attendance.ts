import { CellLeaderAttendanceSubmissionStatus } from "../graphql/generated"

export interface AttendanceSubmissionType {
  cellId: String;
  cellName: String;
  cellCommunity: String;
  submissionStatus: CellLeaderAttendanceSubmissionStatus
}