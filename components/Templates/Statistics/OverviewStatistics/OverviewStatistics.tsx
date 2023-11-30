import BlockContainer from "../../../Atoms/Container/BlockContainer";
import HeadCountStatistics from "../HeadCountStatistics/HeadCountStatistics";
import NewFamiltyStatistics from "../NewFamilyStatistics/NewFamiltyStatistics";
import WorshipStatistics from "../WorshipStatistics/WorshipStatistics";

type OverviewStatisticsProps = {}

const OverviewStatistics = ({}: OverviewStatisticsProps) => {
  return (
    <>
      <BlockContainer firstBlock>
        <HeadCountStatistics />
      </BlockContainer>
      <BlockContainer>
        <NewFamiltyStatistics />
      </BlockContainer>
      <BlockContainer>
        <WorshipStatistics />
      </BlockContainer>
    </>
  );
};

export default OverviewStatistics;
