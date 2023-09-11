import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiSearch } from "../apis";

const { BsSearchHeart } = icons;

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      // const response = await apiSearch(keyword);
      // console.log(response);
    }
  };

  return (
    <div className="flex items-center text-gray-500">
      <span className="flex h-10 pl-4 bg-main-200 justify-center items-center rounded-l-[20px]">
        <BsSearchHeart size={24} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        className="outline-none bg-main-200 px-4 py-2 rounded-r-[20px] h-10 w-full"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      ></input>
    </div>
  );
};

export default Search;
