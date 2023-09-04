import React, { memo } from "react";
import { SectionItem } from "./";

const Section = ({ data }) => {
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{data?.title}</h3>
        <span className="text-xs">{data?.items?.length > 5 && "TẤT CẢ"}</span>
      </div>
      <div className="flex justify-between items-start gap-7">
        {data?.items?.slice(0, 5).map((item, index) => (
          <SectionItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
