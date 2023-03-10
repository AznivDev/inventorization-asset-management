import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

interface IProps {
  height: number;
  title?: string;
  color?: string;
  bgColor?: string;
  labels?: string[];
  data?: number[];
}

export const CustomAreaChart = (props: IProps) => {
  const { labels, title, data, height, color, bgColor } = props;

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: title ?? "-",
        data: data ?? [],
        borderColor: color ?? "rgb(82, 166, 216)",
        backgroundColor: bgColor ?? "rgba(82, 166, 216, 0.5)",
      },
    ],
  };

  return (
    <Line height={height} options={{ responsive: true }} data={chartData} />
  );
};
