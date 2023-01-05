import React, { Dispatch, SetStateAction } from 'react';

interface FullWidthTabsProps {
  tabs: {
    id: number, 
    name: string, 
    component: JSX.Element
  }[]
  currentTab: number
  setCurrentTab: Dispatch<SetStateAction<number>>
}

const FullWidthTabs = ({ tabs, currentTab, setCurrentTab }: FullWidthTabsProps) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md py-3 px-2 bg-gray-100 border-slate-300 focus:border-blue-500 focus:ring-blue-500 uppercase"
          defaultValue={tabs[currentTab].name}
          onChange={(e) => setCurrentTab(Number(e.target.value))}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className='flex divide-x divide-gray-200 rounded-lg shadow'>
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)} 
              className='group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
            >
              <span className='text-lg uppercase'>{tab.name}</span>
              <span className={`${tab.id === currentTab ? 'bg-blue-600': 'bg-transparent'} absolute inset-x-0 bottom-0 h-0.5`}/>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default FullWidthTabs;
