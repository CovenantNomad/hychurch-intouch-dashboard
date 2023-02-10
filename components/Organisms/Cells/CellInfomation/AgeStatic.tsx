import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Member } from '../../../../interface/user';

interface AgeStaticProps {
  data: {
    [index: string]: Member[];
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgeStatic = ({ data }: AgeStaticProps) => {

  const labels = Object.keys(data)

  const barData = {
    labels,
    datasets: [
      {
        data: labels.map(label => data[label].length),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  
  return (
    <div className='py-1 px-2'>
      <Bar 
        data={barData} 
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
  );
};

export default AgeStatic;
