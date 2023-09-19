import { useEffect, useState } from "react"
import { FindCellsWithMembersQuery, FindCellsWithMembersQueryVariables, useFindCellsWithMembersQuery } from "../graphql/generated";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../constants/constant";
import { useQuery } from "react-query";
import { getCellsDallants } from "../firebase/Dallant/Dallant";
import { CellDallantViewType } from "../interface/Dallants";
import { SpecialCellIdType } from "../interface/cell";

const useCellDallants = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ cellDallants, setCellsDallants ] = useState<CellDallantViewType[] | null>(null)
  const { isLoading: isCellLoading, data: cellData, isFetching: isCellFetching } = useFindCellsWithMembersQuery<
    FindCellsWithMembersQuery,
    FindCellsWithMembersQueryVariables
  >(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const { isLoading: isDallantLoading, data: dallantData, isFetching: isDallantFetching, isStale } = useQuery(
    'getCellsDallents', 
    getCellsDallants,
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (!isCellLoading && !isDallantLoading && !isCellFetching && !isDallantFetching) {

      if (cellData && cellData.findCells && dallantData && dallantData.length !== 0) {
        const combinedArray: CellDallantViewType[] = [];
  
        const commonCell = cellData.findCells.nodes.filter((cell) =>
          !cell.id.includes(SpecialCellIdType.NewFamily) &&
          !cell.id.includes(SpecialCellIdType.Blessing) &&
          !cell.id.includes(SpecialCellIdType.Renew)
        )

        commonCell.forEach(cell => {
          const matchingCell = dallantData.find(cellDallant => cellDallant.id == cell.id)

          if (matchingCell) {
            combinedArray.push({
              ...cell,
              totalAmount: matchingCell.totalAmount,
              participants: matchingCell.participants
            })
          } else {
            combinedArray.push({
              ...cell,
              totalAmount: 0,
              participants: 0
            })
          }
        })

        setCellsDallants(combinedArray)

      } else {
        setCellsDallants(null)
      }

      setIsLoading(false)

    } else {
      setIsLoading(true)
    }


  }, [isCellLoading, isDallantLoading, isCellFetching, isDallantFetching, dallantData, cellData])


  return {
    isLoading,
    cellDallants
  }
}

export default useCellDallants;