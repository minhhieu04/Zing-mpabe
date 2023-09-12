import React, { memo } from "react";
import { handleRoundedNumber } from "../utils/fn";
import icons from "../utils/icons";

const { AiOutlineUserAdd } = icons;

const Artist = ({ img, title, follower }) => {
  return (
    <div className="flex w-1/5 flex-col gap-[15px]">
      <img
        src={img}
        alt="avt-singer"
        className="w-full object-contain rounded-full"
      />
      <div className="flex flex-col gap-1 items-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs opacity-70">{`${handleRoundedNumber(
          follower
        )} quan tâm`}</span>
        <button
          type="button"
          className="bg-main-500 px-4 py-1 text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-white"
        >
          <span>{<AiOutlineUserAdd />}</span>
          <span className="text-xs opacity-80">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Artist);
