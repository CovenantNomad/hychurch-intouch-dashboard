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
  cellMembers: DallantMemberType[]
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
  quantiles: {
    percentile: number;
    range: number[]
  }
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