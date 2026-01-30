export type TWeeklyCellMeetingInput = {
  absent: number;
  attendance: number;
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

export type TMonthlyCellMeetingInput = {
  absentAvg: number;
  attendanceAvg: number;
  totalAvg: number;
  attendanceRate: number;
  month: string;
  year: string;
  date: Date;
};

export type TTERMCellMeetingInput = {
  absentAvg: number;
  attendanceAvg: number;
  totalAvg: number;
  attendanceRateAvg: number;
  maxAttendance?: string;
  maxAttendanceDate?: string;
  minAttendance?: string;
  minAttendanceDate?: string;
  highRate?: string;
  highRateDate?: string;
  lowRate?: string;
  lowRateDate?: string;
};

export type TWeeklyServiceInput = {
  firstOff: number;
  firstOnline: number;
  secondOff: number;
  secondOnline: number;
  thirdOff: number;
  thirdOnline: number;
  fourthOff: number;
  fourthOnline: number;
  fifthOff: number;
  fifthOnline: number;
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

export type TNewFamilyWeeklyInput = {
  total: number;
  male: number;
  female: number;
  group1: number;
  group2: number;
  group3: number;
  group4: number;
  group5: number;
  group6: number;
  group7: number;
  group8: number;
  date: Date;
  dateString: string;
  month: string;
  year: string;
  weekOfMonth: number;
  weekOfYear: number;
};

export type TNewFamilyBirthDataInput = {
  [key: string]: string | number; // 인덱스 시그니처를 유니언 타입으로 변경
  dateString: string;
  month: string;
  year: string;
  weekOfMonth: number;
  weekOfYear: number;
  lastYear: number;
};

export type TRegionDataInput = {
  seoul: {district: string; count: number}[]; // 서울의 구별 데이터
  gyeonggi: {city: string; count: number}[]; // 경기도의 데이터
  local: number; // 지방 데이터
};
