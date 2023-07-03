'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [123, 34, 34, 23, 678, 123],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//   ],
// };

const LineChart = (props) => {
    const data = props.data;
    const values = data?.values || [];
    const labels = data?.labels || [];
    const graphTitle = data?.graphTitle || '';
    const graphlineTitle = data?.lineTitle || '';

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: graphTitle,
        },
      },
    };
    const graphData = {
    labels,
    datasets: [
      {
        label: graphlineTitle,
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
    return (
        <>
            <Line options={options} data={graphData} />
        </>
    )
}

export default LineChart;