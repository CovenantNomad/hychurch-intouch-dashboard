import React from 'react';
import { FaAngleDoubleRight, FaAngleDoubleLeft} from 'react-icons/fa';

interface TransferConfirmProps {}

const TransferConfirm = ({}: TransferConfirmProps) => {
  return (
    <div className='px-6 pt-8 py-32 bg-white'>
      <div className=''>
        <h3 className='text-[32px] font-poppins mb-1'>Transfer In</h3>
        <p className='text-base pb-6'>
          다른셀에서 우리셀로 이동 요청한 상태를 보여줍니다<br />
        </p>
        <div className='w-full h-[1px] bg-gray-600'></div>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='bg-white flex justify-between items-center py-6 px-8 rounded-lg shadow-md border'>
            <div className='flex items-center'>
              <FaAngleDoubleRight size={34}  className="mr-6" />
              <div>
                <h4 className='text-2xl font-bold cursor-pointer'>김바울</h4>
                <span className='inline-block text-gray-500 text-lg mt-1'>형제</span>
              </div>
            </div>
            <div className='flex flex-col justify-start'>
              <span className='inline-block text-gray-500 text-lg'>이동현황</span>
              <p className='text-lg mt-2'>
                <span>새가족셀</span>
                <span className='inline-block px-2'>→</span>
                <span>남정훈셀</span>
              </p>
            </div>
            <div className='flex flex-col justify-start'>
              <span className='inline-block text-gray-500 text-lg'>요청일</span>
              <p className='text-lg mt-2'>2022.11.20</p>
            </div>
            <div className='flex gap-3'>
              <button className='border border-blue-600 text-black px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white'>거절</button>
              <button className='border border-blue-600 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'>승인</button>
            </div>
          </div>

        </div>
      </div>
      <div className='mt-32'>
        <h3 className='text-[32px] font-poppins mb-1'>Transfer Out</h3>
        <p className='text-base pb-6'>
          우리셀에서 다른셀로 이동 요청한 상태를 보여줍니다<br />
          (요청상태) 거절 | 승인대기중 | 승인완료
        </p>
        <div className='w-full h-[1px] bg-gray-600'></div>
        <div className='mt-8 flex flex-col gap-6'>
          <div className='bg-white flex justify-between items-center py-6 px-8 rounded-lg shadow-md border'>
            <div className='flex items-center'>
              <FaAngleDoubleLeft size={34}  className="mr-6" />
              <div>
                <h4 className='text-2xl font-bold cursor-pointer'>정드보라</h4>
                <span className='inline-block text-gray-500 text-lg mt-1'>자매</span>
              </div>
            </div>
            <div className='flex flex-col justify-start'>
              <span className='inline-block text-gray-500 text-lg'>이동현황</span>
              <p className='text-lg mt-2'>
                <span>남정훈셀</span>
                <span className='inline-block px-2'>→</span>
                <span>조준원셀</span>
              </p>
            </div>
            <div className='flex flex-col justify-start'>
              <span className='inline-block text-gray-500 text-lg'>요청일</span>
              <p className='text-lg mt-2'>2022.11.20</p>
            </div>
            <div className='flex gap-3'>
              <div className='bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700'>승인대기 중</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirm;
