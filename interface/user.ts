import { Dispatch, SetStateAction } from "react"
import { Gender, RoleType } from "../graphql/generated"

export interface MemberProps {
  member: {
    id: string
    name: string
    phone: string
    isActive: boolean
    birthday?: string | null | undefined
    gender?: Gender | null | undefined
    address?: string | null | undefined
    cell?: {
      id: string
      name: string
    } | null | undefined
    roles: RoleType[]
  }
}

export interface UserInfomationProps {
  gender: Gender
  isActive: boolean
  birthday: string
  phone: string
  address: string
  description: string
}

export interface UpdateUserInfomationProps {
  id: string
  name: string
  gender: Gender
  isActive: boolean
  birthday: string
  phone: string
  address: string
  description: string
  setUser: Dispatch<SetStateAction<MemberProps>>
}