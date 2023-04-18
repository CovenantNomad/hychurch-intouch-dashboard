import React, { Dispatch, SetStateAction } from "react";
import Avatar, { AvatarSize } from "../Avatar";

interface TabsWithHeaderProps {
  title: string;
  subtitle?: string;
  hasAvatar?: boolean;
  hasButtonGroup?: boolean;
  tabs: {
    id: number;
    name: string;
    component: JSX.Element;
  }[];
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  setSettingHandler: (id: number) => void;
  onActionHandler?: () => void;
}

const TabsWithHeader = ({
  title,
  subtitle,
  tabs,
  hasAvatar,
  hasButtonGroup,
  currentTab,
  setCurrentTab,
  setSettingHandler,
  onActionHandler,
}: TabsWithHeaderProps) => {
  return (
    <div className="px-2 pt-2">
      {/* Mobile */}
      <div className="py-5 px-4 bg-white sm:hidden">
        <h5 className="text-xl mb-3">{title}</h5>
        <div className="border p-3 sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 uppercase"
            defaultValue={tabs[currentTab].name}
            onChange={(e) => {
              setCurrentTab(Number(e.target.value));
              setSettingHandler(Number(e.target.value));
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden pt-5 px-4 rounded-md bg-white sm:block">
        <div className="flex justify-between">
          <div className="flex items-center">
            {hasAvatar && <Avatar name={title} size={AvatarSize.md} rounded />}
            <div className={`${hasAvatar ? "ml-4" : "ml-0"}`}>
              <h5 className="text-2xl">{title}</h5>
              {subtitle && <p className="text-sm text-GRAY004">{subtitle}</p>}
            </div>
          </div>
          {hasButtonGroup && (
            <div>
              <button className="border py-2 px-3" onClick={onActionHandler}>
                <span className="text-sm text-GRAY005">셀삭제</span>
              </button>
            </div>
          )}
        </div>
        <nav className="flex mt-5">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                setSettingHandler(tab.id);
              }}
              className={`relative ${
                tab.id === currentTab
                  ? "bg-GRAY005 text-white font-medium"
                  : "bg-GRAY003 text-GRAY005"
              }  min-w-0 overflow-hidden py-3 px-4 mr-2 cursor-pointer`}
            >
              <span className="text-sm text-center uppercase">{tab.name}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabsWithHeader;
