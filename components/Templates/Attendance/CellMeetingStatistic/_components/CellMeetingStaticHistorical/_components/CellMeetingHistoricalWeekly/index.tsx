import {useState} from "react";
import {VIEW} from "../../../../../../../../interface/ui";
import ViewTabs from "../../../../../../../Atoms/Tabs/ViewTabs";

type Props = {};

const CellMeetingHistoricalWeekly = ({}: Props) => {
  const [views, setViews] = useState(VIEW.TABLE);

  const viewOptions = [
    {index: 0, label: "테이블", value: VIEW.TABLE},
    {index: 1, label: "차트", value: VIEW.CHART},
  ];

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            주간 데이터
          </h3>
        </div>
        <ViewTabs
          activeView={views}
          setActiveView={setViews}
          viewOptions={viewOptions}
        />
      </div>
      {views === VIEW.TABLE && <div>현재 테이블 개발중 입니다!</div>}
      {views === VIEW.CHART && <div>현재 차트 개발중 입니다!</div>}
    </div>
  );
};

export default CellMeetingHistoricalWeekly;
