import React from 'react';
import Link from 'next/link';


interface OthersDallantListProps {
  cellId: string;
  cellName: string;
  userId: string;
  userName: string;
  totalAmount: number;
}

const OthersDallantList = ({ cellId, cellName, userId, userName, totalAmount }: OthersDallantListProps) => {
  
  return (
    <Link 
      href={{
        pathname: `/dallant/${cellId}/members/${userId}`,
        query: { cellName, cellId, userId, userName, totalAmount },
      }}
      as={`/dallant/${cellId}/members/${userId}`}
    >
      <div className='rounded-xl border border-gray-200 overflow-hidden cursor-pointer'>
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-100 p-6">
          <h4 className='text-lg font-medium leading-6 text-gray-900'>{userName}</h4>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-gray-50">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">소속셀</dt>
            <dd className="text-gray-700">
              <p>{cellName}</p>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">총 금액</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">{Number(totalAmount).toLocaleString('ko-KR')} D</div>
            </dd>
          </div>
        </dl>
      </div>
    </Link>  
  );
};

export default OthersDallantList;
