import { Gender, RoleType, UserCellTransferStatus } from "../graphql/generated";
import { AttendanceHistory, TempSavedAttendanceHistory } from "../interface/attendance";
import { MinimumCellType, SpecialCellIdType } from "../interface/cell";
import { CommunityFilter } from "../stores/cellState";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
    return "life"
  }
  if (communityName === CommunityFilter.LIGHT) {
    return "light"
  }
  if (communityName === CommunityFilter.WAY) {
    return "way"
  }
  if (communityName === CommunityFilter.TRUTH) {
    return "truth"
  }
}

export const onHandleCopy = async (text: string) => {
  if (text !== null) {
    try {
      await navigator.clipboard.writeText(text);
      alert('텍스트가 클립보드에 복사되었습니다.');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  }
};

export const checkCommonCell = (cell: MinimumCellType | null | undefined) => {
  if (cell) {
    return cell.id !== SpecialCellIdType.Blessing && cell.id !== SpecialCellIdType.NewFamily && cell.id !== SpecialCellIdType.Renew
  } else {
    return false
  }
}

export const getSpecialCellName = (cellId: string) => {
  switch (cellId) {
    case SpecialCellIdType.NewFamily:
      return "새가족셀"
    
    case SpecialCellIdType.Blessing:
      return "블레싱셀"

    case SpecialCellIdType.Renew:
      return "새싹셀"
  
    default:
      return "미편성"
  }
}


export const groupByChurchServiceId = (attendanceList: TempSavedAttendanceHistory[]) => {
  return attendanceList.reduce((acc: { [key: string]: TempSavedAttendanceHistory[] }, item) => {
    // 현재 아이템의 churchServiceId를 키로 사용합니다.
    const key = item.churchServiceId;

    // 아직 해당 churchServiceId로 그룹화된 배열이 없으면 새 배열을 생성합니다.
    if (!acc[key]) {
      acc[key] = [];
    }

    // 현재 아이템을 해당 churchServiceId 배열에 추가합니다.
    acc[key].push(item);

    return acc;
  }, {});
}

export const groupBySubmitListByChurchServiceId = (attendanceList: AttendanceHistory[]) => {
  return attendanceList.reduce((acc: { [key: string]: AttendanceHistory[] }, item) => {
    // 현재 아이템의 churchServiceId를 키로 사용합니다.
    const key = item.churchService.id;

    // 아직 해당 churchServiceId로 그룹화된 배열이 없으면 새 배열을 생성합니다.
    if (!acc[key]) {
      acc[key] = [];
    }

    // 현재 아이템을 해당 churchServiceId 배열에 추가합니다.
    acc[key].push(item);

    return acc;
  }, {});
}