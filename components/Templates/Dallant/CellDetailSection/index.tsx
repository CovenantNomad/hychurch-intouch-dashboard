import React,  { useEffect, useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import { useRouter } from 'next/router';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import Link from 'next/link';
import useCellDallantDetail from '../../../../hooks/useCellDallantDetail';
import Spinner from '../../../Atoms/Spinner';
import { RoleType } from '../../../../graphql/generated';
import ReactToPrint from 'react-to-print';
import PrintModal from '../../../Blocks/Modals/PrintModal';

interface CellDetailSectionProps {}

const CellDetailSection = ({}: CellDetailSectionProps) => {
  const router = useRouter()
  const [ open, setOpen ] = useState(false)
  const [ cellId, setCellId ] = useState<string | null>(null)

  const { isDataLoading, cellDallants } = useCellDallantDetail(cellId)

  useEffect(() => {
    if (router.query.id) {
      if (typeof router.query.id === 'string'){
        setCellId(router.query.id)
      } else if (Array.isArray(router.query.id)) {
        setCellId(router.query.id[0])
      } else {
        setCellId(null)
      }
    }
  }, [])
  
  return (
    <>
      <BlockContainer firstBlock>
        {isDataLoading ? (
          <Spinner />
        ) : (
          <div>
            {cellDallants ? (
              <div className='flex justify-between items-center'>
                <div>
                  <h5 className="text-2xl font-medium">{cellDallants.name}</h5>
                  <p className="text-sm text-GRAY004">{cellDallants.community} 공동체</p>
                </div>
                <div>
                  <button onClick={() => setOpen(!open)}>
                    <p className='bg-blue-600 px-4 py-2 rounded-lg text-white cursor-pointer'>출력 페이지</p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-2xl font-medium">셀</h5>
                <p className="text-sm text-GRAY004">공동체</p>
              </div>
            )}
          </div>
        )}
      </BlockContainer>
      <BlockContainer>
        {isDataLoading ? (
          <Spinner />
        ) : (
          <div>
            {cellDallants ? (
              <div className='text-center'>
                <h2 className='text-lg font-medium text-gray-900'>{cellDallants.name} 달란트 총액</h2>
                <p className='text-5xl font-bold text-gray-900 py-3'>{Number(cellDallants.totalAmount || 0).toLocaleString('kr-KR')} D</p>
              </div>
            ) : (
              <EmptyStateSimple />
            )}
          </div>
        )}
      </BlockContainer>
      <BlockContainer>
        {isDataLoading ? (
            <Spinner />
          ) : (
            <div>
              {cellDallants ? (
                <div className="grid grid-cols-4 gap-6">
                  {cellDallants.members.filter(member => member.roles.includes(RoleType.CellLeader)).map(member => (
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
                            pathname: `/dallant/${cellId}/members/${member.id}`,
                            query: { userId: member.id, userName: member.name, cellId: member.cell?.id, cellName: member.cell?.name  },
                          }}
                          as={`/dallant/${cellId}/members/${member.id}`}
                        >
                          <p className='w-fit rounded-full px-2 py-1 bg-[#FEEB03] border border-yellow-400 cursor-pointer'>상세보기</p>
                        </Link>
                      </div> 
                    </div> 
                  ))}
                  {cellDallants.members.filter(member => !member.roles.includes(RoleType.CellLeader)).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)).map(member => (
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
                            pathname: `/dallant/${cellId}/members/${member.id}`,
                            query: { userId: member.id, userName: member.name },
                          }}
                          as={`/dallant/${cellId}/members/${member.id}`}
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
          <PrintModal open={open} setOpen={setOpen} cellDallants={cellDallants}/>
      </BlockContainer>
    </>
  );
};

export default CellDetailSection;
