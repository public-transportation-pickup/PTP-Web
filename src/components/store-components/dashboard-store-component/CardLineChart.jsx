import { Chart } from "chart.js/auto";
import { useEffect} from "react";
import PropTypes from 'prop-types'

export default function CardLineChart({param}) {
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "CN",
        ],
        datasets: [
          {
            label: 'Tuần mới',
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: param!==null?param.saleValuesNew:[65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: 'Tuần trước',
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: param!==null?param.saleValuesLast  : [40.5, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: 
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          y: 
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    if (
      window.myLine !== undefined
      &&
      window.myLine !== null
    ) {
        window.myLine.destroy();
    }

    window.myLine = new Chart(ctx, config);
  }, [param]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-100 mb-1 text-xs font-semibold">
              Sales value
              </h6>
              <h2 className="text-white text-xl font-semibold">Biểu đồ so sánh doanh thu</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

CardLineChart.propTypes={
  param:PropTypes.object
}