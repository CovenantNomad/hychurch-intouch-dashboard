import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AttendnaceTable from "../../../Organisms/Attendance/AttendanceByCell/AttendnaceTable";

type AttendanceOverviewProps = {}

const AttendanceOverview = ({}: AttendanceOverviewProps) => {

  return (
    <BlockContainer firstBlock>
      <AttendnaceTable />
    </BlockContainer>
  );
};

export default AttendanceOverview;
