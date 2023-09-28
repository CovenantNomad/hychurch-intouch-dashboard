import React, { useState } from 'react';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface UserDallantHeaderProps {
  userName: string;
  cellName: string;
  isLoading: boolean;
  isFetching: boolean;
  userNameByServer: string | null | undefined;
  cellNameByServer: string | null | undefined;
  goBack: () => void
}

const UserDallantHeader = ({ isLoading, isFetching, userName, cellName, userNameByServer, cellNameByServer, goBack }: UserDallantHeaderProps) => {
  const [ open, setOpen ] = useState(false)

  if (userName !== 'undefined' && cellName !== 'undefined') {
    return (
      <div>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <button onClick={goBack}>
              <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
          <div className='flex-1 flex justify-center'>
            <span className="text-lg font-medium">{userName}'s 달란트통장</span>
          </div>
          <div className='relative flex-1 flex justify-end'>
            <button
              onClick={() => setOpen(!open)}
            >
              <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
            </button>
            <div className={`${open ? 'block' : 'hidden' } absolute top-6`}>
              <p className="text-sm py-2 px-4 bg-gray-300 text-gray-700 rounded-lg">
                {cellName}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && isFetching ? (
        <div className="animate-pulse flex items-center justify-between gap-x-4 rounded-xl py-3">
          <div className="h-1.5 w-1/12 bg-slate-200 rounded justify-items-end"></div>
          <div className="h-1.5 w-1/12 bg-slate-200 rounded justify-items-end"></div>
          <div className="h-1.5 w-1/12 bg-slate-200 rounded"></div>
        </div>
      ) : (
        <div>
          {userNameByServer && cellNameByServer ? (
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <button onClick={goBack}>
                  <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
                </button>
              </div>
              <div className='flex-1 flex justify-center'>
                <span className="text-lg font-medium">{userNameByServer}'s 달란트통장</span>
              </div>
              <div className='relative flex-1 flex justify-end'>
                <button
                  onClick={() => setOpen(!open)}
                >
                  <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
                </button>
                <div className={`${open ? 'block' : 'hidden'} absolute top-6`}>
                  <p className="text-sm py-2 px-4 bg-gray-300 text-gray-700 rounded-lg">
                    {cellNameByServer}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <button onClick={goBack}>
                  <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
                </button>
              </div>
              <div className='flex-1 flex justify-center'>
                <span className="text-lg font-medium">달란트통장</span>
              </div>
              <div className='relative flex-1 flex justify-end'>
                <button disabled>
                  <InformationCircleIcon className="h-6 w-6 cursor-not-allowed" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDallantHeader;
