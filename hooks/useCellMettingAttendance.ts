import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { getCellMeetingByCellId } from "../firebase/CellMeeting/CellMeeting";
//types
import { TSubmissionObject } from "../interface/cellMeeting";
import { Timestamp } from "firebase/firestore";

const useCellMettingAttendance = ( cellId: string, baseDateString: string ) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ absentList, setAbsentList ] = useState<TSubmissionObject[]>([])
  const [ attendanceList, setAttendanceList ] = useState<TSubmissionObject[]>([])
  const [ submittedAt, setSubmittedAt] = useState<Timestamp | null>(null)
  
  const { isLoading: isDataLoading, isFetching: isDataFetching, data } = useQuery(
    ['getCellMeetingByCellId', cellId, baseDateString], 
    () => getCellMeetingByCellId(cellId, baseDateString),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (!isDataLoading && !isDataFetching) {
      if (data) {
        setAbsentList(data.absentList)
        setAttendanceList(data.attendanceList)
        setSubmittedAt(data.submittedAt)
      }  

      setIsLoading(false)

    } else {

      setIsLoading(true)
    }


  }, [isDataLoading, isDataFetching, data])


  return {
    isLoading,
    absentList,
    attendanceList,
    submittedAt
  }
}

export default useCellMettingAttendance;