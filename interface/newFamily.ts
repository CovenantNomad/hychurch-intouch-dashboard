export type TNewFamilyRatioStats = {
  date: string;
  male: number;
  female: number;
  group1: number;
  group2: number;
  group3: number;
  group4: number;
  group5: number;
  total: number;
};

export type TNewFamilyBirthYearStats = {
  [year: string]: number; // 동적으로 연도별 데이터를 키로 사용
} & {
  date: string; // "2025-01-18" 형식의 날짜
  month: string; // "01" 형식의 월
  year: string;
};

export type TNewFamilyRegionStats = {
  date: string; // 데이터 기준 연도
  seoulSum: number; // 서울 합계
  gyeonggiSum: number; // 경기도 합계
  local: number; // 로컬 값
  seoulDetails: Record<string, number>; // 서울 세부 데이터
  gyeonggiDetails: Record<string, number>; // 경기도 세부 데이터
};
