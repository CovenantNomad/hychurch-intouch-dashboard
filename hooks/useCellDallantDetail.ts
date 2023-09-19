import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { getCellDallantDetail } from "../firebase/Dallant/Dallant";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FindCellQuery, FindCellQueryVariables, useFindCellQuery } from "../graphql/generated";
import { CombinedCellDallantType } from "../interface/Dallants";
import toast from "react-hot-toast";

const useCellDallantDetail = ( cellId : string) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ cellDallant, setCellsDallant ] = useState<CombinedCellDallantType | null>()
  const { isLoading: isCellLoading, isFetching: isCellFetching, data: cellData } = useFindCellQuery<
    FindCellQuery,
    FindCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(cellId),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000 * 24,
      enabled: Boolean(cellId)
    }
  );

  const { isLoading: isDallantLoading, isFetching: isDallantFetching, data: dallantData } = useQuery(
    ['getCellDallentDetail', cellId], 
    () => getCellDallantDetail(cellId),
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: Boolean(cellId !== "")
    }
  )

  useEffect(() => {
    if (!isCellLoading && !isDallantLoading && !isCellFetching && !isDallantFetching) {

      const loadCellDallant = async () => {
        try {
          if (cellData && cellData.findCell && dallantData) {
            const combinedMembers = cellData.findCell.members.map(cellMember => {
              const matchingMember = dallantData.members.find(dallantMember => dallantMember.userId === cellMember.id);
              if (matchingMember) {
                return { ...cellMember, totalAmount: matchingMember.totalAmount };
              }
              return { ...cellMember, totalAmount: 0 };
            });
      
            setCellsDallant({
              id: cellData.findCell.id,
              name: cellData.findCell.name,
              community: cellData.findCell.community,
              leaders: cellData.findCell.leaders,
              members: combinedMembers,
              totalAmount: dallantData.totalAmount
            })
          } else {
            setCellsDallant(null)
          }

        } catch (error) {
          console.error("@loadCellDallant Error: ", error);
          toast.error(`데이터를 불러오는 중에 에러가 발생하였습니다`)
        }
      }

      loadCellDallant()
      setIsLoading(false)

    } else {
      setIsLoading(true)
    }

  }, [isCellLoading, isDallantLoading, isCellFetching, isDallantFetching, dallantData, cellData])


  return {
    isLoading,
    cellDallant
  }
}

export default useCellDallantDetail;