import {useEffect, useState} from "react";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import {
  CellLeaderAttendanceSubmissionStatus,
  CheckCellAttendanceSubmissionsQuery,
  CheckCellAttendanceSubmissionsQueryVariables,
  useCheckCellAttendanceSubmissionsQuery,
} from "../graphql/generated";
//types
import {AttendanceSubmissionType} from "../interface/attendance";
import {SpecialCellIdType} from "../interface/cell";
import {CommunityFilter} from "../stores/cellState";

const useCheckCellAttendanceSubmissions = (attendanceDate: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendanceStatus, setAttendanceStatus] = useState<boolean>(false);
  const [communityOne, setCommunityOne] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityTwo, setCommunityTwo] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityThree, setCommunityThree] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityFour, setCommunityFour] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityFive, setCommunityFive] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [specialCells, setSpecialCells] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const {
    isLoading: isDataLoading,
    isFetching,
    data,
  } = useCheckCellAttendanceSubmissionsQuery<
    CheckCellAttendanceSubmissionsQuery,
    CheckCellAttendanceSubmissionsQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: attendanceDate,
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: Boolean(attendanceDate),
    }
  );

  useEffect(() => {
    if (!isDataLoading && !isFetching) {
      if (data && data.cellAttendanceCheckSubmissions) {
        const commonCell = data.cellAttendanceCheckSubmissions.filter(
          (cell) =>
            !cell.cellId.includes(SpecialCellIdType.NewFamily) &&
            !cell.cellId.includes(SpecialCellIdType.NewFamilyTwo) &&
            !cell.cellId.includes(SpecialCellIdType.Blessing) &&
            !cell.cellId.includes(SpecialCellIdType.Renew)
        );

        setSpecialCells(
          data.cellAttendanceCheckSubmissions.filter(
            (cell) =>
              cell.cellId.includes(SpecialCellIdType.NewFamily) ||
              cell.cellId.includes(SpecialCellIdType.NewFamilyTwo) ||
              cell.cellId.includes(SpecialCellIdType.Blessing) ||
              cell.cellId.includes(SpecialCellIdType.Renew)
          )
        );

        setCommunityOne(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHTONE)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityTwo(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHTTWO)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityThree(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHTTHREE)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityFour(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHTFOUR)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityFive(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHTFIVE)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );

        if (
          commonCell.filter(
            (cell) =>
              cell.submissionStatus !==
              CellLeaderAttendanceSubmissionStatus.Complete
          ).length === 0
        ) {
          setAttendanceStatus(true);
        } else {
          setAttendanceStatus(false);
        }
      } else {
        setCommunityOne(null);
        setCommunityTwo(null);
        setCommunityThree(null);
        setCommunityFour(null);
        setCommunityFive(null);
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isDataLoading, isFetching, data]);

  return {
    isLoading,
    attendanceStatus,
    communityOne,
    communityTwo,
    communityThree,
    communityFour,
    communityFive,
    specialCells,
  };
};

export default useCheckCellAttendanceSubmissions;
