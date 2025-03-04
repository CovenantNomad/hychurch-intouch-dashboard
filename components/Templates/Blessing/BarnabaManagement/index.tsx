import {useCallback} from "react";
import {useRecoilState} from "recoil";
import {BarnabasCourseSubTab} from "../../../../interface/barnabas";
import {stateSetting} from "../../../../stores/stateSetting";
import BarnabaOverview from "./_components/BarnabaOverview";
import BarnabaReview from "./_components/BarnabaReview";
import BarnabaSchedule from "./_components/BarnabaSchedule";
import BarnabasCurrentResult from "./_components/BarnabasCurrentResult";
import BarnabasDetailHistory from "./_components/BarnabasDetailHistory";
import MenteeAttendance from "./_components/MenteeAttendance";

const BarnabaManagement = () => {
  const [setting, setSetting] = useRecoilState(stateSetting);
  const subTab = setting.blessingCourseTab || BarnabasCourseSubTab.PROGRESS;

  const setSettingHandler = useCallback(
    (tab: BarnabasCourseSubTab) => {
      setSetting({
        ...setting,
        blessingCourseTab: tab,
      });
    },
    [setting, setSetting]
  );

  const tabs = [
    {index: 0, label: "진행현황", value: BarnabasCourseSubTab.PROGRESS},
    {index: 1, label: "수료/보류현황", value: BarnabasCourseSubTab.RESULTS},
    {index: 2, label: "일정관리", value: BarnabasCourseSubTab.SCHEDULE},
    {index: 3, label: "만남후기", value: BarnabasCourseSubTab.REVIEW},
    {index: 4, label: "과거데이터", value: BarnabasCourseSubTab.HISTORY},
    {index: 5, label: "예배출석체크", value: BarnabasCourseSubTab.ATTENDANCE},
  ];

  return (
    <div className={`mt-0`}>
      <div className="flex bg-white px-3 pt-5 pb-5 border-t border-l border-r border-slate-200 rounded-tl-md rounded-tr-md lg:px-5">
        {tabs.map((tab) => (
          <div
            key={tab.index}
            onClick={() => setSettingHandler(tab.value)}
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
      {subTab === BarnabasCourseSubTab.PROGRESS && <BarnabaOverview />}
      {subTab === BarnabasCourseSubTab.RESULTS && <BarnabasCurrentResult />}
      {subTab === BarnabasCourseSubTab.SCHEDULE && <BarnabaSchedule />}
      {subTab === BarnabasCourseSubTab.REVIEW && <BarnabaReview />}
      {subTab === BarnabasCourseSubTab.HISTORY && <BarnabasDetailHistory />}
      {subTab === BarnabasCourseSubTab.ATTENDANCE && <MenteeAttendance />}
    </div>
  );
};

export default BarnabaManagement;
