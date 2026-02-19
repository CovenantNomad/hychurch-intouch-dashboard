import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AgeCommunity from "./_components/AgeCommunity";
import IntegratedCommunity from "./_components/IntegratedCommunity";

type Props = {};

const CommunityCMS = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <IntegratedCommunity />
      </BlockContainer>
      <BlockContainer>
        <AgeCommunity />
      </BlockContainer>
    </>
  );
};

export default CommunityCMS;
