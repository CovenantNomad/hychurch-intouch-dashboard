import { Dispatch, SetStateAction } from "react";
import { Gender, RoleType, UserCellTransferStatus } from "../graphql/generated";

export interface MemberProps {
  member: {
    id: string;
    name: string;
    phone: string;
    isActive: boolean;
    birthday?: string | null | undefined;
    gender?: Gender | null | undefined;
    address?: string | null | undefined;
    cell?:
      | {
          id: string;
          name: string;
        }
      | null
      | undefined;
    roles: RoleType[];
  };
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  isActive: boolean;
  birthday?: string | null | undefined;
  registrationDate?: string | null | undefined;
  gender?: Gender | null | undefined;
  address?: string | null | undefined;
  cell?:
    | {
        id: string;
        name: string;
      }
    | null
    | undefined;
  roles: RoleType[];
  description?: string | null | undefined;
}

export type SimpleMemberWithRole = {
  id: string;
  name: string;
  birthday?: string | null | undefined;
  gender?: Gender | null | undefined;
  isActive: boolean;
  registrationDate?: string | null | undefined;
  roles: RoleType[];
}

export interface MemberWithTransferOut extends Member {
  transferStatus?: UserCellTransferStatus;
  toCellId?: string;
  toCellName?: string;
  orderDate?: string;
}

export interface UserInfomationProps {
  gender: Gender | null | undefined;
  isActive: boolean;
  birthday: string | null | undefined;
  phone: string;
  address: string | null | undefined;
  description: string | null | undefined;
}

export interface UpdateUserInfomationProps {
  id: string;
  name: string;
  isActive: boolean;
  birthday?: string | null | undefined;
  gender?: Gender | null | undefined;
  address?: string | null | undefined;
  phone: string;
  description: string | null | undefined;
  cell:
    | {
        id: string;
        name: string;
      }
    | null
    | undefined;
  registrationYear?: string;
  registrationMonth?: string;
  registrationDay?: string;
  hasRegisterDate?: boolean;
  editModeHandler?: Dispatch<SetStateAction<boolean>>;
}
