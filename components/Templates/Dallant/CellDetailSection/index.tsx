import React,  { Fragment } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { dallantState } from '../../../../stores/dallantState';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

interface CellDetailSectionProps {}

const CellDetailSection = ({}: CellDetailSectionProps) => {
  const router = useRouter()
  const cellDallants = useRecoilValue(dallantState)

  const selectedCell = cellDallants?.filter(cell => cell.id === router.query.id)[0]

  console.log(selectedCell)
  
  return (
    <>
      <BlockContainer firstBlock>
        {selectedCell ? (
          <div>
            <div>
              <h5 className="text-2xl font-medium">{selectedCell.name}</h5>
              <p className="text-sm text-GRAY004">{selectedCell.community} 공동체</p>
            </div>
            <div>
              {/* {selectedCell.members} */}
            </div>
          </div>
        ) : (
          <div>
            <h5 className="text-2xl font-medium">셀</h5>
            <p className="text-sm text-GRAY004">공동체</p>
          </div>
        )}
      </BlockContainer>
      <BlockContainer>
        {selectedCell ? (
          <div className='text-center'>
            <h2 className='text-lg font-medium text-gray-900'>{selectedCell.name} 달란트 총액</h2>
            <p className='text-5xl font-bold text-gray-900 py-3'>{Number(selectedCell.totalAmount || 0).toLocaleString('kr-KR')} D</p>
          </div>
        ) : (
          <EmptyStateSimple />
        )}
      </BlockContainer>
      <BlockContainer>
        {selectedCell ? (
          <div className="mt-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
              <table className="w-full text-left border border-gray-200">
                <thead className="text-sm leading-6 border-b border-gray-200 bg-gray-100">
                  <tr>
                    <th scope="col" className="py-3 pl-8 font-semibold">
                      셀원
                    </th>
                    <th scope="col" className="py-3 pl-8 font-semibold">
                      금액
                    </th>
                    <th scope="col" className="sr-only py-3 pr-8 text-right font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCell.members.map((member) => (
                    <tr key={member.id} className='border-b border-gray-100 last:border-b-0'>
                      <td className="py-5 pl-8">
                        <div className="text-sm leading-6 text-gray-900">{member.name}</div>
                      </td>
                      <td className="relative py-5 pl-8">
                        <div className="flex gap-x-6">
                          <div className="flex-auto">
                            <div className="flex items-start gap-x-3">
                              <div className="text-sm font-medium leading-6 text-gray-900">{member.totalAmount} 달란트</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 pr-8 text-right">
                        <div className="flex justify-end">
                          <Link
                            href={{
                              pathname: `/dallant/${router.query.id}/members/${member.id}`,
                              query: { userId: member.id, userName: member.name },
                            }}
                            as={`/dallant/${router.query.id}/members/${member.id}`}
                          >
                            <div className='text-sm font-medium leading-6 text-blue-600 hover:text-blue-500'>
                              View Details
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyStateSimple />
        )}
      </BlockContainer>
    </>
  );
};

export default CellDetailSection;
