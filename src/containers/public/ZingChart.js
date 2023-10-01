import React, { useEffect, useRef, useState } from "react";
import { apiGetChartHome } from "../../apis";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { SongItem } from "../../components";
import _ from "lodash";

const ZingChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.3)", drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "rgba(0,0,0,0.3)" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[
                Object.keys(chartData?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            });
          }
          const rs = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")
            )
          );
          setSelected(rs.encodeId);
          //   console.log(rs);
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setChartData(response.data.data);
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);

  // console.log(data);

  return (
    <div>
      <div className="flex flex-col px-[60px]">
        <h3 className="pt-[110px] mb-[60px] ">
          <span className="chart-title font-bold text-[40px] leading-[48px]">
            #zingchart
          </span>
        </h3>

        <div className="relative h-[300px] w-full ">
          <div className="flex-6 absolute top-0 left-0 bottom-0 right-0">
            {data && <Line ref={chartRef} data={data} options={options} />}
            <div
              className="tooltip"
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: "absolute",
              }}
            >
              <SongItem
                thumbnail={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === selected
                  )?.thumbnail
                }
                title={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === selected
                  )?.title
                }
                artists={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === selected
                  )?.artistsNames
                }
                sid={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === selected
                  )?.encodeId
                }
                percent={`${Math.round(
                  (+chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === selected
                  )?.score *
                    100) /
                    +chartData?.RTChart?.chart?.totalScore
                )}%`}
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
