import React, { memo, useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import _ from "lodash";
import { Link } from "react-router-dom";
import path from "../utils/path";
import icons from "../utils/icons";

const { BiPlay } = icons;

const ChartSection = () => {
  const [data, setData] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const chartRef = useRef();
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.3)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
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
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
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
  //   console.log(tooltipState);
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
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
  }, [chart]);

  return (
    <div className="px-[59px] mt-12 relative 1400:max-h-[414px] h-[760px]">
      <div className="bg-[#2b273f] rounded-md w-full 1400:max-h-[414px] h-[760px] "></div>
      <div className="absolute top-0 z-10 bg-[rgba(75,37,103,.95)] left-[59px] bottom-0 right-[59px] rounded-md"></div>
      <div className="absolute top-0 z-20 left-[59px] bottom-0 right-[59px] p-5 flex flex-col gap-8">
        <Link to={path.ZING_CHART} className="flex gap-2 items-center ">
          <span className="chart-title font-bold text-[40px] leading-[48px]">
            #zingchart
          </span>
          <span className="p-1 rounded-full bg-white hover:bg-gray-200">
            <BiPlay size={20} />
          </span>
        </Link>
        <div className="flex gap-2 h-[70%] 1400:flex-row flex-col">
          <div className="flex-4 flex flex-col gap-3">
            {rank?.slice(0, 3)?.map((item, index) => (
              <SongItem
                key={index}
                thumbnail={item.thumbnail}
                title={item.title}
                artists={item.artistsNames}
                sid={item.encodeId}
                order={index + 1}
                percent={`${Math.round(
                  (+item.score * 100) / +chart?.totalScore
                )}%`}
                style="bg-[hsla(0,0%,100%,.07)] hover:bg-[#643f7a] text-white"
              />
            ))}
            <Link
              to={path.ZING_CHART}
              className="text-white px-4 py-1 rounded-l-full rounded-r-full m-auto border border-white w-fit"
            >
              Xem thêm
            </Link>
          </div>
          <div className="flex-6 h-[300px] relative 1400:order-last 1400:w-[500px] h-[80%]">
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
                  rank?.find((i) => i.encodeId === selected)?.thumbnail
                }
                title={rank?.find((i) => i.encodeId === selected)?.title}
                artists={
                  rank?.find((i) => i.encodeId === selected)?.artistsNames
                }
                sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                percent={`${Math.round(
                  (+rank?.find((i) => i.encodeId === selected)?.score * 100) /
                    +chart?.totalScore
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

export default memo(ChartSection);
