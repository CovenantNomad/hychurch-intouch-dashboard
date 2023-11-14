import { useEffect, useState } from "react"
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { FindIndividualAttendanceQuery, FindIndividualAttendanceQueryVariables, useFindIndividualAttendanceQuery } from "../graphql/generated";
import { getSearchSundayRange } from "../utils/dateUtils";
//types
import { trackerType } from "../interface/ui";
import { AttendanceHistoryType } from "../interface/attendance";

const useMemberAttendance = ( memberId: string | null, desiredWeeks: number ) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ numOfattended, setNumOfattended ] = useState<number>(0)
  const [ numOfOffline, setNumOfOffline ] = useState<number>(0)
  const [ numOfOtherServiceAttended, setNumOfOtherServiceAttended ] = useState<number>(0)
  const [ trackData, setTrackData ] = useState<trackerType[]>([])
  const { minDate, maxDate, sundayRange } = getSearchSundayRange(desiredWeeks)

  const { isLoading: isDataLoading, isFetching: isDataFetching, data } = useFindIndividualAttendanceQuery<
    FindIndividualAttendanceQuery,
    FindIndividualAttendanceQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: String(memberId),
      minDate: minDate,
      maxDate: maxDate,
    },
    {
      enabled: memberId !== null,
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  const makeIntouchServiceStatic = (sundayRange: string[], data: FindIndividualAttendanceQuery) => {
    const filteredData: AttendanceHistoryType[] = [];

    let numOfOthersAttended = 0

    sundayRange.forEach(targetDate => {
      const filteredForIntouch = data.user.userChurchServiceHistories.filter(data => {
        return data.attendedAt === targetDate && data.churchService.id === '5';
      })

      const othersAttended = data.user.userChurchServiceHistories.filter(data => {
        return data.attendedAt === targetDate && (data.churchService.id === '1' || data.churchService.id === '2' || data.churchService.id === '3' || data.churchService.id === '4');
      })

      if (filteredForIntouch.length !== 0) {
        const attendedDate = filteredForIntouch.map(item => {
          return {
            isAttended: true,
            attendedAt: item.attendedAt,
            isOnline: item.isOnline,
            serviceId: item.churchService.id,
            serviceName: item.churchService.name,
          }
        })
        filteredData.push(...attendedDate);
      } else if (othersAttended.length !== 0) {
        numOfOthersAttended += 1

        const absentDate = [{
          isAttended: false,
          attendedAt: targetDate,
          isOnline: false
        }]

        filteredData.push(...absentDate);
      } else {
        const absentDate = [{
          isAttended: false,
          attendedAt: targetDate,
          isOnline: false
        }]

        filteredData.push(...absentDate);
      }
    });

    return {
      filteredData,
      numOfOthersAttended
    }
  }

  useEffect(() => {
    if (!isDataLoading && !isDataFetching) {

      if (sundayRange && data) {
        const { filteredData, numOfOthersAttended } = makeIntouchServiceStatic(sundayRange, data)

        setNumOfattended(filteredData.filter(item => item.isAttended).length)
        setNumOfOffline(filteredData.filter(item => item.isAttended && !item.isOnline).length)
        setNumOfOtherServiceAttended(numOfOthersAttended)

        setTrackData(filteredData.reverse().map(item => {
          return {
            key: item.attendedAt,
            color: !item.isAttended ? "rose" : item.isAttended && item.isOnline ? "yellow" : "emerald",
            tooltip: `${item.attendedAt} 예배, ${!item.isAttended ? "미참석" : item.isAttended && item.isOnline ? "온라인" : "성전"}`
          }
        }))
      }

      setIsLoading(false)

    } else {

      setIsLoading(true)
    }


  }, [isDataLoading, isDataFetching, data, desiredWeeks])


  return {
    isLoading,
    numOfattended,
    numOfOffline,
    numOfOtherServiceAttended,
    trackData,
    minDate, 
    maxDate,
  }
}

export default useMemberAttendance;