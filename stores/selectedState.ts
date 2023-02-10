import { atom } from "recoil";

interface SelectedStatus {
  selectedCell: {
    cellId: string
    cellName: string
  },
  selectedMember: {
    memeberId: string
    memberName: string
  }
}

export const selectedState = atom<SelectedStatus>({
  key: 'selectedState',
  default: {
    selectedCell: {
      cellId: "",
      cellName: "",
    },
    selectedMember: {
      memeberId: "",
      memberName: ""
    }
  }
})