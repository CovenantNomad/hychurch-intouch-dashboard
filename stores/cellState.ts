import {atom, selector} from "recoil";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import {FIND_CELL_LIMIT} from "../constants/constant";
import {FindCellsDocument} from "../graphql/generated";
import {CellType, SpecialCellIdType} from "../interface/cell";

export enum CommunityFilter {
  SHOW_ALL = "전체",
  LIGHTONE = "빛1",
  LIGHTTWO = "빛2",
  LIGHTTHREE = "빛3",
  LIGHTFOUR = "빛4",
  LIGHTFIVE = "빛5",
}

export const communityFilterState = atom<string>({
  key: "CELL/COMMUNITY_FILTER",
  default: CommunityFilter.SHOW_ALL,
});

export const cellListState = selector<{
  cellList: CellType[];
  totalNum: number;
}>({
  key: "CELL/CELL_LIST",
  get: async ({get}) => {
    const filter = get(communityFilterState);
    const result = await graphlqlRequestClient.request(FindCellsDocument, {
      limit: FIND_CELL_LIMIT,
    });

    const commonCell: CellType[] = result.findCells.nodes.filter(
      (cell: CellType) =>
        !cell.id.includes(SpecialCellIdType.NewFamily) &&
        !cell.id.includes(SpecialCellIdType.Blessing) &&
        !cell.id.includes(SpecialCellIdType.Renew)
    );

    switch (filter) {
      case CommunityFilter.LIGHTONE:
        let lightOneCommnuty: CellType[] = commonCell
          .filter(
            (cell: CellType) => cell.community === CommunityFilter.LIGHTONE
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 1;
          });
        return {
          cellList: lightOneCommnuty,
          totalNum: lightOneCommnuty.length,
        };
      case CommunityFilter.LIGHTTWO:
        let lightTwoCommnuty: CellType[] = commonCell
          .filter(
            (cell: CellType) => cell.community === CommunityFilter.LIGHTTWO
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 1;
          });
        return {
          cellList: lightTwoCommnuty,
          totalNum: lightTwoCommnuty.length,
        };
      case CommunityFilter.LIGHTTHREE:
        let lightThreeCommnuty: CellType[] = commonCell
          .filter(
            (cell: CellType) => cell.community === CommunityFilter.LIGHTTHREE
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 1;
          });
        return {
          cellList: lightThreeCommnuty,
          totalNum: lightThreeCommnuty.length,
        };
      case CommunityFilter.LIGHTFOUR:
        let lightFourCommnuty: CellType[] = commonCell
          .filter(
            (cell: CellType) => cell.community === CommunityFilter.LIGHTFOUR
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 1;
          });
        return {
          cellList: lightFourCommnuty,
          totalNum: lightFourCommnuty.length,
        };
      case CommunityFilter.LIGHTFIVE:
        let lightFiveCommnuty: CellType[] = commonCell
          .filter(
            (cell: CellType) => cell.community === CommunityFilter.LIGHTFIVE
          )
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 1;
          });
        return {
          cellList: lightFiveCommnuty,
          totalNum: lightFiveCommnuty.length,
        };
      default:
        return {
          cellList: commonCell,
          totalNum: commonCell.length,
        };
    }
  },
});

export const cellMemberSortState = atom<{
  sortKey: "name" | "registrationDate" | "birthday" | "gender" | "grade";
  sortOrder: "asc" | "desc";
}>({
  key: "CELL/CELL_MEMBER_TABLE", // 고유한 키값
  default: {
    sortKey: "name",
    sortOrder: "asc",
  },
});
