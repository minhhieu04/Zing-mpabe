import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const { section } = useSelector((state) => state.app);
  const navigate = useNavigate();

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{section?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex justify-between items-center gap-7">
        {section?.items?.slice(0, 5).map((item) => (
          <div
            key={item.encodeId}
            className="flex flex-col gap-3 flex-auto text-sm w-1/5 "
          >
            <img
              className="rounded-lg h-auto w-full cursor-pointer"
              onClick={() => {
                navigate(item?.link?.split(".")[0]);
              }}
              src={item.thumbnailM}
              alt="thumbnailSection"
            ></img>
            <span className="text-gray-500">
              {item.sortDescription.length > 60
                ? `${item.sortDescription.substring(0, 60)} ...`
                : item.sortDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
