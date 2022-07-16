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

export type Step = {
  id: number
  name: string
  isCompleted: boolean
  isCurrent: boolean
}

export type Leader = {
  id: string
  name: String
}