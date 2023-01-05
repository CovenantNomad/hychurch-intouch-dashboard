import { atom } from "recoil";
import { TransferInfo } from "../interface/cell";

export const userTransferListState = atom<TransferInfo[]>({
  key: 'userTransferListState',
  default: []
})

export const userTransferInfoState = atom<TransferInfo | null>({
  key: 'userTransferInfoState',
  default: null
})