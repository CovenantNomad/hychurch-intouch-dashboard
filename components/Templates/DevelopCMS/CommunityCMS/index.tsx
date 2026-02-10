import BlockContainer from "../../../Atoms/Container/BlockContainer";
import IntegratedCommunity from "./_components/IntegratedCommunity";

type Props = {};

const CommunityCMS = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <IntegratedCommunity />
      </BlockContainer>
    </>
  );
};

export default CommunityCMS;
