import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { PiMusicNotesSimple } = icons;

const List = ({ songData, isHideAlbum, isHideNote, order }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer "
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(
          actions.setRecentSong({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            sid: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        {!isHideNote && (
          <span>
            <PiMusicNotesSimple />
          </span>
        )}
        {order && (
          <span
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : order === 3
                ? "text-shadow-no3"
                : "text-shadow-other"
            } text-main-300 text-[32px] flex items-center justify-center flex-none w-[10%]`}
          >
            {order}
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        ></img>
        <span className="flex flex-col">
          <span className="text-sm font-semibold break-words">
            {songData?.title.length > 25
              ? `${songData?.title.slice(0, 25)}...`
              : songData?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songData?.artistsNames}
          </span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className="flex-1 flex justify-center text-xs text-gray-500">
          {songData?.album?.title.length >= 30
            ? `${songData?.album?.title.slice(0, 30)}...`
            : songData?.album?.title}
        </div>
      )}
      <div className="flex-1 flex justify-end text-xs text-gray-500">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
