import BlockContainer from "../../../Atoms/Container/BlockContainer";
import BarnabasHistoryRegistration from "./_components/BarnabasHistoryRegistration";

type Props = {};

const BarnabasCMS = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <BarnabasHistoryRegistration />
      </BlockContainer>
    </>
  );
};

export default BarnabasCMS;
