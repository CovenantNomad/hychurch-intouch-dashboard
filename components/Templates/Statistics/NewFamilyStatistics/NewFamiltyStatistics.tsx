import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { monthlyRegisterData, weeklyRegisterData } from '../../../../constants/mockStatics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NewFamiltyStatisticsProps {}

const NewFamiltyStatistics = ({}: NewFamiltyStatisticsProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">새가족 등록 통계</h2>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-x-4 mt-4">
        <div className="flex flex-col py-5 px-4 bg-gray-50 rounded-md shadow-md">
          <h3>이번주 등록 청년</h3>
          <div className="relative flex flex-1 justify-center items-center mt-4">
            <span className="absolute top-0 right-0">2023. 07. 02</span>
            <div className="rounded-full ring-8 ring-DARKGREEN p-6">
              <span className="text-2xl">6명</span>
            </div>
          </div>
        </div>
        <div className="py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>주간별 등록 추이</h3>
          <div className="mt-4">
            <Bar 
              data={weeklyRegisterData} 
              height={150}
              options={{ 
                maintainAspectRatio: false, 
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    },
                    beginAtZero: true,
                  },
                }
              }} 
            />
          </div>
        </div>
        <div className="py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>월간 통계</h3>
          <div className="mt-4">
            <Bar 
              data={monthlyRegisterData} 
              height={150}
              options={{ 
                maintainAspectRatio: false, 
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  },
                }
              }} 
            />
          </div>
        </div>
        <div className="flex flex-col py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>올해 등록 청년</h3>
          <div className="flex flex-col flex-1 items-center justify-center mt-4">
            <span className="text-4xl mb-1">165명</span>
            <span className="text-sm">(기준일: 23.07.02)</span>
          </div>
        </div>
        <div className="flex flex-col py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>블레싱 전환률</h3>
          <div className="flex flex-col flex-1 justify-center mt-4">
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">새가족 등록 인원</span>
              <span className="text-gray-500">165 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">블레싱 편성 인원</span>
              <span className="text-gray-500">132 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">전환비율</span>
              <span className="text-gray-500">87%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>셀편성 전환률</h3>
          <div className="flex flex-col flex-1 justify-center mt-4">
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">새가족 등록 인원</span>
              <span className="text-gray-500">165 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">셀 편성 인원</span>
              <span className="text-gray-500">112 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">전환비율</span>
              <span className="text-gray-500">67%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-5 px-3 bg-gray-50 rounded-md shadow-md">
          <h3>셀정착률</h3>
          <div className="flex flex-col flex-1 justify-center mt-4">
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">새가족 등록 인원</span>
              <span className="text-gray-500">165 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">셀 활동 인원</span>
              <span className="text-gray-500">102 명</span>
            </div>
            <div className="flex justify-between py-2 border-b border-b-gray-300">
              <span className="text-gray-500">전환비율</span>
              <span className="text-blue-500">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFamiltyStatistics;
