import {
  Gender,
  Maybe,
  RoleType,
  Scalars,
  UserCellTransferStatus,
} from "../graphql/generated";

export interface CreateCellType {
  cellName: string;
  leader: {
    id: string;
    name: string;
  };
}

export interface FindLeaderForm {
  name: string;
}

export interface EditCellNameForm {
  name: string;
}

export interface Step {
  id: number;
  name: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Leader {
  id: string;
  name: string;
  phone: string;
  birthday?: string | null | undefined;
  cell?:
    | {
        id: string;
        name: string;
      }
    | null
    | undefined;
  roles: RoleType[];
}

export interface Selected {
  id: string;
  name: string;
}

export interface SelectedWithCell extends Selected {
  cellId: string;
  cellName: string;
}

export interface cellInfoTypes {
  cellId: string | string[] | undefined;
  cellName: string | string[] | undefined;
}

export interface TransferInfo {
  user: {
    userId: string;
    name: string;
  };
  from: {
    cellId: string;
    name: string;
  };
  to: {
    cellId: string;
    name: string;
  };
}

export interface transferedUser {
  completeDate?: Maybe<string> | undefined;
  id: Scalars["ID"];
  orderDate: Scalars["String"];
  status: UserCellTransferStatus;
  fromCell: {
    id: string;
    name: string;
  };
  toCell: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    gender?: Gender | null | undefined;
  };
}

export interface updateCellForm {
  name?: string;
  community?: string;
  description?: string;
}

//새가족셀: 39, 블레싱셀: 47, 새싹셀: 44
export enum SpecialCellIdType {
  /** 새가족셀 (정우현) */
  NewFamily = "39",
  /** 블레싱셀 (백선경) */
  Blessing = "47",
  /** 새싹셀 (이찬양) */
  Renew = "44",
}
