import React from 'react';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface DallantStaticHeaderProps {}

const DallantStaticHeader = ({}: DallantStaticHeaderProps) => {
  const router = useRouter()

  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <button onClick={router.back}>
              <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
          <div className='flex-1 flex justify-center'>
            <span className="text-lg font-medium">달란트 통계 현황판</span>
          </div>
          <div className='relative flex-1 flex justify-end'>
            <button
              onClick={() => toast.success("데코예요!")}
            >
              <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default DallantStaticHeader;
