import CellMeetingCellStaticSection from "../../../../../Organisms/Attendance/CellMeetingCellStaticSection";

type Props = {};

const CellMeetingStaticByCell = ({}: Props) => {
  return (
    <div
      className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
    >
      <CellMeetingCellStaticSection />
    </div>
  );
};

export default CellMeetingStaticByCell;
