import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
import { attendanceData, monthlyAverData } from '../../../../constants/mockStatics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WorshipStatisticsProps {}

const WorshipStatistics = ({}: WorshipStatisticsProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">예배 출석 통계</h2>
      <div className="py-4">
        <span className="underline underline-offset-2">기준일: 2023. 07. 02</span>
        <div className="grid grid-cols-1 gap-y-4 mt-2 lg:grid-cols-5 lg:gap-x-4">
          <div className="col-span-1 flex flex-col gap-y-3">
            <div className="flex justify-between py-5 px-3 rounded-md shadow-md bg-MUSTAD text-white">
              <span className="">1~4부예배</span>
              <span className="">12 명</span>
            </div>
            <div className="flex justify-between items-center py-5 px-3 rounded-md shadow-md bg-DARKGREEN text-white">
              <p>
                <span className="block">인터치예배</span>
                <span className="block text-sm">(셀원출석-온라인)</span>
              </p>
              <span className="">42 명</span>
            </div>
            <div className="flex justify-between items-center py-5 px-3 rounded-md shadow-md bg-DARKGREEN text-white">
              <p>
                <span className="block">인터치예배</span>
                <span className="block text-sm">(셀원출석-성전)</span>
              </p>
              <span className="">242 명</span>
            </div>
            <div className="flex justify-between items-center py-5 px-3 rounded-md shadow-md bg-INDIGO text-white">
              <p>
                <span className="block">인터치예배</span>
                <span className="block text-sm">(수기계수-성전총원)</span>
              </p>
              <span className="">302 명</span>
            </div>
          </div>
          <div className="col-span-3">
            <div className="py-5 px-3 bg-gray-50 rounded-md shadow-md">
              <div>
                <Chart 
                        type='bar' 
                        data={attendanceData} 
                        height={320}
                        options={{ 
                          maintainAspectRatio: false, 
                          plugins: {
                            legend: {
                              display: true
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
                </div>
                <div className="col-span-1">
                  <div className="py-5 px-3 bg-gray-50 rounded-md shadow-md">
                    <h3>월별 평균 출석인원</h3>
                    <div className="mt-4 max-h-[320px] overflow-y-scroll">
                      <Bar 
                        data={monthlyAverData} 
                        height={320}
                        options={{ 
                          indexAxis: 'y' as const,
                          plugins: {
                            legend: {
                              display: false
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: true,
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
                </div>
              </div>
            </div>
    </div>
  );
};

export default WorshipStatistics;
