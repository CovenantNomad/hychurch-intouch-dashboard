import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

interface CellCardProps {
  id: string
  name: string
  leader: string
  totalCountOfMembers: number
  countOfActiveMembers: number
}

const CellCard = ({ id, name, leader, totalCountOfMembers, countOfActiveMembers }: CellCardProps) => {
  return (
    <motion.div 
      whileHover={{ borderTopColor: '#005BD7' }}
      className='bg-white rounded-lg shadow-lg px-4 pt-6 pb-3 border-t-8'
    >
      <div className='mb-4'>
        <h5 className='text-xl font-bold'>{name}</h5>
        <span className='text-sm text-gray-500'>리더 : {leader}</span>
      </div>
      <div>
        <span className='text-gray-500'>셀원현황</span>
        <div className='border border-gray-300 bg-gray-50 flex justify-around py-2 mt-2'>
          <div className='border-l-2 border-l-gray-500 pl-2'>
            <span className='block text-sm text-gray-500 font-semibold'>TOTAL</span>
            <span className='block text-lg font-bold'>{totalCountOfMembers}</span>
          </div>
          <div className='border-l-2 border-l-navy-blue pl-2'>
            <span className='block text-sm text-gray-500 font-semibold'>ACTIVE</span>
            <span className='block text-lg font-bold'>{countOfActiveMembers}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-6 pt-3 border-t border-t-gray-300'>
        <Link href={`/organizations/${id}`}>
          <a>
            <span className='font-bold text-sm text-gray-500 hover:text-navy-blue'>자세히보기</span>
          </a>
        </Link>
        
      </div>
    </motion.div>
  )
}

export default CellCard