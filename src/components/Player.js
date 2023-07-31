import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";

const { IoMdHeartEmpty, BsThreeDots } = icons;

const Player = () => {
  const { curSongId } = useSelector((state) => state.music);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchDataSong = async () => {
      const response = await apis.getDetailSong(curSongId);
      console.log(response);
      if (response.data.err === 0) {
        setSongInfo(response.data.data);
      }
    };
    fetchDataSong();
  }, [curSongId]);
  return (
    <div className="bg-main-400 h-full px-5 flex">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-gray-500 text-xs break-words">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex">
          <span className="mx-[2px] p-2">
            <IoMdHeartEmpty />
          </span>
          <span className="mx-[2px] p-2">
            <BsThreeDots />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto">Main Player</div>
      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
