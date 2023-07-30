import React from "react";
import icons from "../utils/icons";

const { BsSearchHeart } = icons;

const Search = () => {
  return (
    <div className="flex items-center text-gray-500">
      <span className="flex h-10 pl-4 bg-main-200 justify-center items-center rounded-l-[20px]">
        <BsSearchHeart size={24} />
      </span>
      <input
        type="search"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        className="outline-none bg-main-200 px-4 py-2 rounded-r-[20px] h-10 w-full"
      ></input>
    </div>
  );
};

export default Search;
