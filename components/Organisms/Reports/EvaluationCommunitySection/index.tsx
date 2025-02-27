import Link from "next/link";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getEvaluationSubmissionCheck} from "../../../../firebase/EvaluationForm/evaluationFromSubmission";
import useCommunity from "../../../../hooks/useCommunity";
import {CellListType} from "../../../../interface/cell";
import {EvaluationSubmissionStatus} from "../../../../interface/EvaluationFormTypes";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";

const EvaluationCommunitySection = ({
  seasonName,
  communityName,
}: {
  communityName: string;
  seasonName: string;
}) => {
  const {isLoading, data} = useCommunity();
  const [communityCellList, setCommunityCellList] = useState<
    CellListType[] | null
  >(null);
  const [communityLength, setCommunityLength] = useState<number>(0);
  const [completeSubmissionsCount, setCompleteSubmissionsCount] =
    useState<number>(0);
  const [inProgressSubmissionsCount, setInProgressSubmissionsCount] =
    useState<number>(0);

  const {isLoading: isSubmissionCheckLoading, data: submissionCheckData} =
    useQuery(
      ["getEvaluationSubmissionCheck", seasonName],
      () => getEvaluationSubmissionCheck(seasonName),
      {
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      }
    );

  useEffect(() => {
    if (submissionCheckData && communityCellList) {
      let tempCompleteCount = 0;
      let tempInProgressCount = 0;

      for (let i = 0; i < submissionCheckData.length; i++) {
        const isInCommunityCellList = communityCellList.some(
          (cell) => cell.id === submissionCheckData[i].cellId
        );
        if (isInCommunityCellList) {
          if (
            submissionCheckData[i].submissionStatus ===
            EvaluationSubmissionStatus.COMPLETE
          ) {
            tempCompleteCount++;
          } else if (
            submissionCheckData[i].submissionStatus ===
            EvaluationSubmissionStatus.INPROGRESS
          ) {
            tempInProgressCount++;
          }
        }
      }

      setCompleteSubmissionsCount(tempCompleteCount);
      setInProgressSubmissionsCount(tempInProgressCount);
    }
  }, [submissionCheckData, communityCellList]);

  useEffect(() => {
    if (data) {
      const communityList = data.filter(
        (community) => community.communityName === communityName
      )[0];
      setCommunityCellList(communityList.cellList);
      communityList.cellList
        ? setCommunityLength(communityList.cellList.length)
        : setCommunityLength(0);
    }
  }, [data, communityName]);

  return (
    <div>
      <div>
        <p className={`text-lg font-semibold`}>{communityName}</p>
      </div>
      <div>
        {isLoading ? (
          <div>
            <Skeleton className="h-[54px] w-full mt-5 bg-gray-100" />
            {Array.from({length: 8}).map((_, index) => (
              <div
                key={index}
                className="flex justify-between px-6 py-5 border rounded-md mt-3"
              >
                <Skeleton className="h-[24px] w-[54px] bg-gray-100" />
                <Skeleton className="h-[24px] w-[46px] bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {data ? (
              <div className="py-5">
                <div className="text-sm text-center border border-gray-300 py-3 mb-3">
                  {completeSubmissionsCount !== 0 &&
                  communityLength !== 0 &&
                  completeSubmissionsCount === communityLength ? (
                    <span>모든 셀이 출석체크를 제출하였습니다.</span>
                  ) : (
                    <div className="flex justify-evenly">
                      <span className="inline-flex items-center  bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer">
                        제출 : {completeSubmissionsCount}셀
                      </span>
                      <span className="inline-flex items-center  bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 cursor-not-allowed">
                        작성중 : {inProgressSubmissionsCount}셀
                      </span>
                      <span className="inline-flex items-center  bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-not-allowed">
                        미제출 :{" "}
                        {communityLength -
                          completeSubmissionsCount -
                          inProgressSubmissionsCount}
                        셀
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {communityCellList &&
                    communityCellList.map((cell) => (
                      <div
                        key={String(cell.id)}
                        className={`flex justify-between items-center px-6 py-5 shadow-sm rounded-md border`}
                      >
                        <p className="text-black">{cell.name}</p>
                        <div
                          className={`flex justify-center items-center rounded-full`}
                        >
                          {isSubmissionCheckLoading ? (
                            <div className="animate-pulse inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              ...
                            </div>
                          ) : (
                            <>
                              {submissionCheckData ? (
                                <>
                                  {submissionCheckData.find(
                                    (item) => item.cellId === cell.id
                                  ) ? (
                                    submissionCheckData.find(
                                      (item) => item.cellId === cell.id
                                    )?.submissionStatus ===
                                    EvaluationSubmissionStatus.INPROGRESS ? (
                                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 cursor-not-allowed">
                                        작성중
                                      </span>
                                    ) : submissionCheckData.find(
                                        (item) => item.cellId === cell.id
                                      )?.submissionStatus ===
                                      EvaluationSubmissionStatus.COMPLETE ? (
                                      <Link
                                        href={`/reports/evaluation/${cell.id}`}
                                      >
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer">
                                          제출완료
                                        </span>
                                      </Link>
                                    ) : (
                                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-not-allowed">
                                        작성전
                                      </span>
                                    )
                                  ) : (
                                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 cursor-not-allowed">
                                      작성전
                                    </span>
                                  )}
                                </>
                              ) : (
                                <div className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                  에러
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div>
                <EmptyStateSimple />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EvaluationCommunitySection;
