import React from 'react';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { DallantMemberType } from '../../../../interface/Dallants';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCellMember } from '../../../../firebase/Dallant/Dallant';

interface CellDallantTransferMemberProps {
  isLoading: boolean;
  cellId: string;
  transferMember: DallantMemberType[] | null | undefined
}

const CellDallantTransferMember = ({ isLoading, cellId, transferMember}: CellDallantTransferMemberProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(deleteCellMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCellsDallents'])
      queryClient.invalidateQueries(['getCellDallentDetail'])
    }
  })

  return (
    <>
      {isLoading ? (
        <div className='grid grid-cols-4 gap-4 mt-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
              <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
              <div className='flex flex-col items-end space-y-6'>
                <div className="h-2 w-1/3 bg-slate-200 rounded" />
                <div className="h-2 w-1/6 bg-slate-200 rounded"></div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div>
          {transferMember ? (
            <>
              <h4 className='text-lg font-medium mb-4'>셀 이동이 된 셀원</h4>
              <div className="grid grid-cols-4 gap-6">
                {transferMember.sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map(member => (
                  <div key={member.userId} className='rounded-lg overflow-hidden'>
                    <div className='px-6 py-6 bg-[#606C38]/90'>
                      <div>
                        <p className='text-lg font-medium text-white'>{member.userName}</p>
                      </div>
                      <div className='flex justify-end pt-8 pb-1'>
                        <p className='text-3xl text-white'>{member.totalAmount.toLocaleString('kr-KR')} D</p>
                      </div>
                    </div>
                    <div className='flex justify-end px-6 py-3 bg-[#606C38]'>
                      <button
                        onClick={() => mutateAsync({cellId, userId: member.userId})}
                      >
                        <p className='w-fit rounded-full px-2 py-1 border border-white text-white text-sm cursor-pointer'>제외하기</p>
                      </button>
                    </div> 
                  </div> 
                ))}
              </div>
            </>
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      )}
    </>
  );
};

export default CellDallantTransferMember;
