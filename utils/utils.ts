import { Gender, RoleType, UserCellTransferStatus } from "../graphql/generated";

export function makeErrorMessage(message: string) {
  return message.split(":")[0];
}

export const getTransferStatus = (state: UserCellTransferStatus) => {
  switch (state) {
    case UserCellTransferStatus.Ordered:
      return "승인대기 중";

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
