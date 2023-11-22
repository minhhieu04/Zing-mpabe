import React, { memo } from "react";
import { SectionItem } from "./";
import { useSelector } from "react-redux";

const Section = ({ data }) => {
  const { currentWidth } = useSelector((state) => state.app);
  return (
    <div className="mt-12 px-[44px] flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold pl-4">{data?.title}</h3>
        <span className="text-xs">{data?.items?.length > 5 && "TẤT CẢ"}</span>
      </div>
      <div className="flex">
        {data?.items
          ?.slice(0, currentWidth < 600 ? 3 : currentWidth < 800 ? 4 : 5)
          .map((item, index) => (
            <SectionItem item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
