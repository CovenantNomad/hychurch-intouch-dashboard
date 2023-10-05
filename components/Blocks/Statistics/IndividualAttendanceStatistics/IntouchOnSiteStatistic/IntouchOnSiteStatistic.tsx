import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IntouchOnSiteStatisticProps {
  numberOfOnSite: number
}

const IntouchOnSiteStatistic = ({numberOfOnSite}: IntouchOnSiteStatisticProps) => {
  const percentage = numberOfOnSite / 4 * 100

  const data = {
    labels: ['성전', '온라인'],
    datasets: [
      {
        label: '# of onSite',
        data: [numberOfOnSite, (4 - numberOfOnSite)],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // const segments = [
  //   { value: numberOfOnSite },
  //   { value: 4 - numberOfOnSite },
  // ];

  const segments = [
    { value: numberOfOnSite, color: 'bg-blue-500' },
    { value: 4 - numberOfOnSite, color: 'bg-red-500' },
  ];

  console.log(segments)

  // const totalValue = 4;

  const totalValue = segments.reduce((total, segment) => total + segment.value, 0);

  let startAngle = 0;

  console.log(totalValue)

  return (
    <div className='p-4 border rounded-lg'>
      <p className='text-center'>인터치예배 성전참석 비율</p>
      <div className='pt-4'>
        <div className='w-24 h-24 flex justify-center items-center mx-auto bg-blue-600 rounded-full'>
          <span className="text-white text-xl font-bold">
            {`${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntouchOnSiteStatistic;
