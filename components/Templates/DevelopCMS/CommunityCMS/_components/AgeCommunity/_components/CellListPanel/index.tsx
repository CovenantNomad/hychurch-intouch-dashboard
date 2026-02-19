type CellListPanelProps = {
  isLoading: boolean;
  cellMap: Map<string, {id: string; name: string}>;
  unassignedIds: string[];
  selectedCellId: string | null;
  onSelectCell: (id: string) => void;
  editMode: boolean;
  onDragStartCell: (cellId: string) => void;
};

const CellListPanel = ({
  isLoading,
  cellMap,
  unassignedIds,
  selectedCellId,
  onSelectCell,
  editMode,
  onDragStartCell,
}: CellListPanelProps) => {
  const unAssignedCells = unassignedIds
    .map((id) => cellMap.get(id))
    .filter(Boolean) as Array<{id: string; name: string}>;

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="font-medium">미배치 셀</div>
        <div className="mt-1 text-xs text-gray-500">
          {isLoading ? "불러오는 중..." : `${unAssignedCells.length}개`}
          {editMode ? " · 클릭해서 선택" : ""}
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        {unAssignedCells.map((cell) => {
          const selected = selectedCellId === cell.id;
          return (
            <button
              key={cell.id}
              type="button"
              draggable={editMode}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", cell.id);
                e.dataTransfer.effectAllowed = "move";
                onDragStartCell(cell.id);
              }}
              onClick={() => onSelectCell(cell.id)}
              disabled={!editMode}
              className={`flex w-full items-center justify-between border-t border-gray-100 px-4 py-2 text-left text-sm first:border-t-0
    disabled:cursor-default disabled:opacity-70
    ${selected ? "bg-gray-900 text-white" : "hover:bg-gray-50"}`}
            >
              <span className="truncate">{cell.name}</span>
              {selected ? (
                <span className="ml-2 text-xs opacity-80">선택됨</span>
              ) : null}
            </button>
          );
        })}

        {!isLoading && unAssignedCells.length === 0 && (
          <div className="px-4 py-3 text-sm text-gray-500">
            미배치 셀이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CellListPanel;
