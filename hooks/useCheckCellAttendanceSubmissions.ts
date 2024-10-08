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
  const [communityWay, setCommunityWay] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityLife, setCommunityLife] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityTruth, setCommunityTruth] = useState<
    AttendanceSubmissionType[] | null
  >(null);
  const [communityLight, setCommunityLight] = useState<
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

        setCommunityWay(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.WAY)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityLife(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIFE)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityTruth(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.TRUTH)
            .sort((a, b) => {
              if (a.cellName > b.cellName) return 1;
              else if (b.cellName > a.cellName) return -1;
              else return 0;
            })
        );
        setCommunityLight(
          commonCell
            .filter((item) => item.cellCommunity === CommunityFilter.LIGHT)
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
        setCommunityWay(null);
        setCommunityLife(null);
        setCommunityTruth(null);
        setCommunityLight(null);
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isDataLoading, isFetching, data]);

  return {
    isLoading,
    attendanceStatus,
    communityWay,
    communityLife,
    communityTruth,
    communityLight,
    specialCells,
  };
};

export default useCheckCellAttendanceSubmissions;
