import React, { useState } from "react";
import icons from "../utils/icons";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import path from "../utils/path";
import {AiOutlineClose} from "react-icons/ai"

const { BsSearchHeart } = icons;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singer } = useParams()

  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="flex items-center relative text-gray-500">
      <span onClick={()=> setKeyword('')} className="absolute right-[16px] cursor-pointer"><AiOutlineClose size={22}/></span>
      <span className={`flex h-10 pl-4 ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-main-200' } justify-center items-center rounded-l-[20px]`}>
        <BsSearchHeart size={24} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        className={`outline-none ${singer ? 'bg-[rgba(0,0,0,0.2)]' : 'bg-main-200' } px-4 py-2 rounded-r-[20px] h-10 w-full`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      ></input>
    </div>
  );
};

export default Search;
