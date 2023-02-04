import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface GenderStaticProps {
  maleMembers: number
  femaleMembers: number
}

const GenderStatic = ({ maleMembers, femaleMembers }: GenderStaticProps) => {

  const labels = ['형제', '자매']
  const backgroundColor = [
    'rgb(54, 162, 235)',
    'rgb(255, 99, 132)',
  ]

  const data = {
    labels,
    datasets: [
      {
        data: [maleMembers, femaleMembers],
        backgroundColor,
        hoverOffset: 4
      },
    ],
  };

  return (
    <div className='bg-white rounded-md py-1'>
      <Doughnut
        data={data} 
        width={215}
        height={150}
        options={{ 
          // responsive: true, 
          maintainAspectRatio: false, 
          plugins: {
            legend: {
              position: 'top',
              display: true
            },
          },
        }
      }
      />
    </div>
  );
};

export default GenderStatic;
