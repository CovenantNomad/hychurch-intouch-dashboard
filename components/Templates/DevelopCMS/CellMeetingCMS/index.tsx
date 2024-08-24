import BlockContainer from "../../../Atoms/Container/BlockContainer";
import MonthlyCMS from "./_components/MonthlyCMS";
import TermCMS from "./_components/TermCMS";
import WeeklyCMS from "./_components/WeeklyCMS";
import YearCMS from "./_components/YearCMS";

type Props = {};

const CellMeetingCMS = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <WeeklyCMS />
      </BlockContainer>
      <BlockContainer>
        <MonthlyCMS />
      </BlockContainer>
      <BlockContainer>
        <TermCMS />
      </BlockContainer>
      <BlockContainer>
        <YearCMS />
      </BlockContainer>
    </>
  );
};

export default CellMeetingCMS;
