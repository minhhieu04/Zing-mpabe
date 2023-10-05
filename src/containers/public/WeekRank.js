import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { RankList } from "../../components";

const notActiveStyle = "text-[24px] py-[12px] font-semibold opacity-70";
const activeStyle =
  "text-[24px] text-main-500 py-[12px] font-semibold border-b-4 border-main-500";

const WeekRank = ({ weekChart }) => {
  // console.log(weekChart);
  const { pid } = useParams();
  // useEffect(() => {}, [pid]);
  console.log(pid);
  return (
    <div>
      <div className="flex flex-col px-[60px]">
        <h3 className="pt-[110px] mb-[50px] text-main-500 font-bold text-[40px] leading-[48px] ">
          Bảng xếp hạng tuần
        </h3>
        <div className="flex gap-8">
          {weekChart?.map((item, i) => (
            <NavLink
              key={i}
              to={item.link.split(".")[0]}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.country === "vn"
                ? "VIỆT NAM"
                : item.country === "us"
                ? "US-UK"
                : "K-POP"}
            </NavLink>
          ))}
        </div>
        <div className="mt-4 h-fit">
          <RankList
            data={weekChart?.find((item) => item.link.includes(pid))?.items}
            number={40}
          />
        </div>
      </div>
    </div>
  );
};

export default WeekRank;
