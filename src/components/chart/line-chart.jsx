import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ actual, wma }) => {
  // Pastikan data aktual memiliki satu elemen kurang dari data WMA
  if (actual.length >= wma.length) {
    actual = actual.slice(0, wma.length - 1);
  }
  const chartData = {
    series: [
      {
        name: "Penjualan Aktual",
        data: actual,
      },
      {
        name: "Penjualan Weight Moving Average",
        data: wma,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Penjualan Alat Kesehatan",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: Array.from(
          { length: Math.max(actual.length, wma.length) },
          (_, i) => i + 1
        ),
        title: {
          text: "Week",
        },
      },
      yaxis: {
        title: {
          text: "Jumlah Penjualan",
        },
        min: Math.min(...actual.concat(wma)) - 5,
        max: Math.max(...actual.concat(wma)) + 5,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <div className="p-10 overflow-scroll">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
