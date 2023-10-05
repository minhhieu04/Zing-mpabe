import React, { useState, useEffect, memo } from "react";
import { List } from "./";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";

const RankList = ({ data, isHideAlbum, number, link }) => {
  // console.log(data);
  const [isShowFullSongs, setIsShowFullSongs] = useState(false);
  console.log();
  const [songs, setSongs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isShowFullSongs) {
      setSongs(data);
    } else {
      setSongs(data?.slice(0, number));
    }
  }, [isShowFullSongs, data]);

  return (
    <>
      {songs?.map((item, index) => (
        <List
          songData={item}
          key={index}
          isHideNote
          order={index + 1}
          isHideAlbum={isHideAlbum}
        />
      ))}
      <div className="w-full flex justify-center items-center">
        <button
          type="button"
          className="my-4 px-4 py-2 border border-main-500 rounded-l-full rounded-r-full text-sm text-main-500 hover:text-white hover:bg-main-500"
          onClick={() =>
            link
              ? navigate(link.split(".")[0])
              : setIsShowFullSongs((prev) => !prev)
          }
        >
          {isShowFullSongs ? "Xem top 10" : "Xem top 100"}
        </button>
      </div>
    </>
  );
};

export default memo(RankList);
