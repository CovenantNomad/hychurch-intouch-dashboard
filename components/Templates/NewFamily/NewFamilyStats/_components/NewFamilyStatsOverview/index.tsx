import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import NewFamilyBirthYearStats from "./_components/NewFamilyBirthYearStats";
import NewFamilyLastWeekStats from "./_components/NewFamilyLastWeekStats";
import NewFamilyRatioStats from "./_components/NewFamilyRatioStats";
import NewFamilyRegionStats from "./_components/NewFamilyRegionStats";
import NewFamilyRegistrationStats from "./_components/NewFamilyRegistrationStats/NewFamilyRegistrationStats";

type Props = {};

const NewFamilyStatsOverview = ({}: Props) => {
  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <NewFamilyLastWeekStats />
      </div>
      <BlockContainer>
        <NewFamilyRegistrationStats />
      </BlockContainer>
      <BlockContainer>
        <NewFamilyRatioStats />
      </BlockContainer>
      <BlockContainer>
        <NewFamilyBirthYearStats />
      </BlockContainer>
      <BlockContainer>
        <NewFamilyRegionStats />
      </BlockContainer>
    </>
  );
};

export default NewFamilyStatsOverview;
