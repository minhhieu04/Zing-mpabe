import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";

const {
  IoMdHeartEmpty,
  BsThreeDots,
  RxShuffle,
  MdSkipNext,
  PiPauseCircleLight,
  PiPlayCircleLight,
  MdSkipPrevious,
  PiRepeatLight,
} = icons;

const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);

  const [songInfo, setSongInfo] = useState(null);
  const handleClickToggleButton = () => {};

  useEffect(() => {
    const fetchDataSong = async () => {
      const response = await apis.getDetailSong(curSongId);
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
      <div className="w-[40%] flex-auto flex flex-col justify-center gap-2 items-center py-1">
        <div className="flex gap-8 justify-center items-center cursor-pointer">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <RxShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleClickToggleButton}
            className="text-[40px] cursor-pointer text-main-500"
          >
            {isPlaying ? (
              <PiPlayCircleLight size={50} />
            ) : (
              <PiPauseCircleLight size={50} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <PiRepeatLight size={24} />
          </span>
        </div>
        <div>progress bar</div>
      </div>
      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
