import { useEffect, useState } from "react"
import { FindCellListsQuery, FindCellListsQueryVariables, useFindCellListsQuery } from "../graphql/generated";
import graphlqlRequestClient from "../client/graphqlRequestClient";
//types
import { CellListType, SpecialCellIdType } from "../interface/cell";
import { FIND_CELL_LIMIT } from "../constants/constant";
import { sortedCellByAge } from "../utils/utils";

// 셀리더 생일(나이)순으로 셀을 정렬한 리스트를 반환합니다.
const useOrderedCellList = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ orderedCellList, setOrderedCellList ] = useState<CellListType[] | null>(null)
  const [ newFamily, setNewFamily ] = useState<CellListType | null>(null)
  const [ newFamilyTwo, setNewFamilyTwo ] = useState<CellListType | null>(null)
  const [ blessing, setBlessing ] = useState<CellListType | null>(null)
  const [ renew, setRenew ] = useState<CellListType | null>(null)

  const { isLoading: isDataLoading, isFetching: isDataFetching, data: cellListData } = useFindCellListsQuery<
    FindCellListsQuery,
    FindCellListsQueryVariables
  >(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 1000 * 60 * 5, //5분
      cacheTime: 1000 * 60 * 30, //30분
    }
  );

  const sortedByAge = (a: CellListType, b: CellListType) => {
    if (a.leaders[0].birthday! > b.leaders[0].birthday!) return 1;
    else if (b.leaders[0].birthday! > a.leaders[0].birthday!) return -1;
    else return 0;
  }

  useEffect(() => {
    if (!isDataLoading && !isDataFetching) {

      if (cellListData && cellListData.findCells) {

        const newFamilyCell = cellListData.findCells.nodes.filter((cell) => cell.id.includes(SpecialCellIdType.NewFamily))[0]
        setNewFamily(newFamilyCell)

        const newFamilyTwoCell = cellListData.findCells.nodes.filter((cell) => cell.id.includes(SpecialCellIdType.NewFamilyTwo))[0]
        setNewFamilyTwo(newFamilyTwoCell)

        const blessingCell = cellListData.findCells.nodes.filter((cell) => cell.id.includes(SpecialCellIdType.Blessing))[0]
        setBlessing(blessingCell)

        const rewewCell = cellListData.findCells.nodes.filter((cell) => cell.id.includes(SpecialCellIdType.Renew))[0]
        setRenew(rewewCell)

        const commonCell = cellListData.findCells.nodes.filter((cell) =>
          !cell.id.includes(SpecialCellIdType.NewFamily) &&
          !cell.id.includes(SpecialCellIdType.NewFamilyTwo) &&
          !cell.id.includes(SpecialCellIdType.Blessing) &&
          !cell.id.includes(SpecialCellIdType.Renew)
        )

        const orderedCellList = commonCell.sort(sortedByAge)
        setOrderedCellList(orderedCellList)

      } else {
        setOrderedCellList(null)
      }

      setIsLoading(false)

    } else {
      setIsLoading(true)
    }


  }, [isDataLoading, isDataFetching, cellListData])


  return {
    isLoading,
    orderedCellList,
    newFamily,
    newFamilyTwo,
    blessing,
    renew
  }
}

export default useOrderedCellList;