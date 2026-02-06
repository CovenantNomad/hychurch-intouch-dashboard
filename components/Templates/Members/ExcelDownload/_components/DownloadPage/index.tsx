import {Download} from "lucide-react";
import {useMutation} from "react-query";
import {restClient} from "../../../../../../client/restClient";
import {downloadBlob} from "../../../../../../utils/download";

type ExportVars = {excludeGradeG: boolean};

const DownloadPage = () => {
  const useExportUsersExcel = () => {
    return useMutation({
      mutationFn: async ({excludeGradeG}: ExportVars) => {
        const res = await restClient.get(
          `/export/excel?excludeGradeG=${excludeGradeG}`,
        );
        return res.data as Blob;
      },
      onSuccess: (blob, vars) => {
        downloadBlob(
          blob,
          `users_export_${vars.excludeGradeG ? "excludeG" : "all"}.xlsx`,
        );
      },
    });
  };

  const {mutate, isLoading} = useExportUsersExcel();

  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left */}
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
              <Download className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                엑셀 다운로드
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                필요에 따라 전체/일부 제외 버전으로 내려받을 수 있어요.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                다운로드는 데이터 양에 따라 수 초~수십 초 걸릴 수 있습니다.
              </p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col gap-2 sm:min-w-[280px]">
            <button
              onClick={() => mutate({excludeGradeG: false})}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              전체 다운로드
            </button>

            <button
              onClick={() => mutate({excludeGradeG: true})}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              G등급 제외 다운로드
            </button>

            {/* Status line */}
            {isLoading ? (
              <div className="mt-1 text-xs text-gray-500">
                다운로드 준비 중…
              </div>
            ) : (
              <div className="mt-1 text-xs text-gray-400">
                다운로드가 시작되지 않으면 팝업/다운로드 설정을 확인해주세요.
              </div>
            )}
          </div>
        </div>

        {/* Optional footer area */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="rounded-full bg-gray-50 px-2 py-1">
              포함: 이름/셀/연락처/생년월일/성별/주소/등록일/활동등급
            </span>
            <span className="rounded-full bg-gray-50 px-2 py-1">
              권한: 관리자
            </span>
          </div>
        </div>
      </div>

      {/* Placeholder for future */}
      <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6">
        <div className="text-sm font-medium text-gray-800">검색/필터</div>
        <div className="mt-1 text-sm text-gray-600">
          추후 명단 필터링/조건 다운로드 기능을 추가할 예정입니다.
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
