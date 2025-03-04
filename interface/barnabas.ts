import {Gender} from "../graphql/generated";

export enum TMatchingStatus {
  PENDING = "pending",
  FAILED = "failed",
  PROGRESS = "progress",
  COMPLETED = "completed",
}

export enum TAppointmentStatus {
  SCHEDULED = "scheduled", // 약속 잡은 상태
  COMPLETED = "completed", // 완료
  CANCELED = "canceled", // 약속 취소
}

export enum TAmazingCourseStatus {
  OPEN = "open", // 약속 잡은 상태
  CLOSED = "closed", // 완료
}

export enum TAmazingMentorshipStatus {
  PENDING = "pending",
  WAITING = "waiting",
  PROGRESS = "progress",
  COMPLETED = "completed",
}

export enum BarnabasMemberSubTab {
  COHORT = "cohort",
  AGE = "age",
  HISTORY = "history",
  YEARLY = "yearly",
}

export enum BarnabasCourseSubTab {
  PROGRESS = "Progress",
  RESULTS = "Results",
  SCHEDULE = "Schedule",
  REVIEW = "Review",
  HISTORY = "History",
  ATTENDANCE = "Attendance",
}

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
  matchingStatus: TMatchingStatus;
};

export type TMenteeStatus = {
  isInBarnaba: boolean;
  barnabaStatus: string | null;
  isInAmazing: boolean;
  amazingStatus: string | null;
};

export type TBarnabasHistory = {
  barnabaId: string;
  barnabaName: string;
  total: number;
  pass: number;
  fail: number;
  isActive: boolean;
  barnabasDetails: TBarnabasDetail[];
};

export type TBarnabasDetail = {
  matchingId: string;
  menteeId: string;
  menteeName: string;
  matchingDate: string;
  completedDate?: string;
  scheduledMeetingCount: string;
  status: TMatchingStatus;
};

export type TGroupedAppointments = {
  [date: string]: TAppointment[];
};

export type TMenteeAttendance = {
  date: string;
  barnabaId: string;
  barnabaName: string;
  menteeId: string;
  menteeName: string;
  service: string;
  description?: string;
};

export type TAmazingCourse = {
  cohort: string;
  date: string;
  status: TAmazingCourseStatus;
  members?: TAmazingMember[];
};

export type TAmazingMember = {
  amazingCohort?: string;
  menteeId: string;
  menteeName: string;
  status: TAmazingMentorshipStatus;
};

export type GroupedAppointments = {
  [matchingId: string]: TAppointment[];
};
