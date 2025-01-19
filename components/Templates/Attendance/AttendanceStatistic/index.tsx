import {useState} from "react";
import ServiceStaticHistorical from "./_components/ServiceStaticHistorical";
import ServiceStaticOverview from "./_components/ServiceStaticOverview";

type AttendanceStatisticProps = {};

enum SubTab {
  NORMAL = "NORMAL",
  HISTORICAL = "HISTORICAL",
}

const AttendanceStatistic = ({}: AttendanceStatisticProps) => {
  const [subTab, setSubTab] = useState(SubTab.NORMAL);

  const tabs = [
    {index: 0, label: "일반", value: SubTab.NORMAL},
    {index: 1, label: "과거 데이터", value: SubTab.HISTORICAL},
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
        {subTab === SubTab.NORMAL && <ServiceStaticOverview />}
        {subTab === SubTab.HISTORICAL && <ServiceStaticHistorical />}
      </div>
    </>
  );
};

export default AttendanceStatistic;
