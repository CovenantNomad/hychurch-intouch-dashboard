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


export interface Member {
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
  description: string
}

export interface UserInfomationProps {
  gender: Gender | null | undefined
  isActive: boolean
  birthday: string | null | undefined
  phone: string
  address: string | null | undefined
  description: string
}

export interface UpdateUserInfomationProps {
  id: string
  name: string
  isActive: boolean
  birthday?: string | null | undefined
  gender?: Gender | null | undefined
  address?: string | null | undefined
  phone: string
  description: string
  setUser: Dispatch<SetStateAction<Member>>
}