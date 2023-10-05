import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioSpinner } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../utils/icons";

const { BiPlay } = icons;

const Album = () => {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);
  const location = useLocation();

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false));
      if (response?.data.err === 0) {
        setPlaylistData(response?.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location?.state?.playAlbum) {
      const randomIndex =
        Math.round(Math.random() * playlistData?.song?.total) - 1;
      // console.log(randomIndex);
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomIndex]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <div className="flex gap-8 mt-[90px] w-full h-full px-[59px] pt-5">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2">
        <div className="w-full relative overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "animate-rotate-center-pause rounded-md"
            } shadow-md`}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center ${
              isPlaying ? "hover:rounded-full" : "hover:rounded-md"
            }`}
          >
            <span className="border border-white rounded-full p-2">
              {isPlaying ? <AudioSpinner /> : <BiPlay size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-[20px] font-bold text-gray-700 text-center">
            {playlistData?.title}
          </h3>
          <span className="flex flex-col items-center gap-1 text-gray-500 text-xs">
            <span>{`Cập nhật: ${moment
              .unix(playlistData?.contentLastUpdate)
              .format("DD/MM/YYYY")}`}</span>

            <span>{playlistData?.artistsNames}</span>
            <span>{`${Math.round(
              playlistData?.like / 1000
            )}K người yêu thích`}</span>
          </span>
        </div>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "90%" }}>
        <div className="flex-auto mb-40">
          <span className="text-sm flex gap-1">
            <span className="text-gray-600 ">Lời tựa</span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
