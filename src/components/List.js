import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";

const { PiMusicNotesSimple } = icons;

const List = ({ songData }) => {
  return (
    <div className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <span>
          <PiMusicNotesSimple />
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        ></img>
        <span className="flex flex-col">
          <span className="text-sm font-semibold break-words">
            {songData?.title.length > 25
              ? `${songData?.title.slice(0, 25)}...`
              : songData?.title}
          </span>
          <span className="text-[12px]">{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="flex-1 flex justify-center">
        {songData?.album?.title.length >= 30
          ? `${songData?.album?.title.slice(0, 30)}...`
          : songData?.album?.title}
      </div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
