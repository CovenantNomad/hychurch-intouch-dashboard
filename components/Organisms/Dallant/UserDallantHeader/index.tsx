import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

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

  if (userName !== 'undefined' && cellName !== 'undefined') {
    return (
      <div>
        <div className='flex items-center gap-x-4'>
          <h2 
            onClick={goBack}
            className="text-2xl font-medium cursor-pointer hover:underline"
          >
            {cellName}
          </h2>
          <ChevronRightIcon
            className="h-7 w-7 cursor-pointer"
          />
          <p className="text-2xl font-medium">{userName}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && isFetching ? (
        <div className="animate-pulse flex items-center gap-x-4 rounded-xl">
          <div className="h-1.5 w-1/12 bg-slate-200 rounded justify-items-end"></div>
          <ChevronRightIcon
            className="animate-none h-7 w-7 cursor-pointer"
          />
          <div className="h-1.5 w-1/12 bg-slate-200 rounded"></div>
        </div>
      ) : (
        <div>
          {userNameByServer && cellNameByServer ? (
            <div>
              <div className='flex items-center gap-x-4'>
                <h2 
                  onClick={goBack}
                  className="text-2xl font-medium cursor-pointer hover:underline"
                >
                  {cellNameByServer}
                </h2>
                <ChevronRightIcon
                  className="h-7 w-7 cursor-pointer"
                />
                <p className="text-2xl font-medium">{userNameByServer}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className='flex items-center gap-x-4'>
                <h2 
                  onClick={goBack}
                  className="text-2xl font-medium cursor-pointer hover:underline"
                >
                  셀이름
                </h2>
                <ChevronRightIcon
                  className="h-7 w-7 cursor-pointer"
                />
                <p className="text-2xl font-medium">청년이름</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserDallantHeader;
