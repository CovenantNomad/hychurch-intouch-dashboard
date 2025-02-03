import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import CellMeetingHistoricalMonthly from "./_components/CellMeetingHistoricalMonthly";
import CellMeetingHistoricalTerms from "./_components/CellMeetingHistoricalTerms";
import CellMeetingHistoricalWeekly from "./_components/CellMeetingHistoricalWeekly";
import CellMeetingHistoricalYearly from "./_components/CellMeetingHistoricalYearly";

type Props = {};

const CellMeetingStaticHistorical = ({}: Props) => {
  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <CellMeetingHistoricalYearly />
      </div>
      <BlockContainer>
        <CellMeetingHistoricalTerms />
      </BlockContainer>
      <BlockContainer>
        <CellMeetingHistoricalMonthly />
      </BlockContainer>
      <BlockContainer>
        <CellMeetingHistoricalWeekly />
      </BlockContainer>
    </>
  );
};

export default CellMeetingStaticHistorical;
