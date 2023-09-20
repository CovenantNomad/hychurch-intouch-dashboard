import { RoleType } from "../graphql/generated";

export interface DallantsSettingType {
  isActivity: boolean;
  currentSeasonName: string;
}

export interface seasonNameForm {
  name: string;
}

export interface DallantSubmitType {
  createdAt: string;
  userId: string;
  userName: string;
  cellId: string;
  cellName: string;
  community: string;
  description: string;
  amount: number;
}

export interface DallantMemberType {
  userId: string;
  userName: string;
  totalAmount: number;
}

export interface DallantCellListType {
  cellId: string;
  cellName: string;
  community: string;
}

export interface DallantCellType {
  id: string;
  totalAmount: number;
  participants: number;
}

export interface CellDallantViewType {
  id: string;
  name: string;
  community: string;
  leaders: {
    id: string;
    name: string;
    roles: RoleType[];
  }[];
  participants: number;
  totalAmount: number;
}

export interface DallantCellDetailType {
  id: string;
  totalAmount: number;
  members: DallantMemberType[]
}

export interface CombinedCellDallantType {
  id: string;
  name: string;
  community: string;
  leaders: {
    id: string;
    name: string;
    roles: RoleType[];
  }[];
  members: CellDallantMemberType[]
  totalAmount: number;
}

export interface CellDallantMemberType {
  cell?: {
    id: string;
    name: string;
  } | null | undefined;
  id: string;
  name: string;
  roles: RoleType[];
  totalAmount: number;
}

export interface OverallStaticDataType {
  averageDallantsByIndividual: number;
  maxDallantsByIndividual: number;
  minDallantsByIndividual: number;
  participants: number;
  top20Individuals: {
    dallants: number;
    userId: string;
    userName: string;
  }[]
  totalAmount: number;
  latestUpdateAt: {
    seconds: number;
    nanoseconds: number;
  }
}

export interface CellStaticDataType {
  cellTotalAmount: number;
  averageDallantsByCell: number;
  maxDallantsByCell: number;
  minDallantsByCell: number;
  latestUpdateAt: {
    seconds: number;
    nanoseconds: number;
  }
}

export interface DallantRegisterOthersType {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  phone: string;
}

export interface DallantOthersForm {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  description: string;
  amount: string;
}

export interface DallantOthersSubmitType {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  amount: number;
  description: string;
  createdAt: string;
}

export interface DallantOthersListType {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  totalAmount: number;
}

export interface DallantAccountType {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  totalAmount: number;
}

export interface DallantHistoryType {
  docId: string;
  description: string;
  amount: number;
  createdAt: string;
  totalAmount: number;
}

export interface UserDallantType extends DallantAccountType {
  history: DallantHistoryType[]
}