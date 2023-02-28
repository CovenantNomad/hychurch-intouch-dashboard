import React, { Dispatch, SetStateAction } from "react";
import Avatar, { AvatarSize } from "../Avatar";

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
    <div className="py-2 px-4 rounded-md bg-GRAY003">
      <nav className="flex justify-center items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`relative ${
              tab.id === currentTab
                ? "bg-GRAY005 text-white font-medium"
                : "bg-GRAY002 text-GRAY005"
            }  min-w-0 overflow-hidden py-1 px-2 mr-2 focus:z-10`}
          >
            <span className="text-sm text-center uppercase">{tab.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalTabs;
