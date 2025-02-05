import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import PendingBarnabasCourse from "./_components/PendingBarnabasCourse";
import ProgressBarnabasCourse from "./_components/ProgressBarnabasCourse";

type Props = {};

const BarnabaOverview = ({}: Props) => {
  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <ProgressBarnabasCourse />
      </div>
      <BlockContainer>
        <PendingBarnabasCourse />
      </BlockContainer>
    </>
  );
};

export default BarnabaOverview;
