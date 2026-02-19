import {SpecialCellIdType} from "../interface/cell";

const SPECIAL_IDS = [
  SpecialCellIdType.NewFamily,
  SpecialCellIdType.Blessing,
  SpecialCellIdType.Renew,
];

type CellLike = {
  id: string;
  name: string;
};

// 특수셀 제외하고, 일반셀만 필터링 하는 함수
export const filterCommonCells = <T extends CellLike>(cells: T[]): T[] => {
  if (!cells?.length) return [];

  const SPECIAL_IDS = [
    SpecialCellIdType.NewFamily,
    SpecialCellIdType.Blessing,
    SpecialCellIdType.Renew,
  ];

  return cells.filter(
    (cell) =>
      cell?.id && !SPECIAL_IDS.some((specialId) => cell.id.includes(specialId)),
  );
};

// 일반셀을 이름순으로 정렬까지 하는 함수
export const getCommonCellList = <T extends CellLike>(cells: T[]): T[] => {
  const common = filterCommonCells(cells);

  return [...common].sort((a, b) => a.name.localeCompare(b.name));
};
