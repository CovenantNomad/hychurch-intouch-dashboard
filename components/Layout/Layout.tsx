import React from 'react';
import Navbar from '../Blocks/Navbar/Navbar';
import Sidebar from '../Blocks/Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps) {

  return (
    <div className='bg-neutral-50 h-screen'>
      <Sidebar />
      <Navbar />
      <main className='md:ml-60 px-4 md:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  )
}