import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

import { BaseUrl } from "../../../../Constants/Constants";
import axios from "axios";
import { useEffect, useState } from "react";
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
  type: "bar",
  height: 440,
  options: {
    series: [
      {
        name: "Sales",
        data: [50, 100],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "March",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  },
};
export default function ChartDetails() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    const apiUrl = `${BaseUrl}dashboard/salesDetails/`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Restructure response data for chart
      const chartData = response.data.map((item) => ({
        month: new Date(item.month).toLocaleString("en-US", { month: "long" }), // Extract month name
        total_amount: item.total_amount,
      }));

      // Extract unique month names as categories
      const categories = [...new Set(chartData.map((item) => item.month))];

      // Extract data values
      const data = chartData.map((item) => item.total_amount);

      // Update chart data state
      setChartData({ categories, data });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Card>
      <CardBody className="px-2 pb-0">
        <Card>
          <CardBody className="px-2 pb-0">
            <Chart
              {...chartConfig}
              options={{
                ...chartConfig.options,
                xaxis: {
                  ...chartConfig.options.xaxis,
                  categories: chartData.categories,
                },
              }}
              series={[{ data: chartData.data }]}
            />
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
}
