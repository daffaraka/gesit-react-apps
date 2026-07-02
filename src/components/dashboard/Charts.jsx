import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export function LineChart({ monthlyData }) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [{
      label: 'Total Dokumen SPPD',
      data: monthlyData,
      borderColor: '#3b82f6',
      tension: 0.3,
      fill: false
    }]
  };
  return <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
}

export function DoughnutChart({ setdaCount, bupatiCount }) {
  const data = {
    labels: ['SETDA', 'BUPATI'],
    datasets: [{ data: [setdaCount, bupatiCount], backgroundColor: ['#a855f7', '#f59e0b'] }]
  };
  return <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
}
