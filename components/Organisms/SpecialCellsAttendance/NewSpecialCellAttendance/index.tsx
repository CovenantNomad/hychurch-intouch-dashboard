import {useState} from "react";
import {
  SubmitAttendanceMutation,
  TempSavedAttendanceHistory,
} from "../../../../graphql/generated";

import {onSaveAttendanceListPrpsType} from "../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit";
import {selectedAttendanceMember} from "../../../../interface/attendance";
import {SimpleMemberWithRole} from "../../../../interface/user";
import CheckSpecialCellAttendance from "./_components/CheckSpecialCellAttendance";
import SearchSpecialCellAttendance from "./_components/SearchSpecialCellAttendance";
import SubmitSpecialCellAttendance from "./_components/SubmitSpecialCellAttendance";

type Props = {
  people: SimpleMemberWithRole[];
  attendanceList: TempSavedAttendanceHistory[] | null;
  onRemoveHandler: (userId: string, churchServiceId: string) => void;
  onSaveAttendanceList: ({
    userId,
    userName,
    churchServiceId,
    isOnline,
  }: onSaveAttendanceListPrpsType) => void;
  onTemporarySaveHandler: () => Promise<{result: SubmitAttendanceMutation}>;
  onSubmitHandler: () => Promise<{result: SubmitAttendanceMutation}>;
  onResetList: () => void;
};

const NewSpecialCellAttendance = ({
  people,
  attendanceList,
  onRemoveHandler,
  onResetList,
  onSaveAttendanceList,
  onSubmitHandler,
  onTemporarySaveHandler,
}: Props) => {
  const [selectedMember, setSelectedMember] =
    useState<selectedAttendanceMember | null>(null);

  return (
    <div className="grid grid-cols-4 gap-x-2">
      <SearchSpecialCellAttendance
        people={people}
        selectedMember={selectedMember}
        onSelectMember={setSelectedMember}
      />
      <CheckSpecialCellAttendance
        selectedMember={selectedMember}
        attendanceList={attendanceList}
        disabled={!selectedMember}
        onSaveAttendanceList={onSaveAttendanceList}
      />
      <SubmitSpecialCellAttendance
        attendanceList={attendanceList}
        onRemoveHandler={onRemoveHandler}
        onTemporarySaveHandler={onTemporarySaveHandler}
        onSubmitHandler={onSubmitHandler}
        onResetList={onResetList}
      />
    </div>
  );
};

export default NewSpecialCellAttendance;
