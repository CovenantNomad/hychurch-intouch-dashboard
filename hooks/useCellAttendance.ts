import { useEffect, useState } from "react"
import { FindCellAttendanceQuery, FindCellAttendanceQueryVariables, useFindCellAttendanceQuery } from "../graphql/generated";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { AttendanceMemberType } from "../interface/attendance";
import { Dayjs } from 'dayjs';
//types

const useCellAttendance = ( cellId: string | null, recentSunday: Dayjs ) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ missingMember, setMissingMember ] = useState<AttendanceMemberType[]>([])
  const [ intouchAttendaceMember, setIntouchAttendaceMember ] = useState<AttendanceMemberType[]>([])
  const [ othersAttendaceMember, setOthersAttendaceMember ] = useState<AttendanceMemberType[]>([])
  const { isLoading: isDataLoading, isFetching: isDataFetching, data } = useFindCellAttendanceQuery<
    FindCellAttendanceQuery,
    FindCellAttendanceQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(cellId),
      minDate: recentSunday.format('YYYY-MM-DD'),
      maxDate: recentSunday.format('YYYY-MM-DD'),
    },
    {
      enabled: cellId !== null,
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000 * 24,
    }
  );

  useEffect(() => {
    if (!isDataLoading && !isDataFetching) {
      if (data) {
        const missing = data.findCell.members.filter(member => member.userChurchServiceHistories.length === 0).map(item => {
          return {
            id: item.id,
            name: item.name,
            attendance: false,
            isOnline: false,
          }
        })

        setMissingMember(missing)

        const intouch = data.findCell.members.filter(member => member.userChurchServiceHistories.some(item => item.churchService.id === '5')).map(filteredMember => {
          return {
            id: filteredMember.id,
            name: filteredMember.name,
            attendance: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id === '5').length !== 0,
            isOnline: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id === '5')[0].isOnline,
            serviceId: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id === '5')[0].churchService.id,
            serviceName: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id === '5')[0].churchService.name,
          }
        })
        const others = data.findCell.members.filter(member => member.userChurchServiceHistories.length > 0 && !member.userChurchServiceHistories.some(item => item.churchService.id === '5')).map(filteredMember => {
          return {
            id: filteredMember.id,
            name: filteredMember.name,
            attendance: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id !== '5').length !== 0,
            isOnline: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id !== '5')[0].isOnline,
            serviceId: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id !== '5')[0].churchService.id,
            serviceName: filteredMember.userChurchServiceHistories.filter(item => item.churchService.id !== '5')[0].churchService.id,
          }
        })

        setIntouchAttendaceMember(intouch)
        setOthersAttendaceMember(others)
        
      }  

      setIsLoading(false)

    } else {

      setIsLoading(true)
    }


  }, [isDataLoading, isDataFetching, data])


  return {
    isLoading,
    missingMember,
    intouchAttendaceMember,
    othersAttendaceMember,
  }
}

export default useCellAttendance;