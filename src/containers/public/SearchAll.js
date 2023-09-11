import React from "react";
import { useSelector } from "react-redux";
import { handleRoundedNumber } from "../../utils/fn";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);
  return (
    <div className="w-full flex flex-col px-[60.6667px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Nổi bật</h3>
        <div className="flex gap-8">
          {searchData?.top && (
            <div className="p-[10px] bg-main-200 rounded-md flex flex-1 gap-8 items-center">
              <img
                src={searchData?.top.thumbnail}
                alt="thumbnail"
                className={`w-[84px] h-[84px] object-cover ${
                  searchData.top.objectType === "artist" && "rounded-full"
                }`}
              />
              <div className="flex flex-col text-xs">
                <span className="mb-[6px]">
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ" : ""}
                </span>
                <span className="text-sm font-semibold">
                  {searchData.top.title || searchData.top.name}
                </span>
                {searchData.top.objectType === "artist" && (
                  <span>
                    {handleRoundedNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm"}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-1">SOng 1</div>
          <div className="flex gap-1">SOng 2</div>
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
