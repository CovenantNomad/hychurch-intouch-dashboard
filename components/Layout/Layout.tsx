import Image from 'next/image';
import React from 'react';
import Sidebar from '../Blocks/Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps) {

  return (
    <div className="overflow-y-auto h-screen">
      <Sidebar />
      <header className='flex justify-between items-center py-4 px-8 bg-white border-b border-b-gray-100 md:ml-24'>
        <div>
          <h1 className='text-2xl font-extrabold'>INTOUCH CHURCH</h1>
          <span className='block text-gray-500 text-sm'>
            {new Date().toLocaleDateString('kr-KR', { year: 'numeric', month: "2-digit", day: '2-digit', weekday: 'short'})}
          </span>
        </div>
        <div className='flex space-x-4 bg-gray-50 border border-gray-100 rounded-md py-2 px-4'>
          <div className='w-10 h-10 rounded-full bg-yellow-300'></div>
          <div className=''>
            <span className='block'>백선경</span>
            <span className='block text-xs text-gray-500'>관리자</span>
          </div>
        </div>
      </header>
      <main className='bg-gray-50 md:ml-24 px-8 py-12'>
        {children}
      </main>
    </div>
  )
}