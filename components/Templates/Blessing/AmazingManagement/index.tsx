import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AmazaingHoldList from "./_components/AmazaingHoldList";
import AmazingCourse from "./_components/AmazingCourse";
import AmazingWaitingList from "./_components/AmazingWaitingList";

type Props = {};

const AmazingManagement = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <AmazingCourse />
      </BlockContainer>
      <BlockContainer>
        <AmazingWaitingList />
      </BlockContainer>
      <BlockContainer>
        <AmazaingHoldList />
      </BlockContainer>
    </>
  );
};

export default AmazingManagement;
