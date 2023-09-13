import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { getCellDallantDetail } from "../firebase/Dallant/Dallant";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FindCellQuery, FindCellQueryVariables, useFindCellQuery } from "../graphql/generated";
import { CombinedCellDallantType } from "../interface/Dallants";

const useCellDallantDetail = ( cellId : string | null) => {
  const [ isDataLoading, setIsDataLoading ] = useState<boolean>(false)
  const [ cellDallants, setCellsDallants ] = useState<CombinedCellDallantType | null>()
  const { isLoading: isCellLoading, data: cellData } = useFindCellQuery<
    FindCellQuery,
    FindCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(cellId),
    },
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
      enabled: Boolean(cellId)
    }
  );

  const { isLoading: isDallantLoading, data: dallantData } = useQuery(
    ['getCellDallentDetail', cellId], 
    () => getCellDallantDetail(cellId!),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
      enabled: Boolean(cellId)
    }
  )

  useEffect(() => {
    if (cellData && dallantData) {
      setIsDataLoading(true)  
      const combinedMembers = cellData.findCell.members.map(cellMember => {
        const matchingMember = dallantData.members.find(dallantMember => dallantMember.userId === cellMember.id);
        if (matchingMember) {
          return { ...cellMember, totalAmount: matchingMember.totalAmount };
        }
        return { ...cellMember, totalAmount: 0 };
      });

      setCellsDallants({
        id: cellData.findCell.id,
        name: cellData.findCell.name,
        community: cellData.findCell.community,
        leaders: cellData.findCell.leaders,
        members: combinedMembers,
        totalAmount: dallantData.totalAmount
      })
      setIsDataLoading(false)
    }

  }, [dallantData, cellData])


  return {
    isDataLoading,
    cellDallants
  }
}

export default useCellDallantDetail;