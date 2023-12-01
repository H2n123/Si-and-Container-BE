import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80],
      },
    ],
  };
  
  const options = {
    title: {
      display: true,
      text: 'Sample Bar Chart',
      fontSize: 16,
    },
  };
  
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
  
};

export default Graph;
