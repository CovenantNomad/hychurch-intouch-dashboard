import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { CellLeaderAttendanceSubmissionStatus, FindmyCellAttendanceQuery, FindmyCellAttendanceQueryVariables, SubmitAttendanceMutation, SubmitAttendanceMutationVariables, useFindmyCellAttendanceQuery, useSubmitAttendanceMutation } from "../../graphql/generated"
import graphlqlRequestClient from "../../client/graphqlRequestClient"
import { AttendanceHistory, AttendanceStatus, TempSavedAttendanceHistory } from "../../interface/attendance"
import { getMostRecentSunday } from "../../utils/dateUtils"
import toast from "react-hot-toast"

export type onSaveAttendanceListPrpsType = {
  churchServiceId: string
  userId: string
  userName: string
  isOnline: boolean
}

const useAttendanceSubmit = () => {
  const queryClient = useQueryClient()
  const attendanceDate = getMostRecentSunday().format('YYYY-MM-DD')
  const [ attendanceStatus, setAttendanceStatus ] = useState(AttendanceStatus.NOT_SUBMITTED)
  const [ attendanceList, setAttendanceList ] = useState<TempSavedAttendanceHistory[] | null>(null)
  const [ attendanceSubmitList, setAttendanceSubmitList] = useState<AttendanceHistory[] | null>(null)

  const { isLoading, isFetching, data } = useFindmyCellAttendanceQuery<
    FindmyCellAttendanceQuery,
    FindmyCellAttendanceQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: attendanceDate,
    },
    {
      enabled: Boolean(attendanceDate),
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  const { mutateAsync } = useSubmitAttendanceMutation<
    SubmitAttendanceMutation,
    SubmitAttendanceMutationVariables
  >(
    graphlqlRequestClient, 
    {
      onSettled() {
        queryClient.invalidateQueries({ queryKey: ['findmyCellAttendance'] })
      },
  })


  useEffect(() => {
    if (!isLoading || !isFetching) {
      switch (data?.myCellAttendance.__typename) {
        case 'CellAttendanceNotSubmitted':
          setAttendanceStatus(AttendanceStatus.NOT_SUBMITTED)
          setAttendanceList(null)
          setAttendanceSubmitList(null)
          break
        case 'CellAttendanceTempSaved':
          setAttendanceStatus(AttendanceStatus.TEMPORARY_SAVE)
          setAttendanceList(data.myCellAttendance.tempSavedAttendanceHistories)
          setAttendanceSubmitList(null)
          break

        case 'CellAttendanceCompleted':
          setAttendanceStatus(AttendanceStatus.COMPLETE)
          setAttendanceList(null)
          setAttendanceSubmitList(data.myCellAttendance.userChurchServiceHistories)
          break

        default:
          break
      }
    }
  }, [isLoading, isFetching, data])


  const onSaveAttendanceList = ({ userId, userName, churchServiceId, isOnline }: onSaveAttendanceListPrpsType) => {
    setAttendanceList(currentList => {
      const newEntry = {
        userId,
        userName,
        churchServiceId,
        attendedAt: attendanceDate,
        isOnline,
      };
  
      // If the currentList is null, return an array with the new entry
      if (currentList === null) {
        return [newEntry];
      }
  
      // Otherwise, return a new array with all of the old entries and the new entry
      return [...currentList, newEntry];
    });
  }

  const onResetList = () => setAttendanceList(null)

  const onRemoveHandler = (userId: string, churchServiceId: string) => {
    if (attendanceList !== null) {
      const filteredList = attendanceList.filter(
        (item) =>
          !(item.userId === userId && item.churchServiceId === churchServiceId)
      )
      setAttendanceList(filteredList)
    }
  }

  const onTemporarySaveHandler = async () => {
    if (attendanceList !== null) {
      try {
        const submitList = attendanceList.map((item) => {
          return {
            userId: item.userId,
            userName: item.userName,
            churchServiceId: item.churchServiceId,
            isOnline: item.isOnline,
            description: item.description,
          }
        })
        const response = await mutateAsync({
          input: {
            userChurchServiceHistories: submitList,
            attendanceDate: attendanceDate,
            submissionStatus:
              CellLeaderAttendanceSubmissionStatus.TemporarySave,
          },
        })
        if (response.submitCellMemberChurchServiceAttendanceHistories.success) {
          toast.success("임시저장 되었습니다. 나중에 꼭 제출해주세요")
        }
        return {
          result: response,
        }
      } catch (error) {
        console.log(error)
        throw new Error('임시저장을 할 수 없습니다.')
      }
    } else {
      throw new Error('출석체크 인원이 없습니다')
    }
  }

  const onSubmitHandler = async () => {
    if (attendanceList !== null) {
      try {
        const submitList = attendanceList.map((item) => {
          return {
            userId: item.userId,
            userName: item.userName,
            churchServiceId: item.churchServiceId,
            isOnline: item.isOnline,
            description: item.description,
          }
        })
        const response = await mutateAsync({
          input: {
            userChurchServiceHistories: submitList,
            attendanceDate: attendanceDate,
            submissionStatus: CellLeaderAttendanceSubmissionStatus.Complete,
          },
        })

        if (response.submitCellMemberChurchServiceAttendanceHistories.success) {
          toast.success("성공적으로 제출하였습니다")
        }

        return {
          result: response,
        }
      } catch (error) {
        console.log(error)
        throw new Error('출석체크를 저장 할 수 없습니다.')
      }
    } else {
      throw new Error('출석체크 인원이 없습니다')
    }
  }

  return {
    attendanceDate,
    attendanceStatus,
    attendanceList,
    attendanceSubmitList,
    onSaveAttendanceList,
    onRemoveHandler,
    onTemporarySaveHandler,
    onSubmitHandler,
    onResetList
  }
}

export default useAttendanceSubmit