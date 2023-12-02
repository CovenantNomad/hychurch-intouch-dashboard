import BlockContainer from "../../../Atoms/Container/BlockContainer";
import HeadCountStatistics from "../HeadCountStatistics/HeadCountStatistics";
import NewFamiltyStatistics from "../NewFamilyStatistics/NewFamiltyStatistics";
import WorshipStatistics from "../WorshipStatistics/WorshipStatistics";

type OverviewStatisticsProps = {}

const OverviewStatistics = ({}: OverviewStatisticsProps) => {
  return (
    <>
      {/* <BlockContainer firstBlock>
        <HeadCountStatistics />
      </BlockContainer>
      <BlockContainer>
        <NewFamiltyStatistics />
      </BlockContainer>
      <BlockContainer>
        <WorshipStatistics />
      </BlockContainer> */}
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">
          현재 페이지는
          <br />
          개발 중입니다
        </h1>
      </div>
    </>
  );
};

export default OverviewStatistics;
