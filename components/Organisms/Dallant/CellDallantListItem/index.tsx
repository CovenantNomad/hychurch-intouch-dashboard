import React from 'react';
import Link from 'next/link';
import { CellDallantMemberType } from '../../../../interface/Dallants';

interface CellDallantListItemProps {
  cellId: string;
  cellName: string;
  totalAmount: number;
  participants: number;
}

const CellDallantListItem = ({ cellId, cellName, participants, totalAmount }: CellDallantListItemProps) => {
  return (
    <Link 
      href={{
        pathname: `/dallant/${cellId}`,
        query: { cellName, cellId },
      }}
      as={`/dallant/${cellId}`}
    >
      <div className='rounded-xl border border-gray-200 overflow-hidden cursor-pointer'>
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-100 p-6">
          <h4 className='text-lg font-medium leading-6 text-gray-900'>{cellName}</h4>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-gray-50">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">참여셀원</dt>
            <dd className="text-gray-700">
              <p>{participants}명 참여 중</p>
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

export default CellDallantListItem;
