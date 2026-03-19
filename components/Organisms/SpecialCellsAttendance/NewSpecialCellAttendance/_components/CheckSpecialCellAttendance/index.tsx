import {useMemo} from "react";
import toast from "react-hot-toast";
import graphlqlRequestClient from "../../../../../../client/graphqlRequestClient";
import {
  FindChurchServicesQuery,
  FindChurchServicesQueryVariables,
  TempSavedAttendanceHistory,
  useFindChurchServicesQuery,
} from "../../../../../../graphql/generated";
import {onSaveAttendanceListPrpsType} from "../../../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit";
import {selectedAttendanceMember} from "../../../../../../interface/attendance";

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  return `${hour}:${minute}`;
};

type Props = {
  selectedMember: selectedAttendanceMember | null;
  attendanceList: TempSavedAttendanceHistory[] | null;
  disabled: boolean;
  onSaveAttendanceList: ({
    userId,
    userName,
    churchServiceId,
    isOnline,
  }: onSaveAttendanceListPrpsType) => void;
};

const CheckSpecialCellAttendance = ({
  selectedMember,
  attendanceList,
  disabled = false,
  onSaveAttendanceList,
}: Props) => {
  const {
    isLoading: isServiceLoading,
    isFetching: isServiceFetching,
    data: churchService,
  } = useFindChurchServicesQuery<
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

  const reversedServices = useMemo(() => {
    if (!churchService?.findChurchServices) return [];
    return [...churchService.findChurchServices].reverse();
  }, [churchService]);

  const getSelectedOption = (churchServiceId: string) => {
    if (!selectedMember || !attendanceList) return null;

    return attendanceList.find(
      (item) =>
        item.userId === selectedMember.userId &&
        item.churchServiceId === churchServiceId,
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">
          2. 예배출석 선택
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          인원을 선택한 뒤 예배별로 성전 또는 온라인을 선택하세요.
        </p>
      </div>

      <div className="p-4">
        {!selectedMember ? (
          <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500 mb-2">
            먼저 인원을 선택해주세요.
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-lg bg-blue-50 px-3 py-3 text-sm text-blue-700">
              선택 인원:{" "}
              <span className="font-semibold">{selectedMember.userName}</span>
            </div>

            {isServiceLoading || isServiceFetching ? (
              <div className="space-y-3">
                {Array.from({length: 4}).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-100" />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-11 animate-pulse rounded-lg bg-gray-100" />
                      <div className="h-11 animate-pulse rounded-lg bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !churchService ? (
              <div className="rounded-lg bg-red-50 px-4 py-6 text-sm text-red-600">
                데이터를 가져오지 못했습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {reversedServices.map((service) => {
                  const selectedOption = getSelectedOption(service.id);
                  const isOfflineSelected = selectedOption?.isOnline === false;
                  const isOnlineSelected = selectedOption?.isOnline === true;

                  const buttonDisabled = disabled || !selectedMember;

                  return (
                    <div
                      key={service.id}
                      className="rounded-xl border border-gray-200 bg-gray-50/40 p-4"
                    >
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {service.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatTime(service.startAt)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          disabled={buttonDisabled}
                          onClick={() => {
                            if (!selectedMember) {
                              toast.error("먼저 인원을 선택해주세요");
                              return;
                            }

                            onSaveAttendanceList({
                              userId: selectedMember.userId,
                              userName: selectedMember.userName,
                              churchServiceId: service.id,
                              isOnline: false,
                            });
                          }}
                          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                            isOfflineSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                          } disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-400`}
                        >
                          성전
                        </button>

                        <button
                          type="button"
                          disabled={buttonDisabled}
                          onClick={() => {
                            if (!selectedMember) {
                              toast.error("먼저 인원을 선택해주세요");
                              return;
                            }

                            onSaveAttendanceList({
                              userId: selectedMember.userId,
                              userName: selectedMember.userName,
                              churchServiceId: service.id,
                              isOnline: true,
                            });
                          }}
                          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                            isOnlineSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                          } disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-400`}
                        >
                          온라인
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckSpecialCellAttendance;
