import { useEffect, useState } from "react"
import { FindCellListsQuery, FindCellListsQueryVariables, useFindCellListsQuery } from "../graphql/generated";
import graphlqlRequestClient from "../client/graphqlRequestClient";
//types
import { CellListType, CommunityType, SpecialCellIdType } from "../interface/cell";
import { CommunityFilter } from "../stores/cellState";
import { FIND_CELL_LIMIT } from "../constants/constant";


const useCommunity = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ data, setData ] = useState<CommunityType[] | null>(null)
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
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    }
  );

  const filterByCellName = (a: CellListType, b: CellListType) => {
    if (a.name > b.name) return 1;
    else if (b.name > a.name) return -1;
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

        const communityWay = commonCell
          .filter(item => item.community === CommunityFilter.WAY)
          .sort((a, b) => filterByCellName(a, b))

        const communityTruth = commonCell
          .filter(item => item.community === CommunityFilter.TRUTH)
          .sort((a, b) => filterByCellName(a, b))

        const communityLife = commonCell
          .filter(item => item.community === CommunityFilter.LIFE)
          .sort((a, b) => filterByCellName(a, b))
          
        const communityLight = commonCell
          .filter(item => item.community === CommunityFilter.LIGHT)
          .sort((a, b) => filterByCellName(a, b))

          const specialCells = [
            ...(newFamily ? [newFamily] : []),
            ...(newFamilyTwo ? [newFamilyTwo] : []),
            ...(blessing ? [blessing] : []),
            ...(renew ? [renew] : [])
          ];

        setData([
          {id: '0', communityName: "길", cellList: communityWay},
          {id: '1', communityName: "진리", cellList: communityTruth},
          {id: '2', communityName: "생명", cellList: communityLife},
          {id: '3', communityName: "빛", cellList: communityLight},
          {id: '4', communityName: "스페셜", cellList: specialCells},
        ])

      } else {
        setData(null)
      }

      setIsLoading(false)

    } else {
      setIsLoading(true)
    }


  }, [isDataLoading, isDataFetching, cellListData])


  return {
    isLoading,
    data,
    newFamily,
    blessing,
    renew
  }
}

export default useCommunity;