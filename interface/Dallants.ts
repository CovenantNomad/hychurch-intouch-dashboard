import { Timestamp } from "firebase/firestore";
import { RoleType } from "../graphql/generated";

export interface DallantsSettingType {
  isActivity: boolean;
  isCellDayOpen: boolean;
  currentSeasonName: string;
}

export interface SeasonNameForm {
  name: string;
}

export interface CreateSeasonSubmitDate {
  name: string;
  startDate: string;
}

export interface DallantFormType {
  cellId: string;
  userId: string;
  cellName: string;
  userName: string;
  community: string;
  description: string;
  amount: string;
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
  createdTimestamp: Timestamp;
  totalAmount: number;
}

export interface UserDallantType extends DallantAccountType {
  history: DallantHistoryType[]
}

export interface UpdateUserHistroyType {
  cellId: string;
  userId: string;
  docId: string;
  description: string;
  amount: number;
  onlyDescriptionUpdate: boolean;
}

export interface DeleteUserHistroyType {
  cellId: string;
  userId: string;
  docId: string;
}

export interface DeleteCellMemberType {
  cellId: string;
  userId: string;
}

// 통계
export interface DallantCellStaticType {
  cellId: string;
  cellName: string;
  totalAmount: number;
  participants: number;
}


// 셀모임의 날
export interface RestaurantFormType {
  restaurantName: string;
}

export interface MenuType {
  menuId: string;
  menuName: string;
  menuDescription?: string;
  menuPrice: string;
  menuImageUrl: string;
}

export interface CreateMenuFormType {
  menuName: string;
  menuDescription?: string;
  menuPrice: string;
}

export interface CreateMenuType {
  restaurantId: string;
  menuName: string;
  menuDescription: string;
  menuPrice: string;
  menuImageUrl: string;
}

export interface UpdateMenuType {
  restaurantId: string;
  menuId: string;
  menuName?: string;
  menuDescription?: string;
  menuPrice?: string;
  menuImageUrl?: string;
}

export interface DeleteMenuType {
  restaurantId: string;
  menuId: string;
}

export interface RestaurantType {
  restaurantId: string;
  restaurantName: string;
  ordered: string;
  menu: MenuType[];
}

export interface CartItemsType {
  menu: MenuType;
  amount: string;
  price: string;
}

export interface CartType {
  cellId: string;
  totalAmount: string;
  cartItems: CartItemsType[]
}

export interface OrderType {
  cellId: string;
  menuId: string;
  amount: string;
  price: string;
}