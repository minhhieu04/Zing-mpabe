import React, { memo } from "react";
import { List } from "./";
import icons from "../utils/icons";

const { BiSortAlt2 } = icons;

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
        {songs?.map((item) => (
          <List key={item?.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Lists);
