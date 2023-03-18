import React, { Dispatch, SetStateAction } from "react";

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
    <div className="py-3 px-4 rounded-md bg-GRAY003">
      <nav className="flex justify-center items-center gap-x-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`relative ${
              tab.id === currentTab
                ? "bg-GRAY005 text-white font-medium"
                : "bg-GRAY002 text-GRAY005"
            }  min-w-0 overflow-hidden py-2 px-3 cursor-pointer focus:z-10`}
          >
            <span className="text-sm text-center uppercase">{tab.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalTabs;
