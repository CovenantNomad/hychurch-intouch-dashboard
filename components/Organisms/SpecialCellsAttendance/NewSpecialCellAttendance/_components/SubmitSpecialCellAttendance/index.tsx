import {useMemo, useState} from "react";
import graphlqlRequestClient from "../../../../../../client/graphqlRequestClient";
import {
  FindChurchServicesQuery,
  FindChurchServicesQueryVariables,
  SubmitAttendanceMutation,
  TempSavedAttendanceHistory,
  useFindChurchServicesQuery,
} from "../../../../../../graphql/generated";
import {groupByChurchServiceId} from "../../../../../../utils/utils";
import AttendanceListSectionListItem from "../../../AttendanceListSection/AttendanceListSectionListItem";
import ConfirmDialog from "./_components/ConfirmDialog";

type Props = {
  attendanceList: TempSavedAttendanceHistory[] | null;
  onRemoveHandler: (userId: string, churchServiceId: string) => void;
  onTemporarySaveHandler: () => Promise<{result: SubmitAttendanceMutation}>;
  onSubmitHandler: () => Promise<{result: SubmitAttendanceMutation}>;
  onResetList: () => void;
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  return `${hour}:${minute}`;
};

const SubmitSpecialCellAttendance = ({
  attendanceList,
  onRemoveHandler,
  onTemporarySaveHandler,
  onResetList,
  onSubmitHandler,
}: Props) => {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [isTemporarySaving, setIsTemporarySaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {isLoading: isServiceLoading, data: churchService} =
    useFindChurchServicesQuery<
      FindChurchServicesQuery,
      FindChurchServicesQueryVariables
    >(
      graphlqlRequestClient,
      {},
      {
        staleTime: 24 * 60 * 60 * 1000,
        cacheTime: 24 * 60 * 60 * 1000,
      },
    );

  const groupedByService = useMemo(() => {
    if (!attendanceList || attendanceList.length === 0) return {};
    return groupByChurchServiceId(attendanceList);
  }, [attendanceList]);

  const groupedServiceList = useMemo(() => {
    if (!churchService?.findChurchServices) return [];

    return [...churchService.findChurchServices]
      .reverse()
      .map((service) => {
        const items = groupedByService[service.id] ?? [];

        return {
          service,
          items: [...items].sort((a, b) =>
            a.userName.localeCompare(b.userName, "ko"),
          ),
        };
      })
      .filter((section) => section.items.length > 0);
  }, [churchService, groupedByService]);

  const isEmpty = !attendanceList || attendanceList.length === 0;
  const isActionDisabled =
    !attendanceList ||
    attendanceList.length === 0 ||
    isTemporarySaving ||
    isSubmitting;

  const handleTemporarySave = async () => {
    try {
      setIsTemporarySaving(true);
      await onTemporarySaveHandler();
    } finally {
      setIsTemporarySaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const {result} = await onSubmitHandler();

      if (result.submitCellMemberChurchServiceAttendanceHistories.success) {
        setIsSubmitConfirmOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    onResetList();
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="col-span-2 rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">
          3. 예배출석 제출
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          출석체크를 완료 후, 제출하기를 눌러주세요.
        </p>
      </div>

      <div className="mt-4 px-4 flex flex-col gap-3 lg:flex-row">
        {/* 왼쪽 그룹 */}
        <div className="flex-1">
          {/* 모두삭제 */}
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            disabled={isActionDisabled}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            모두삭제
          </button>
        </div>

        <div className="flex gap-3">
          {/* 임시저장 */}
          <button
            onClick={handleTemporarySave}
            disabled={isActionDisabled}
            className="flex-1 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
          >
            {isTemporarySaving ? "임시저장 중..." : "임시저장"}
          </button>
          {/* 제출하기 */}

          <button
            onClick={() => setIsSubmitConfirmOpen(true)}
            disabled={isActionDisabled}
            className="flex-1 rounded-lg bg-black px-8 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </div>
      </div>

      <div className="p-4">
        {!isEmpty ? (
          <div className="space-y-8">
            {isServiceLoading ? (
              <div className="space-y-6">
                {Array.from({length: 4}).map((_, index) => (
                  <div key={index}>
                    <div className="mb-3 h-5 w-40 animate-pulse rounded bg-gray-200" />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {Array.from({length: 4}).map((__, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="h-20 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : groupedServiceList.length > 0 ? (
              <div className="space-y-5">
                {groupedServiceList.map(({service, items}) => {
                  const offlineCount = items.filter(
                    (item) => !item.isOnline,
                  ).length;
                  const onlineCount = items.filter(
                    (item) => item.isOnline,
                  ).length;

                  return (
                    <div
                      key={service.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50/40 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {service.name}
                          </h4>
                          <p className="mt-1 text-xs text-gray-500">
                            {formatTime(service.startAt)} 출석명단
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium">
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                            성전 {offlineCount}
                          </span>
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                            온라인 {onlineCount}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {items.map((item) => (
                          <AttendanceListSectionListItem
                            key={`${item.userId}-${item.churchServiceId}`}
                            item={item}
                            onRemoveHandler={onRemoveHandler}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-sm text-gray-500">
                출석 데이터는 있지만 예배 정보를 찾지 못했습니다.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.684 12.174c.75 0 1.41-.41 1.75-1.03l3.446-5.917a.996.996 0 0 0-.87-1.48H5.734L5.061 2.52A1 1 0 0 0 4.184 2H2.856a.865.865 0 0 0-.865.874.882.882 0 0 0 .883.873H4l3.6 7.59-1.35 2.44c-.73 1.34.23 2.406 1.75 2.406h11.282a.718.718 0 1 0 0-1.436H7.336l1.234-2.573h8.114ZM6.18 5.03h14.147l-3.264 5.716H8.878L6.18 5.031ZM8.45 17.747a2.45 2.45 0 1 1 0 4.9 2.45 2.45 0 0 1 0-4.9Zm0 1.3a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3ZM17.45 17.747a2.45 2.45 0 1 1 0 4.9 2.45 2.45 0 0 1 0-4.9Zm0 1.3a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z"
                fill="#777"
              />
            </svg>

            <div className="mt-4 space-y-2 text-center">
              <p className="text-gray-500">출석리스트가 비어있습니다</p>
              <p className="text-sm text-gray-400">출석을 추가 해보세요</p>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isResetConfirmOpen}
        title="출석리스트를 모두 삭제할까요?"
        description="현재 선택한 출석 정보가 모두 사라집니다."
        confirmText="모두삭제"
        cancelText="취소"
        confirmButtonClassName="bg-red-600 hover:bg-red-700 text-white"
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleReset}
      />

      <ConfirmDialog
        open={isSubmitConfirmOpen}
        title="출석리스트를 제출할까요?"
        description="제출 후에는 다시 확인이 필요할 수 있습니다."
        confirmText={isSubmitting ? "제출 중..." : "제출하기"}
        cancelText="취소"
        confirmButtonClassName="bg-black hover:bg-gray-800 text-white"
        onClose={() => {
          if (!isSubmitting) setIsSubmitConfirmOpen(false);
        }}
        onConfirm={handleSubmit}
        confirmDisabled={isSubmitting}
        cancelDisabled={isSubmitting}
      />
    </div>
  );
};

export default SubmitSpecialCellAttendance;
