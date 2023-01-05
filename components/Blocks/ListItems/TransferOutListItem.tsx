import React from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { UserCellTransferStatus } from '../../../graphql/generated';
import { transferedUser } from '../../../interface/cell';

interface TransferOutListItemProps {
  data: transferedUser
}

const TransferOutListItem = ({ data }: TransferOutListItemProps) => {

  const transformStatus = (state: UserCellTransferStatus) => {
    switch (state) {
      case UserCellTransferStatus.Ordered:
        return "승인대기 중"
        break;

      case UserCellTransferStatus.Canceled:
        return "거절"
        break;

      case UserCellTransferStatus.Confirmed:
        return "승인완료"
        break;
    
      default:
        break;
    }
  }

  return (
    <div className='bg-white flex justify-between items-center py-6 px-8 rounded-lg shadow-md border'>
      <div className='flex items-center'>
        <FaAngleDoubleLeft size={34}  className="mr-6" />
        <div>
          <h4 className='text-2xl font-bold cursor-pointer'>{data.user.name}</h4>
          <span className='inline-block text-gray-500 text-lg mt-1'>{data.user.gender === "MAN" ? "형제" : "자매"}</span>
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <span className='inline-block text-gray-500 text-lg'>이동현황</span>
        <p className='text-lg mt-2'>
          <span>{data.fromCell.name}</span>
          <span className='inline-block px-2'>→</span>
          <span>{data.toCell.name}</span>
        </p>
      </div>
      <div className='flex flex-col justify-start'>
        <span className='inline-block text-gray-500 text-lg'>요청일</span>
        <p className='text-lg mt-2'>{data.orderDate}</p>
      </div>
      <div className='flex gap-3'>
        <div 
          className={`
            ${data.status === UserCellTransferStatus.Ordered ? 'bg-yellow-600' : data.status === UserCellTransferStatus.Confirmed ? 'bg-blue-600' : 'bg-red-600'} 
            ${data.status === UserCellTransferStatus.Ordered ? 'hover:bg-yellow-700' : data.status === UserCellTransferStatus.Confirmed ? 'hover:bg-blue-700' : 'hover:bg-red-700'} 
            text-white px-6 py-2 rounded-md 
          `}
        >
          {transformStatus(data.status)}
        </div>
      </div>
    </div>
  );
};

export default TransferOutListItem;
