import React from "react";
import { SetterOrUpdater } from "recoil";
import { classNames } from "../../../utils/utils";

interface UnderlineTabsProps {
  tabs: {
    id: number;
    name: string;
  }[];
  currentTab: string;
  setCurrentTab: SetterOrUpdater<string>;
}

const UnderlineBoxTabs = ({
  tabs,
  currentTab,
  setCurrentTab,
}: UnderlineTabsProps) => {
  return (
    <div>
      <div className="border p-3 sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          defaultValue={currentTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <div
              key={tab.name}
              onClick={() => setCurrentTab(tab.name)}
              className={classNames(
                tab.name === currentTab
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.name === currentTab ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.name === currentTab ? "bg-blue-600" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UnderlineBoxTabs;
