import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {cellOrderByAge} from "../constants/cellOrder";
import {Gender, RoleType, UserCellTransferStatus} from "../graphql/generated";
import {
  AttendanceHistory,
  TempSavedAttendanceHistory,
} from "../interface/attendance";
import {
  CellListType,
  MinimumCellType,
  SpecialCellIdType,
  transferedUser,
} from "../interface/cell";
import {CommunityFilter} from "../stores/cellState";
import {MemberWithTransferOut} from "./../interface/user";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeErrorMessage(message: string) {
  return message.split(":")[0];
}

export const getTransferStatus = (state: UserCellTransferStatus) => {
  switch (state) {
    case UserCellTransferStatus.Ordered:
      return "승인대기";

    case UserCellTransferStatus.Canceled:
      return "거절";

    case UserCellTransferStatus.Confirmed:
      return "승인완료";

    default:
      break;
  }
};

export const getRole = (roles: RoleType[]) => {
  if (roles.includes(RoleType.CellLeader)) {
    return "셀리더";
  } else if (roles.includes(RoleType.ViceLeader)) {
    return "부리더";
  } else {
    return "청년";
  }
};

export const getGender = (gender: Gender) => {
  switch (gender) {
    case Gender.Man:
      return "형제";

    case Gender.Woman:
      return "자매";

    default:
      break;
  }
};

export const getServiceName = (id: String) => {
  switch (id) {
    case "1":
      return "1부예배 (07:00)";

    case "2":
      return "2부예배 (08:00)";

    case "3":
      return "3부예배 (09:30)";

    case "4":
      return "4부예배 (11:30)";

    case "5":
      return "청년예배 (14:15)";

    default:
      break;
  }
};

export const covertPhoneNumber = (number: String) => {
  return number.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
};

export const getFirstName = (cellName: string) => {
  const name = cellName.slice(0, -1);
  if (name.length === 4) {
    return name.slice(2);
  } else {
    return name.slice(1);
  }
};

export const getCommunityName = (communityName: string) => {
  if (communityName === CommunityFilter.LIFE) {
    return "life";
  }
  if (communityName === CommunityFilter.LIGHT) {
    return "light";
  }
  if (communityName === CommunityFilter.WAY) {
    return "way";
  }
  if (communityName === CommunityFilter.TRUTH) {
    return "truth";
  }
};

