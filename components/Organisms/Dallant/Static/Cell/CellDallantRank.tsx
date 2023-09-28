import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DallantCellStaticType } from '../../../../../interface/Dallants';
import CellDallantTable from './CellDallantTable';
import EmptyStateSimple from '../../../../Atoms/EmptyStates/EmptyStateSimple';

interface CellScatterProps {
  isLoading: boolean;
  isFetching: boolean;
  data: DallantCellStaticType[] | null | undefined
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CellDallantRank = ({ isLoading, isFetching, data }: CellScatterProps) => {
  
  const barData = {
    labels: data?.sort((a, b) => a.totalAmount - b.totalAmount).reverse().map((cell) => cell.cellName), // x 축 라벨: cellName
    datasets: [
      {
        label: '달란트 총액', // 데이터셋 레이블
        data: data?.map((cell) => cell.totalAmount), // 데이터셋의 값: totalAmount
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }


  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className='px-5 pt-5 pb-5 border border-[#dcdee0] rounded-xl'>
      {isLoading && isFetching ? (
        <div className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
          <div className="h-2 w-1/6 bg-slate-200 rounded justify-items-end"></div>
          <div className="h-1.5 w-1/12 bg-slate-200 rounded"></div>
        </div>
      ) : (
        <>
          <h2 className='text-lg font-medium'>셀 달란트 총액 순위</h2>
          {data ? (
            <div className='grid grid-cols-3 gap-x-4'>
              <div className='col-span-2'>
                <Bar options={options} data={barData} />
              </div>
              <div className='col-span-1'>
                <CellDallantTable data={data} />
              </div>
            </div>
          ) : (
            <div>
              <EmptyStateSimple />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CellDallantRank;
