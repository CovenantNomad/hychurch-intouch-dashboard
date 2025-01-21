import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import IntouchServiceAttendanceStatics from "./_components/IntouchServiceAttendanceStatics";
import IntouchServiceCountChart from "./_components/IntouchServiceCountChart";
import IntouchServiceLastWeek from "./_components/IntouchServiceLastWeek";
import IntouchServiceOnOffRatioStatics from "./_components/IntouchServiceOnOffRatioStatics";
import IntouchServiceRatioStatics from "./_components/IntouchServiceRatioStatics";

type Props = {};

const ServiceStaticOverview = ({}: Props) => {
  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <IntouchServiceLastWeek />
      </div>
      <BlockContainer>
        <IntouchServiceCountChart />
      </BlockContainer>
      <BlockContainer>
        <IntouchServiceRatioStatics />
      </BlockContainer>
      <BlockContainer>
        <IntouchServiceOnOffRatioStatics />
      </BlockContainer>
      <BlockContainer>
        <IntouchServiceAttendanceStatics />
      </BlockContainer>
    </>
  );
};

export default ServiceStaticOverview;
