import {useState} from "react";
import CellMeetingStaticByCell from "./_components/CellMeetingStaticByCell";
import CellMeetingStaticHistorical from "./_components/CellMeetingStaticHistorical";
import CellMeetingStaticOverview from "./_components/CellMeetingStaticOverview";

enum SubTab {
  NORMAL = "NORMAL",
  HISTORICAL = "HISTORICAL",
  CELL = "CELL",
}

const CellMeetingStatistic = () => {
  const [subTab, setSubTab] = useState(SubTab.NORMAL);

  const tabs = [
    {index: 0, label: "일반", value: SubTab.NORMAL},
    {index: 1, label: "과거 데이터", value: SubTab.HISTORICAL},
    {index: 2, label: "셀별 통계", value: SubTab.CELL},
  ];

  return (
    <>
      <div className={`mt-0`}>
        <div className="flex bg-white px-3 pt-5 pb-5 border-t border-l border-r border-slate-200 rounded-tl-md rounded-tr-md lg:px-5">
          {tabs.map((tab) => (
            <div
              key={tab.index}
              onClick={() => setSubTab(tab.value)}
              className={`cursor-pointer hover:bg-gray-100 pb-2 pt-2  ${
                subTab === tab.value
                  ? "text-blue-500 border-blue-500 border-b-2 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="block px-6 text-sm">{tab.label}</span>
            </div>
          ))}
        </div>
        {subTab === SubTab.NORMAL && <CellMeetingStaticOverview />}
        {subTab === SubTab.HISTORICAL && <CellMeetingStaticHistorical />}
        {subTab === SubTab.CELL && <CellMeetingStaticByCell />}
      </div>
    </>
  );
};

export default CellMeetingStatistic;
