import { atom, selector } from "recoil";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../constants/constant";
import { FindCellsDocument } from "../graphql/generated";
import { CellType, SpecialCellIdType } from "../interface/cell";

export enum CommunityFilter {
  SHOW_ALL = "전체",
  TRUTH = "진리",
  LIFE = "생명",
  WAY = "길",
  LIGHT = "빛",
}

export const communityFilterState = atom<string>({
  key: "CELL/COMMUNITY_FILTER",
  default: CommunityFilter.SHOW_ALL,
});

// export const cellListState = selector<{
//   cellList: CellType[];
//   totalNum: number;
// }>({
//   key: "CELL/CELL_LIST",
//   get: async ({ get }) => {
//     const filter = get(communityFilterState);
//     const result = await graphlqlRequestClient.request(FindCellsDocument, {
//       limit: FIND_CELL_LIMIT,
//     });

//     const commonCell: CellType[] = result.findCells.nodes.filter(
//       (cell: CellType) =>
//         !cell.id.includes(SpecialCellIdType.NewFamily) &&
//         !cell.id.includes(SpecialCellIdType.Blessing) &&
//         !cell.id.includes(SpecialCellIdType.Renew)
//     );

//     switch (filter) {
//       case CommunityFilter.LIFE:
//         let lifetCommunity: CellType[] = commonCell
//           .filter((cell: CellType) => cell.community === CommunityFilter.LIFE)
//           .sort((a, b) => {
//             if (a.name > b.name) return 1;
//             else if (b.name > a.name) return -1;
//             else return 1;
//           });
//         return {
//           cellList: lifetCommunity,
//           totalNum: lifetCommunity.length,
//         };
//       case CommunityFilter.LIGHT:
//         let LightCommnuty: CellType[] = commonCell
//           .filter((cell: CellType) => cell.community === CommunityFilter.LIFE)
//           .sort((a, b) => {
//             if (a.name > b.name) return 1;
//             else if (b.name > a.name) return -1;
//             else return 1;
//           });
//         return {
//           cellList: LightCommnuty,
//           totalNum: LightCommnuty.length,
//         };
//       case CommunityFilter.TRUTH:
//         let truthCommnuty: CellType[] = commonCell
//           .filter((cell: CellType) => cell.community === CommunityFilter.TRUTH)
//           .sort((a, b) => {
//             if (a.name > b.name) return 1;
//             else if (b.name > a.name) return -1;
//             else return 1;
//           });
//         return {
//           cellList: truthCommnuty,
//           totalNum: truthCommnuty.length,
//         };
//       case CommunityFilter.WAY:
//         let wayCommnuty: CellType[] = commonCell
//           .filter((cell: CellType) => cell.community === CommunityFilter.WAY)
//           .sort((a, b) => {
//             if (a.name > b.name) return 1;
//             else if (b.name > a.name) return -1;
//             else return 1;
//           });
//         return {
//           cellList: wayCommnuty,
//           totalNum: wayCommnuty.length,
//         };
//       default:
//         return {
//           cellList: commonCell,
//           totalNum: commonCell.length,
//         };
//     }
//   },
// });
