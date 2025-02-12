import {useState} from "react";
import BarnabaOverview from "./_components/BarnabaOverview";
import BarnabaSchedule from "./_components/BarnabaSchedule";
import BarnabasCurrentResult from "./_components/BarnabasCurrentResult";
import BarnabasDetailHistory from "./_components/BarnabasDetailHistory";
import MenteeAttendance from "./_components/MenteeAttendance";

enum SubTab {
  PROGRESS = "Progress",
  RESULTS = "Results",
  SCHEDULE = "Schedule",
  HISTORY = "History",
  ATTENDANCE = "Attendance",
}

const BarnabaManagement = () => {
  const [subTab, setSubTab] = useState(SubTab.PROGRESS);

  const tabs = [
    {index: 0, label: "진행현황", value: SubTab.PROGRESS},
    {index: 1, label: "수료/보류현황", value: SubTab.RESULTS},
    {index: 2, label: "일정관리", value: SubTab.SCHEDULE},
    {index: 3, label: "과거데이터", value: SubTab.HISTORY},
    {index: 4, label: "예배출석체크", value: SubTab.ATTENDANCE},
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
        {subTab === SubTab.PROGRESS && <BarnabaOverview />}
        {subTab === SubTab.RESULTS && <BarnabasCurrentResult />}
        {subTab === SubTab.SCHEDULE && <BarnabaSchedule />}
        {subTab === SubTab.HISTORY && <BarnabasDetailHistory />}
        {subTab === SubTab.ATTENDANCE && <MenteeAttendance />}
      </div>
    </>
  );
};

export default BarnabaManagement;
