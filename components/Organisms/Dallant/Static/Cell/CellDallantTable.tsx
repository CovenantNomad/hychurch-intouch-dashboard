import React from 'react';
import { DallantCellStaticType } from '../../../../../interface/Dallants';

interface CellDallantTableProps {
  data: DallantCellStaticType[]
}

const CellDallantTable = ({ data }: CellDallantTableProps) => {
  return (
    <div>
      <table className='border divide-y divide-gray-30 mt-2'>
        <thead>
          <tr className='divide-x divide-y divide-gray-30'>
            <th className='px-5 py-3 text-left text-base font-medium uppercase tracking-wide text-gray-500'>셀이름</th>
            <th className='px-5 py-3 text-left text-base font-medium uppercase tracking-wide text-gray-500'>달란트 총액</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-30'>
          {data.sort((a, b) => a.totalAmount - b.totalAmount).reverse().map((cell, index) => (
            <tr key={index} className='divide-x'>
              <td className="whitespace-nowrap px-5 py-2 text-sm text-gray-500">{cell.cellName}</td>
              <td className="whitespace-nowrap px-5 py-2 text-sm text-gray-500">{cell.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CellDallantTable;
