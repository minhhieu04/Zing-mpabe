/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

const { GoTrash } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } =
    useSelector((state) => state.music);
  const [playlist, setPlaylist] = useState(null);
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response?.data.err === 0) setPlaylist(response.data.data?.song?.items);
  };
  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);
  return (
    <div className="flex flex-col text-xs w-full h-full">
      <div className="h-[70px] w-full flex-none py-[14px] justify-between px-2 flex gap-8 items-center">
        <div className="flex flex-auto justify-center py-[6px] px-[6px] bg-main-200 rounded-l-full rounded-r-full cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              !isRecent && "bg-main-100 text-main-500"
            } py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`${
              isRecent && "bg-main-100 text-main-500"
            } py-[5px] flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 rounded-full cursor-pointer bg-main-100 hover:bg-[hsla(0,0%,100%,0.3)]">
          <GoTrash size={14} />
        </span>
      </div>
      {isRecent ? (
        <div className="w-full flex flex-col px-2 flex-auto">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            {recentSongs.map((item, index) => (
              <SongItem
                key={index}
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artists}
                sid={item?.sid}
                size="h-[40px] w-[40px]"
              />
            ))}
          </Scrollbars>
        </div>
      ) : (
        <div className="w-full flex flex-col px-2 flex-auto">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              sm
              style={"bg-main-500 text-white"}
            />
            <div className="flex flex-col text-black pt-[15px] pb-[5px] px-2">
              <span className="text-sm font-bold">Tiếp theo</span>
              <span className="text-sm flex gap-1 py-1">
                <span className="text-gray-500">Từ playlist</span>
                <span className="text-main-500 font-semibold">
                  {curSongData?.album?.title?.length > 30
                    ? `${curSongData?.album?.title?.slice(0, 30)}...`
                    : curSongData?.album?.title}
                </span>
              </span>
            </div>
            {playlist && (
              <div className="flex flex-col">
                {playlist.map((item, index) => (
                  <SongItem
                    key={index}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    size="w-[40px] h-[40px]"
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      )}
      <div className="w-full h-[90px]" />
    </div>
  );
};

export default SidebarRight;
