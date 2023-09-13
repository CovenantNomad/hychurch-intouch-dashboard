import React, { Dispatch, SetStateAction } from 'react';

interface UnderlineTabsProps {
  tabs: {
    id: number;
    name: string;
  }[];
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

const UnderlineTabs = ({ tabs, currentTab, setCurrentTab }: UnderlineTabsProps) => {
  return (
    <nav className="flex justify-center">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => {
            setCurrentTab(tab.name);
          }}
          className={`relative ${
            tab.name === currentTab
              ? "text-blue-500 font-medium border-b-blue-500 border-b-2"
              : "text-GRAY005"
          }  min-w-0 overflow-hidden py-3 px-4 mx-4 cursor-pointer`}
        >
          <span className="text-lg text-center uppercase">{tab.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default UnderlineTabs;
