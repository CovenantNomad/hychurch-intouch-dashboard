import dayjs from "dayjs";
import {useMemo, useState} from "react";

import {downloadAttendanceWorkbook} from "../../../../lib/attendanceWorkbook";

import {buildPlanFromFirebase} from "../../../../firebase/Attendance/buildPlanFromFirebase";
import {useAgeSegmentedGroupCells} from "../../../../hooks/AgedSegmentedCommunity/useAgeSegmentedGroupCells";
import {useAgeSegmentedGroups} from "../../../../hooks/AgedSegmentedCommunity/useAgeSegmentedGroups";
import {useAttendanceGroups} from "../../../../hooks/useAttendanceGroups";
import BlockContainer from "../../../Atoms/Container/BlockContainer";

const AttendancePrint = () => {
  const [refDate, setRefDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
  } = useAgeSegmentedGroups();
  const {
    cellsByGroup,
    loading: cellsLoading,
    error: cellsError,
  } = useAgeSegmentedGroupCells(groups);

  const plan = useMemo(() => {
    if (!groups.length) return [];
    return buildPlanFromFirebase({groups, cellsByGroup});
  }, [groups, cellsByGroup]);

  const enabled = !groupsLoading && !cellsLoading && plan.length > 0;

  const {isLoading, isFetching, isError, dataByCheong} = useAttendanceGroups({
    plan,
    refDate,
    enabled,
  });

  const onDownload = async () => {
    try {
      setIsDownloading(true);

      // ✅ 아직 8개가 다 안 모였으면 다운로드 막기
      if (dataByCheong.length !== plan.length) {
        alert("데이터 로딩이 아직 완료되지 않았어요.");
        return;
      }

      await downloadAttendanceWorkbook({
        refDate,
        dataByCheong,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const busy =
    isLoading || isFetching || isDownloading || groupsLoading || cellsLoading;
  const firebaseError = groupsError || cellsError;

  return (
    <BlockContainer firstBlock>
      <div className="mx-auto max-w-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">성전계수 엑셀 다운로드</h1>

        <div className="rounded-lg border p-4 space-y-3">
          <label className="block text-sm font-medium">기준일</label>

          <input
            type="date"
            value={refDate}
            onChange={(e) => setRefDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {isError && (
            <p className="text-sm text-red-600">
              일부 그룹 데이터를 불러오지 못했어요.
            </p>
          )}

          <p className="text-xs text-gray-600">
            로딩 상태: {dataByCheong.length}/{plan.length} 시트 준비됨
          </p>

          <button
            onClick={onDownload}
            disabled={busy || dataByCheong.length !== plan.length}
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {busy ? "준비 중..." : "1청~8청 엑셀 다운로드"}
          </button>

          {plan.length === 0 ? (
            <p className="text-xs text-gray-500">
              공동체에 배치된 셀이 없습니다. (공동체 관리에서 셀을 배치해
              주세요.)
            </p>
          ) : null}
        </div>
      </div>
    </BlockContainer>
  );
};

export default AttendancePrint;
