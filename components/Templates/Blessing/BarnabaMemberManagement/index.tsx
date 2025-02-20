import {useCallback} from "react";
import {useRecoilState} from "recoil";
import {BarnabasMemberSubTab} from "../../../../interface/barnabas";
import {stateSetting} from "../../../../stores/stateSetting";
import BarnabasActiveAge from "./_components/BarnabasActiveAge";
import BarnabasCohorts from "./_components/BarnabasCohorts";
import BarnabasHistory from "./_components/BarnabasHistory";
import BarnabasYearlyHistory from "./_components/BarnabasYearlyHistory";

const BarnabaMemberManagement = () => {
  const [setting, setSetting] = useRecoilState(stateSetting);
  const subTab =
    setting.blessingBarnabaMemberTab || BarnabasMemberSubTab.COHORT;

  const setSettingHandler = useCallback(
    (tab: BarnabasMemberSubTab) => {
      setSetting({
        ...setting,
        blessingBarnabaMemberTab: tab,
      });
    },
    [setting, setSetting]
  );

  const tabs = [
    {index: 0, label: "바나바 기수", value: BarnabasMemberSubTab.COHORT},
    {index: 1, label: "바나바 활동 유무", value: BarnabasMemberSubTab.AGE},
    {
      index: 2,
      label: "바나바양육 연간기록",
      value: BarnabasMemberSubTab.YEARLY,
    },
    {
      index: 3,
      label: "바나바양육 전체기록",
      value: BarnabasMemberSubTab.HISTORY,
    },
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
      {subTab === BarnabasMemberSubTab.COHORT && <BarnabasCohorts />}
      {subTab === BarnabasMemberSubTab.AGE && <BarnabasActiveAge />}
      {subTab === BarnabasMemberSubTab.YEARLY && <BarnabasYearlyHistory />}
      {subTab === BarnabasMemberSubTab.HISTORY && <BarnabasHistory />}
    </div>
  );
};

export default BarnabaMemberManagement;