export const onHandleCopy = async (text: string) => {
  if (text !== null) {
    try {
      await navigator.clipboard.writeText(text);
      alert("텍스트가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  }
};

export const checkCommonCell = (cell: MinimumCellType | null | undefined) => {
  if (cell) {
    return (
      cell.id !== SpecialCellIdType.Blessing &&
      cell.id !== SpecialCellIdType.NewFamily &&
      cell.id !== SpecialCellIdType.NewFamilyTwo &&
      cell.id !== SpecialCellIdType.Renew
    );
  } else {
    return false;
  }
};

export const getSpecialCellName = (cellId: string) => {
  switch (cellId) {
    case SpecialCellIdType.NewFamily:
      return "새가족셀";

    case SpecialCellIdType.NewFamilyTwo:
      return "이예찬셀";

    case SpecialCellIdType.Blessing:
      return "블레싱셀";

    case SpecialCellIdType.Renew:
      return "새싹셀";

    default:
      return "미편성";
  }
};

export const groupByChurchServiceId = (
  attendanceList: TempSavedAttendanceHistory[]
) => {
  return attendanceList.reduce(
    (acc: {[key: string]: TempSavedAttendanceHistory[]}, item) => {
      // 현재 아이템의 churchServiceId를 키로 사용합니다.
      const key = item.churchServiceId;

      // 아직 해당 churchServiceId로 그룹화된 배열이 없으면 새 배열을 생성합니다.
      if (!acc[key]) {
        acc[key] = [];
      }

      // 현재 아이템을 해당 churchServiceId 배열에 추가합니다.
      acc[key].push(item);

      return acc;
    },
    {}
  );
};

export const groupBySubmitListByChurchServiceId = (
  attendanceList: AttendanceHistory[]
) => {
  return attendanceList.reduce(
    (acc: {[key: string]: AttendanceHistory[]}, item) => {
      // 현재 아이템의 churchServiceId를 키로 사용합니다.
      const key = item.churchService.id;

      // 아직 해당 churchServiceId로 그룹화된 배열이 없으면 새 배열을 생성합니다.
      if (!acc[key]) {
        acc[key] = [];
      }

      // 현재 아이템을 해당 churchServiceId 배열에 추가합니다.
      acc[key].push(item);

      return acc;
    },
    {}
  );
};

export const getCellUrl = (cellId: string | undefined, userId: string) => {
  switch (cellId) {
    case SpecialCellIdType.NewFamily:
      return `/newfamily/${userId}`;

    case SpecialCellIdType.Blessing:
      return `/blessing/${userId}`;

    case SpecialCellIdType.Renew:
      return `/renew/${userId}`;

    default:
      return `/cells/${cellId}/members/${userId}`;
  }
};

// const folder의 cellOrder 파일에 미리 정의한 순서에 따라서 정렬하는 sort 함수
export const sortedCellByAge = (a: CellListType, b: CellListType) => {
  return cellOrderByAge.indexOf(a.name) - cellOrderByAge.indexOf(b.name);
};

export const makeLinkUrl = (data: transferedUser) => {
  switch (data.toCell.id) {
    case SpecialCellIdType.Renew:
      return `/renew/${data.user.id}`;

    case SpecialCellIdType.NewFamily:
      return `/newfamily/${data.user.id}`;

    case SpecialCellIdType.Blessing:
      return `/blessing/${data.user.id}`;

    default:
      return `/cells/${data.toCell.id}/members/${data.user.id}`;
  }
};

export const convertTerm = (input: string): string => {
  const regex = /^(\d{4})(FIRST|SECOND)$/; // 정규식: 년도와 FIRST/SECOND 형식 매칭
  const match = input.match(regex);

  if (!match) {
    throw new Error(
      "Invalid input format. Expected format: 'YYYYFIRST' or 'YYYYSECOND'."
    );
  }

  const year = match[1]; // 년도 추출
  const term = match[2]; // FIRST 또는 SECOND 추출

  if (term === "FIRST") {
    return `${year} 상반기`;
  } else if (term === "SECOND") {
    return `${year} 하반기`;
  }

  // 논리적으로 여기에 도달하지 않음
  throw new Error("Unexpected error in term conversion.");
};

export const groupMembersByWeek = (
  filteredMembers: MemberWithTransferOut[],
  year: number,
  month: number
) => {
  // 1. 주의 시작일(월요일)과 끝일(일요일)을 계산하는 함수
  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // 월요일
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 일요일
    return {startOfWeek, endOfWeek};
  };

  // 2. 해당 월의 모든 주 계산
  const getAllWeeksInMonth = (year: number, month: number) => {
    const weeks: {start: Date; end: Date}[] = [];
    let currentDate = new Date(year, month - 1, 1); // 월은 0부터 시작
    while (currentDate.getMonth() === month - 1) {
      const {startOfWeek, endOfWeek} = getWeekRange(currentDate);
      weeks.push({start: startOfWeek, end: endOfWeek});
      currentDate.setDate(currentDate.getDate() + 7); // 다음 주로 이동
    }
    return weeks;
  };

  const weeksInMonth = getAllWeeksInMonth(year, month);

  // 3. 주별로 멤버를 그룹화
  const groupedMembers: {[key: string]: MemberWithTransferOut[]} = {};

  weeksInMonth.forEach(({start, end}) => {
    const weekKey = `${start.toISOString().split("T")[0]} ~ ${
      end.toISOString().split("T")[0]
    }`;
    groupedMembers[weekKey] = [];
  });

  filteredMembers.forEach((member) => {
    if (!member.registrationDate) return;

    const registrationDate = new Date(member.registrationDate);
    if (isNaN(registrationDate.getTime())) return;

    // 해당 멤버가 속하는 주를 찾음
    const matchingWeek = weeksInMonth.find(
      ({start, end}) => registrationDate >= start && registrationDate <= end
    );

    if (matchingWeek) {
      const weekKey = `${matchingWeek.start.toISOString().split("T")[0]} ~ ${
        matchingWeek.end.toISOString().split("T")[0]
      }`;
      groupedMembers[weekKey].push(member);
    }
  });

  return groupedMembers;
};

// 생년월일 -> 나이(년생) 변환 함수
export const calculateAge = (birthday: string | null | undefined): string => {
  if (!birthday) return "알 수 없음";

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) return "알 수 없음"; // 유효하지 않은 날짜 처리

  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;

  const shortYear = String(birthYear).slice(-2); // YY 형식 추출
  return `${age}세 (${shortYear}년생)`;
};

// 성별에 따라 색깔표시
export const getGenderColor = (gender: string): string => {
  return gender === "MAN" ? "text-blue-500" : "text-rose-500";
};

// 주일날짜 넣으면 해당월 몇째주인지
export const getWeekNumber = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜"; // 날짜 유효성 검사
  }

  const year = date.getFullYear();
  const month = date.getMonth();

  // 월 첫 번째 날과 첫 번째 일요일 계산
  const firstDayOfMonth = new Date(year, month, 1);
  const firstSunday = new Date(
    firstDayOfMonth.getTime() +
      ((7 - firstDayOfMonth.getDay()) % 7) * 24 * 60 * 60 * 1000
  );

  // 주 번호 계산
  if (date < firstSunday) {
    return `1주 (${dateString})`; // 첫 번째 일요일 이전은 1주
  }

  const diffInDays = Math.floor(
    (date.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)
  );

  const weekNumber = Math.floor(diffInDays / 7) + 1; // 주 번호 계산 (첫 주 포함)

  return `${weekNumber}주 (${dateString})`;
};
