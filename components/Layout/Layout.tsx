import React from 'react';
import Navbar from '../Blocks/Navbar/Navbar';
import Sidebar from '../Blocks/Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps) {

  return (
    <div className="overflow-y-auto h-screen">
      <Sidebar />
      <Navbar />
      <main className='bg-neutral-50 md:ml-60 px-8 py-12'>
        {children}
      </main>
    </div>
  )
}