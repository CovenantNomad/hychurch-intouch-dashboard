import { Gender, RoleType, UserCellTransferStatus } from "../graphql/generated";
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
