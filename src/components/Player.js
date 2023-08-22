import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../store/actions";
import moment from "moment";

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
var intervalId;

const Player = () => {
  // const [isPlaying, setIsPlaying] = useState(true);
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [currentSecond, setCurrentSecond] = useState(0);
  const thumbRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      }
      // } else {
      //     dispatch(actions.play(false))
      //     setAudio(new Audio())
      //     toast.info(res2.data.msg)
      // }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrentSecond(Math.round((percent * songInfo.duration) / 100));
      }, 100);
    }
  }, [audio]);

  const handleClickToggleButton = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

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
              <PiPauseCircleLight size={50} />
            ) : (
              <PiPlayCircleLight size={50} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <PiRepeatLight size={24} />
          </span>
        </div>
        <div className="w-full flex items-center gap-3 justify-center text-xs">
          <span className="">
            {moment.utc(currentSecond * 1000).format("mm:ss")}
          </span>
          <div className="w-3/4 h-[3px] rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)] relative">
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
