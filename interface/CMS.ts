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
