import {useCompletedOrFailedMentees} from "../../../../../../hooks/barnabas/useCompletedOrFailedMentees";
import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import CompleteBarnabasCourse from "./_components/CompleteBarnabasCourse";
import FailBarnabasCourse from "./_components/FailBarnabasCourse";

type Props = {};

const BarnabasCurrentResult = ({}: Props) => {
  const {completedMentees, failedMentees, isLoading} =
    useCompletedOrFailedMentees();

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <CompleteBarnabasCourse
          isLoading={isLoading}
          barnabasCourseList={completedMentees}
        />
      </div>
      <BlockContainer>
        <FailBarnabasCourse
          isLoading={isLoading}
          barnabasCourseList={failedMentees}
        />
      </BlockContainer>
    </>
  );
};

export default BarnabasCurrentResult;
