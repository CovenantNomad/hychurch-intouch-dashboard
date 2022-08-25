import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import graphlqlRequestClient from '../../client/graphqlRequestClient';
import { INTOUCH_DASHBOARD_USER } from '../../constants/constant';
import { userState } from '../../stores/authState';
import Sidebar from '../Blocks/Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps) {
  const [ { username }, setUser ] = useRecoilState(userState)
  const [ isOpen, setIsOpen ] = useState(false)
  const router = useRouter()

  const onToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const onLogOutHandler = () => {
    localStorage.removeItem(INTOUCH_DASHBOARD_USER)
    graphlqlRequestClient.setHeader("authorization", "")
    setUser({
      username: "",
      accessToken: "",
      isLoggedIn: false
    })
    router.push("/")
  }
  

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
        <div className={`relative flex items-center space-x-4 bg-gray-50 border border-gray-100 py-2 px-4 ${isOpen ? "rounded-tl-md rounded-tr-md ": "rounded-md"}`}>
          <div className=''>
            <span className='block'>{username}</span>
            {/* <span className='block text-xs text-gray-500'>관리자</span> */}
          </div>
          <button
            onClick={onToggleOpen}
            className='w-10 h-10 rounded-full bg-yellow-300 flex justify-center items-center'
          >
            <span className='text-sm text-white'>메뉴</span>
          </button>
          {isOpen && (
            <div className='absolute -bottom-10 right-0 w-full py-2 px-4 bg-navy-blue rounded-br-md rounded-bl-md'>
              <button 
                onClick={onLogOutHandler}
                className="w-full text-white"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </header>
      <main className='bg-gray-50 md:ml-24 px-8 py-12'>
        {children}
      </main>
    </div>
  )
}