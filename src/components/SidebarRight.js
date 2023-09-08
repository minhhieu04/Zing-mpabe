import React, { useState } from "react";
import icons from "../utils/icons";
const { GoTrash } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);

  return (
    <div className="flex flex-col text-xs w-full">
      <div className="h-[70px] w-full flex-none py-[14px] justify-between px-2 flex gap-8 items-center">
        <div className="flex flex-auto justify-center py-[6px] px-[6px] bg-main-200 rounded-l-full rounded-r-full cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              !isRecent && "bg-main-100"
            } py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              isRecent && "bg-main-100"
            } py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 rounded-full cursor-pointer bg-main-100 hover:bg-[hsla(0,0%,100%,0.3)]">
          <GoTrash size={14} />
        </span>
      </div>
      <div>Body</div>
    </div>
  );
};

export default SidebarRight;
