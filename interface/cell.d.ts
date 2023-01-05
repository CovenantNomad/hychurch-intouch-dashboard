import { Gender } from "../graphql/generated"

export interface AddCellForm {
  name: string
  LeaderUserId: string
  ViceUserId?: string
}

export interface FindLeaderForm {
  name: string
}

export interface EditCellNameForm {
  name: string
}

export interface Step {
  id: number
  name: string
  isCompleted: boolean
  isCurrent: boolean
}

export interface Leader {
  id: string
  name: string
}

export interface Selected {
  id: string
  name: string
}

export interface SelectedWithCell extends Selected {
  cellId: string
  cellName: string
}

export interface TransferInfo {
  id: number
  user: {
    userId: string,
    name: string
  },
  from: {
    cellId: string ,
    name: string
  },
  to: {
    cellId: string,
    name: string
  },
}

export interface cellInfoTypes {
  cellId: string | string[] | undefined
  cellName: string | string[] | undefined
}

export interface transferedUser {
  completeDate?: Maybe<string> | undefined;
  id: Scalars['ID'];
  orderDate: Scalars['String'];
  status: UserCellTransferStatus;
  fromCell: {
    id: string
    name: string
  }
  toCell: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
    gender?: Gender | null | undefined
  }
}