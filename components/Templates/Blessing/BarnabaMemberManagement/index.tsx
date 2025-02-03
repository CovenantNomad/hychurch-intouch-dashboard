import {useState} from "react";
import BarnabasActiveAge from "./_components/BarnabasActiveAge";
import BarnabasCohorts from "./_components/BarnabasCohorts";

enum SubTab {
  ACTIVE = "Active",
  INACTIVE = "InActive",
}

const BarnabaMemberManagement = () => {
  const [subTab, setSubTab] = useState(SubTab.ACTIVE);

  const tabs = [
    {index: 0, label: "바나바 기수", value: SubTab.ACTIVE},
    {index: 1, label: "연령별 명단", value: SubTab.INACTIVE},
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
        {subTab === SubTab.ACTIVE && <BarnabasCohorts />}
        {subTab === SubTab.INACTIVE && <BarnabasActiveAge />}
      </div>
    </>
  );
};

export default BarnabaMemberManagement;
