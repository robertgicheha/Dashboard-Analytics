// src/components/Chart.js
import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useQuery, gql } from '@apollo/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GET_CHART_DATA = gql`
  query GetChartData {
    chartData {
      labels
      values
    }
  }
`;

const Chart = () => {
  const { data, loading, error } = useQuery(GET_CHART_DATA);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (data) {
      setChartData({
        labels: data.chartData.labels,
        datasets: [
          {
            label: 'Sales',
            data: data.chartData.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading chart data</p>;

  return (
    <div className="chart-container">
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
