import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists } from "../../components";

const Album = () => {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      // console.log(response);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  return (
    <div className="flex gap-8 w-full px-[59px] pt-5">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-md shadow-md"
        />
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
      <div className="flex-auto">
        <span className="text-sm">
          <span className="text-gray-600 ">Lời tựa</span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <Lists
          songs={playlistData?.song?.items}
          totalDuration={playlistData?.song?.totalDuration}
        />
      </div>
    </div>
  );
};

export default Album;
