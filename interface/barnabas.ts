import {Gender} from "../graphql/generated";

export type TBarnabaProfile = {
  id: string; // 고유 ID
  name: string; // 이름
  gender?: Gender | null; // 성별 (선택적)
  birthday?: string | null; // 생년월일 (선택적)
  isActive: boolean;
  cohort: string;
  uid?: string;
  email?: string;
};

export enum TMatchingStatus {
  PENDING = "pending",
  FAILED = "failed",
  PROGRESS = "progress",
  COMPLETED = "completed",
}

// SMT 타입
export type TSMT = {
  isDone: boolean; // SMT(특별한 1회성 만남) 완료 여부
  date?: string;
};

// Matching 타입
export type TMatching = {
  id: string; // 매칭 ID
  barnabaId: string; // 바나바 ID
  menteeId: string; // 멘티 ID
  barnabaName: string;
  menteeName: string;
  status: TMatchingStatus; // 매칭 상태
  firstMeetingDate?: string; // 첫 만남 날짜 (ISO 8601 형식)
  lastMeetingDate?: string; // 마지막 만남 날짜 (ISO 8601 형식)
  matchingDate: string; // 매칭 시작일 (ISO 8601 형식)
  completedDate?: string; // 매칭 완료일 (ISO 8601 형식, 선택적)
  completedMeetingCount: string; // 진행된 만남 횟수
  scheduledMeetingCount: string; // 예정된 만남 횟수
  description: string;
};

export type TMenteeStatus = {
  isInBarnaba: boolean;
  barnabaStatus: string | null;
  isInAmazing: boolean;
  amazingStatus: string | null;
};

export type TAppointment = {
  appointmentId: string;
  matchingId: string; // 매칭 ID
  barnabaId: string; // 바나바 ID
  menteeId: string; // 멘티 ID
  barnabaName: string;
  menteeName: string;
  date: string;
  hour: string;
  minute: string;
  place: string;
  week: string;
  scheduledMeetingCount: string;
  review: string;
  status: TAppointmentStatus;
};

export enum TAmazingMatchingStatus {
  PENDING = "pending",
  PROGRESS = "progress",
  COMPLETED = "completed",
}

export enum TAppointmentStatus {
  SCHEDULED = "scheduled", // 약속 잡은 상태
  COMPLETED = "completed", // 완료
  CANCELED = "canceled", // 약속 취소
}
