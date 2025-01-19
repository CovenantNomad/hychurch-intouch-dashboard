import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import IntouchServiceCountChart from "./_components/IntouchServiceCountChart";
import IntouchServiceLastWeek from "./_components/IntouchServiceLastWeek";

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
      {/* <BlockContainer>
        <IntouchServiceRatioChart />
      </BlockContainer> */}
    </>
  );
};

export default ServiceStaticOverview;
