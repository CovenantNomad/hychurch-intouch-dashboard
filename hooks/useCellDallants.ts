import { useEffect, useState } from "react"
import { FindCellListsQuery, FindCellListsQueryVariables, FindCellsQuery, FindCellsQueryVariables, FindCellsWithMembersQuery, FindCellsWithMembersQueryVariables, useFindCellListsQuery, useFindCellsQuery, useFindCellsWithMembersQuery } from "../graphql/generated";
import { CellListType, SpecialCellIdType } from "../interface/cell";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../constants/constant";
import { useQuery } from "react-query";
import { getCellDallants } from "../firebase/Dallant/Dallant";
import { CombinedCellDallantType, DallantCellListType } from "../interface/Dallants";
import { useRecoilState } from "recoil";
import { dallantState } from "../stores/dallantState";

const useCellDallants = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ cellDallants, setCellsDallants ] = useRecoilState(dallantState)
  const { isLoading: isCellLoading, data: cellData } = useFindCellsWithMembersQuery<
    FindCellsWithMembersQuery,
    FindCellsWithMembersQueryVariables
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

  const { isLoading: isDallantLoading, data: dallantData } = useQuery(
    'getCellDallents', 
    () => getCellDallants(),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    }
  )

  useEffect(() => {
    if (cellData && dallantData) {
      setIsLoading(true)
      const combinedArray: CombinedCellDallantType[] = [];

      cellData.findCells.nodes.forEach(cell => {
        const matchingCell = dallantData.find(cellDallant => cellDallant.id === cell.id);

        if (matchingCell) {
          const combinedMembers = cell.members.map(member1 => {
            const matchingMember = matchingCell.cellMembers.find(member2 => member2.userId === member1.id);
            if (matchingMember) {
              return { ...member1, totalAmount: matchingMember.totalAmount };
            }
            return { ...member1, totalAmount: 0 };;
          });
          combinedArray.push({ ...cell, totalAmount: matchingCell.totalAmount, members: combinedMembers });

        } else {
          const combinedMembers = cell.members.map(member => {
            return {
              ...member,
              totalAmount: 0
            }
          })
          combinedArray.push({ ...cell, totalAmount: 0, members: combinedMembers });
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