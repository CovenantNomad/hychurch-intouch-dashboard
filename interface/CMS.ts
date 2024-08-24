export type TWeeklyCellMeetingInput = {
  absent: number;
  attendance: number;
  total: number;
  date: Date;
  dateString: string;
  month: string;
  year: string;
  term: string;
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
};

export type TTERMCellMeetingInput = {
  absentAvg: number;
  attendanceAvg: number;
  totalAvg: number;
  attendanceRateAvg: number;
  maxAttendance?: number;
  maxAttendanceDate?: string;
  minAttendance?: number;
  minAttendanceDate?: string;
};

export type TWeeklyServiceInput = {
  thirdOff: number;
  thirdOnline: number;
  fourthOff: number;
  fourthOnline: number;
  fifthOff: number;
  fifthOnline: number;
  totalOff: number;
  totalOnline: number;
  total: number;
  date: Date;
  dateString: string;
  month: string;
  year: string;
  term: string;
  weekOfMonth: number;
  weekOfYear: number;
  weekOfTerm: number;
};
