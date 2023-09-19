import React from 'react';
import Link from 'next/link';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { CombinedCellDallantType } from '../../../../interface/Dallants';
import { RoleType } from '../../../../graphql/generated';

interface CellDallantDetailMembersProps {
  isLoading: boolean;
  cellDallant: CombinedCellDallantType | null | undefined
}

const CellDallantDetailMembers = ({ isLoading, cellDallant }: CellDallantDetailMembersProps) => {
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
          {cellDallant ? (
            <div className="grid grid-cols-4 gap-6">
              {cellDallant.members.filter(member => member.roles.includes(RoleType.CellLeader)).map(member => (
                <div key={member.id} className='rounded-lg overflow-hidden'>
                  <div className='px-6 py-6 bg-[#FFEB03]'>
                    <div>
                      <p className='text-lg font-medium'>{member.name}</p>
                    </div>
                    <div className='flex justify-end pt-8 pb-1'>
                      <p className='text-3xl'>{member.totalAmount.toLocaleString('kr-KR')} D</p>
                    </div>
                  </div>
                  <div className='flex justify-end px-6 py-3 bg-[#FFE202]'>
                    <Link
                      href={{
                        pathname: `/dallant/${member.cell?.id}/members/${member.id}`,
                        query: { userId: member.id, userName: member.name, cellId: member.cell?.id, cellName: member.cell?.name  },
                      }}
                      as={`/dallant/${member.cell?.id}/members/${member.id}`}
                    >
                      <p className='w-fit rounded-full px-2 py-1 bg-[#FEEB03] border border-yellow-400 cursor-pointer'>상세보기</p>
                    </Link>
                  </div> 
                </div> 
              ))}
              {cellDallant.members.filter(member => !member.roles.includes(RoleType.CellLeader)).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)).map(member => (
                <div key={member.id} className='rounded-lg overflow-hidden'>
                  <div className='px-6 py-6 bg-[#606C38]/90'>
                    <div>
                      <p className='text-lg font-medium text-white'>{member.name}</p>
                    </div>
                    <div className='flex justify-end pt-8 pb-1'>
                      <p className='text-3xl text-white'>{member.totalAmount.toLocaleString('kr-KR')} D</p>
                    </div>
                  </div>
                  <div className='flex justify-end px-6 py-3 bg-[#606C38]'>
                    <Link
                      href={{
                        pathname: `/dallant/${member.cell?.id}/members/${member.id}`,
                        query: { userId: member.id, userName: member.name, cellId: member.cell?.id, cellName: member.cell?.name },
                      }}
                      as={`/dallant/${member.cell?.id}/members/${member.id}`}
                    >
                      <p className='w-fit rounded-full px-2 py-1 border border-white text-white text-sm cursor-pointer'>상세보기</p>
                    </Link>
                  </div> 
                </div> 
              ))}
            </div>
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      )}
    </>
  );
};

export default CellDallantDetailMembers;
