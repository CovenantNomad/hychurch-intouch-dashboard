import { useEffect, useState } from "react"
import { FindCellsWithMembersQuery, FindCellsWithMembersQueryVariables, useFindCellsWithMembersQuery } from "../graphql/generated";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../constants/constant";
import { useQuery } from "react-query";
import { getCellsDallants } from "../firebase/Dallant/Dallant";
import { CellDallantViewType } from "../interface/Dallants";

const useCellDallants = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ cellDallants, setCellsDallants ] = useState<CellDallantViewType[]>([])
  const { isLoading: isCellLoading, data: cellData } = useFindCellsWithMembersQuery<
    FindCellsWithMembersQuery,
    FindCellsWithMembersQueryVariables
  >(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const { isLoading: isDallantLoading, data: dallantData } = useQuery(
    'getCellsDallents', 
    () => getCellsDallants(),
    {
      staleTime: 3 * 60 * 1000,
      cacheTime: 3 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (cellData && dallantData) {
      setIsLoading(true)
      const combinedArray: CellDallantViewType[] = [];

      cellData.findCells.nodes.forEach(cell => {
        const matchingCell = dallantData.find(cellDallant => cellDallant.id === cell.id);

        if (matchingCell) {
          combinedArray.push({ ...cell, totalAmount: matchingCell.totalAmount, participants: matchingCell.participants });

        } else {
          combinedArray.push({ ...cell, totalAmount: 0, participants: 0 });
        }
      });
      setCellsDallants(combinedArray)
      setIsLoading(false)
    }

  }, [dallantData, cellData])


  return {
    isLoading,
    cellDallants
  }
}

export default useCellDallants;