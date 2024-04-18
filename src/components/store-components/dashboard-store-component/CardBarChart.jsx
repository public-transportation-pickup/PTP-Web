import React from 'react';
import { Chart } from "chart.js/auto";
import PropTypes from 'prop-types'

export default function CardBarChart({param}) {
    var newData= param!=undefined?param.totalOrderNew:[30, 78, 56, 34, 100, 45, 13];

    var lastData= param!=undefined?param.totalOrderLast : [27, 68, 86, 74, 10, 4, 87];
  
    React.useEffect(() => {
      let config = {
        type: "bar",
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
              backgroundColor: "#ed64a6",
              borderColor: "#ed64a6",
              data:newData,
              fill:  false,
              barThickness: 8,
            },
            {
              label: 'Tuần trước',
              fill: false,
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data:lastData,
              barThickness: 8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Orders Chart",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            x: 
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(33, 37, 41, 0.3)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            y: 
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
                gridLines: {
                  borderDash: [2],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.2)",
                  zeroLineColor: "rgba(33, 37, 41, 0.15)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
          },
        },
      };
      let ctx = document.getElementById("bar-chart").getContext("2d");
      if (
        window.myBar !== undefined
        &&
        window.myBar !== null
      ) {
          window.myBar.destroy();
      }
  
      window.myBar = new Chart(ctx, config);
    }, [param]);
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">
                 Total orders
                </h6>
                <h2 className="text-slate-700 text-xl font-semibold">
                  Biểu đồ số sánh đơn hàng
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id="bar-chart"></canvas>
            </div>
          </div>
        </div>
      </>
    );
}


CardBarChart.propTypes={
    param:PropTypes.object
  }