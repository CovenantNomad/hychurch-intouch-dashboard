import {AgeSegmentedGroup} from "../../../../../../../../interface/community.types";

type CommunityPanelProps = {
  groups: AgeSegmentedGroup[];
  assignments: Record<string, string[]>;
  cellMap: Map<string, {id: string; name: string}>;
  editMode: boolean;
  onRemoveCell: (groupId: string, cellId: string) => void;
  loading: boolean;
  onDropCell: (groupId: string, cellId: string) => void;
  dragOverGroupId: string | null;
  onDragOverGroup: (groupId: string | null) => void;
  locked: boolean;
};

const CommunityPanel = ({
  groups,
  assignments,
  cellMap,
  editMode,
  onRemoveCell,
  loading,
  onDropCell,
  dragOverGroupId,
  onDragOverGroup,
  locked,
}: CommunityPanelProps) => {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div>
          <div className="font-medium">연령별 공동체</div>
          <div className="mt-1 text-xs text-gray-500">
            {loading ? "불러오는 중..." : `총 ${groups.length}개`}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {editMode ? "수정 모드" : "조회 모드"}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {groups.map((g) => {
          const ids = assignments[g.id] ?? [];
          const cells = ids
            .map((id) => cellMap.get(id))
            .filter(Boolean) as Array<{id: string; name: string}>;

          const isOver = dragOverGroupId === g.id;

          return (
            <div
              key={g.id}
              // ✅ drop zone
              onDragOver={(e) => {
                if (!editMode || locked) return;
                e.preventDefault(); // 이게 있어야 drop 가능
                onDragOverGroup(g.id);
                e.dataTransfer.dropEffect = "move";
              }}
              onDragLeave={() => {
                if (!editMode) return;
                onDragOverGroup(null);
              }}
              onDrop={(e) => {
                if (!editMode || locked) return;
                e.preventDefault();
                const cellId = e.dataTransfer.getData("text/plain");
                if (cellId) onDropCell(g.id, cellId);
                onDragOverGroup(null);
              }}
              className={`rounded-lg border p-3 transition ${
                isOver ? "border-gray-900 bg-gray-50" : "border-gray-200"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-semibold">{g.name}</div>
                <div className="text-xs text-gray-500">{cells.length}개</div>
              </div>

              <div className="mt-2 max-h-56 overflow-auto rounded-md bg-gray-50 p-2">
                {cells.length === 0 ? (
                  <div className="px-2 py-1 text-xs text-gray-500">
                    {editMode
                      ? "여기로 셀을 드래그해서 놓으세요."
                      : "배치된 셀이 없습니다."}
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {cells.map((c) => (
                      <li
                        key={c.id}
                        className="flex items-center justify-between gap-2 rounded bg-white px-2 py-1 text-sm"
                      >
                        <span className="truncate">{c.name}</span>

                        {editMode ? (
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => onRemoveCell(g.id, c.id)}
                            className="shrink-0 rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                          >
                            빼기
                          </button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {editMode ? (
                <div className="mt-2 text-xs text-gray-500">
                  좌측에서 셀을 드래그해서 이 카드 위에 드롭하면 이 그룹에
                  배치됩니다.
                </div>
              ) : null}
            </div>
          );
        })}

        {!loading && groups.length === 0 ? (
          <div className="text-sm text-gray-500">
            그룹이 없습니다. Seed 먼저 생성해줘야 해요.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommunityPanel;
