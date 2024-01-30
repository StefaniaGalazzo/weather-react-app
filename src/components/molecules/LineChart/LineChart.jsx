// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
import styles from "./LineChart.module.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartComponent = ({
  forecastData,
  getDateFromSeconds,
  convertKelvinToCelsius,
}) => {
  const [data, setData] = useState({
    labels: ["day-1", "day-2", "day-3", "day-4", "day-5"],
    datasets: [
      {
        fill: true,
        label: "Variazioni di temperatura",
        data: [0, 1, 2, 3, 4, 5],
        borderColor: "#fff",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: "#fff",
          font: {
            size: 20,
          },
        },
      },
      title: {
        display: false,
        text: "Temperature variations",
        color: "#fff",
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: true,
          color: "#FFFFFF",
        },
        ticks: {
          beginAtZero: true,
          color: "white",
          fontSize: 12,
          stepSize: 1,
        },
      },
      x: {
        grid: {
          drawBorder: true,
          color: "#FFFFFF",
        },
        ticks: {
          beginAtZero: true,
          color: "white",
          fontSize: 12,
        },
      },
    },
  };

  useEffect(() => {
    // console.log(data, "forecastData");
    if (forecastData?.length === 0 || !forecastData) return;
    if (forecastData && forecastData?.length > 0) {
      // console.log(forecastData, "forecastData");
      const labels = forecastData
        .map((day) => getDateFromSeconds(day.dt).slice(0, 5))
        .slice(0, 5);
      const temperatureData = forecastData
        .map((day) => convertKelvinToCelsius(day.main.temp))
        .slice(0, 5);

      setData({
        labels: labels,
        datasets: [
          {
            fill: true,
            // spanGaps: true,
            label: "Variazioni di temperatura",
            data: temperatureData,
            borderColor: "rgb(255, 255, 255)",
            // backgroundColor: "rgba(53, 162, 235, 0.5)",
            backgroundColor: (context) => {
              // gradienti
              const gradient = context.chart.ctx.createLinearGradient(
                0,
                context.chart.chartArea.bottom,
                0,
                context.chart.chartArea.top
              );
              gradient.addColorStop(1, "rgba(53, 162, 235, 0.9)");
              gradient.addColorStop(0, "rgba(53, 162, 235, 0)");
              return gradient;
            },
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "lightblue",
            pointStyle: "circle",
          },
        ],
      });
      // console.log(data, "data");
    }
  }, [forecastData]);

  return (
    <div
      id={styles.myChart}
      className="p-3 w-100"
      style={{ minWidth: "300px" }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
