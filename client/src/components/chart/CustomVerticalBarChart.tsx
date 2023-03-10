import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  height: number;
  title: string;
  bgColor?: string;
  labels?: string[];
  data?: number[];
}

export const CustomVerticalBarChart = (props: IProps) => {
  const { labels, title, data, height, bgColor } = props;

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: title,
        data: data ?? [],
        backgroundColor: bgColor ?? "rgba(82, 166, 216, 0.5)",
      },
    ],
  };

  return (
    <Bar height={height} options={{ responsive: true }} data={chartData} />
  );
};
