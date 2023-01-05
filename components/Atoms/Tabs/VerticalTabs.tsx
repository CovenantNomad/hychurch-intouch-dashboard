import React, { Dispatch, SetStateAction } from 'react';

interface VerticalTabsProps {
  tabs: {
    id: number, 
    name: string, 
    component: JSX.Element
  }[]
  setCurrentTab: Dispatch<SetStateAction<number>>
}

const VerticalTabs = ({ tabs, setCurrentTab }: VerticalTabsProps) => {
  return (
    <div className='grid grid-cols-3 xl:block gap-x-2'>
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className='shadow-sm border border-[#e5e5e5] py-3 px-6 xl:mt-4 bg-white cursor-pointer hover:bg-blue-100'
          onClick={() => setCurrentTab(tab.id)}
        >
          <span className='inline-block text-sm xl:text-lg'>{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

export default VerticalTabs;
