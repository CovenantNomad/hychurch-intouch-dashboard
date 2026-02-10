import dayjs from "dayjs";
import {getSundaysOfMonthContainingMostRecentSunday} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";

type Props = {};

const AttendancePrint = ({}: Props) => {
  const today = dayjs();
  const result = getSundaysOfMonthContainingMostRecentSunday(today);

  console.log(result.sundays.map((d) => d.format("M.D")));

  return (
    <BlockContainer firstBlock>
      <div className="flex space-x-2 items-baseline mb-6">
        <h4 className="text-xl font-bold">이번주 예배 출석 명단</h4>
      </div>
    </BlockContainer>
  );
};

export default AttendancePrint;
