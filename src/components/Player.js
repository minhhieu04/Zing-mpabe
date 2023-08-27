import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";

const {
  IoMdHeartEmpty,
  BsThreeDots,
  RxShuffle,
  MdSkipNext,
  BsPauseCircle,
  BsPlayCircle,
  MdSkipPrevious,
  PiRepeatLight,
  PiRepeatOnceLight,
} = icons;
var intervalId;

const Player = () => {
  // const [isPlaying, setIsPlaying] = useState(true);
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [currentSecond, setCurrentSecond] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const thumbRef = useRef();
  const trackRef = useRef();
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
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurrentSecond(0);
        thumbRef.current.style.cssText = "right: 100%";
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrentSecond(Math.round(audio.currentTime));
      }, 100);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleClickButtonShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? audio.play() : handleClickButtonNext();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  const handleClickToggleButton = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    console.log(percent);
  };

  const handleClickButtonNext = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((song, index) => {
        if (song.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleClickButtonPre = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((song, index) => {
        if (song.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleClickButtonShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    console.log(songs[randomIndex].encodeId);
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
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
        <div className="flex gap-8 justify-center items-center">
          <span
            className={`cursor-pointer ${isShuffle && "text-main-500"}`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <RxShuffle size={24} />
          </span>
          <span
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
            onClick={handleClickButtonPre}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleClickToggleButton}
            className="text-[40px] cursor-pointer text-gray-800 hover:text-main-500"
          >
            {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
          </span>
          <span
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
            onClick={handleClickButtonNext}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && "text-main-500"}`}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            title="Bật phát lại tất cả"
          >
            {repeatMode === 1 ? (
              <PiRepeatOnceLight size={24} />
            ) : (
              <PiRepeatLight size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center gap-3 justify-center text-xs">
          <span className="">
            {moment.utc(currentSecond * 1000).format("mm:ss")}
          </span>
          <div
            className="w-3/4 h-[3px] hover:h-[7px] rounded-l-full cursor-pointer rounded-r-full bg-[rgba(0,0,0,0.1)] relative"
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 bottom-0 left-0 rounded-l-full rounded-r-full bg-[#0e8080]"
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
