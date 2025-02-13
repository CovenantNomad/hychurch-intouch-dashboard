import {Dispatch, SetStateAction} from "react";
import {cx} from "../../../utils/utils";

interface HorizontalTabsProps {
  tabs: {
    id: number;
    name: string;
    component: JSX.Element;
  }[];
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

const HorizontalTabs = ({
  tabs,
  currentTab,
  setCurrentTab,
}: HorizontalTabsProps) => {
  return (
    <div
      className={cx(
        "h-13 grid justify-center items-center p-1 bg-zinc-100 rounded-lg outline-none",
        `grid-cols-${tabs.length}`
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={cx(
            "px-10 py-2 rounded-lg text-sm",
            tab.id === currentTab
              ? "bg-white text-[#09090B]"
              : "bg-transparent text-gray-500"
          )}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default HorizontalTabs;
