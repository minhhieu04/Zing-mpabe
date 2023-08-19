import React, { memo } from "react";
import { List } from "./";
import icons from "../utils/icons";
import moment from "moment";

const { BiSortAlt2, BsDot } = icons;

const Lists = ({ songs, totalDuration }) => {
  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between items-center p-[10px] font-semibold text-gray-500">
        <span className="flex-1 flex gap-3 items-center">
          <span className="border border-gray-500 rounded-[5px]">
            <BiSortAlt2 />
          </span>
          <span>BÀI HÁT</span>
        </span>
        <span className="flex-1 flex justify-center">ALBUM</span>
        <span className="flex-1 flex justify-end">THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.items.map((item) => (
          <List key={item?.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.total} bài hát`}</span>
        <span>
          <BsDot size={24} />
        </span>
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
