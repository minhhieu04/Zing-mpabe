import React, { memo } from "react";
import { List } from "./";
import icons from "../utils/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { toArray } from "lodash";

const { BiSortAlt2, BsDot } = icons;

const Lists = ({ totalDuration, isHideTitle }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-between items-center p-[10px] font-semibold text-gray-500">
        <span className="flex-1 flex gap-3 items-center">
          {!isHideTitle && (
            <span className="border border-gray-500 rounded-[5px]">
              <BiSortAlt2 />
            </span>
          )}
          {isHideTitle ? (
            <span className="font-bold text-xl text-gray-900">Bài hát</span>
          ) : (
            <span>BÀI HÁT</span>
          )}
        </span>
        {!isHideTitle && (
          <span className="flex-1 flex justify-center">ALBUM</span>
        )}
        {!isHideTitle && (
          <span className="flex-1 flex justify-end">THỜI GIAN</span>
        )}
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item?.encodeId} songData={item} isHideNote />
        ))}
      </div>
      {totalDuration && (
        <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          <span>{`${songs?.length} bài hát`}</span>
          <span>
            <BsDot size={24} />
          </span>
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </span>
      )}
    </div>
  );
};

export default memo(Lists);
