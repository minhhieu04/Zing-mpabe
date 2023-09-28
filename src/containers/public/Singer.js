import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";
import icons from "../../utils/icons";
const { AiOutlineUserAdd, BiPlay } = icons;

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    singer && fetchArtistData();
  });
  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        <img
          src={artistData?.cover}
          alt="background"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-transparent">
          <div className="absolute bottom-0 pb-6 px-[60px]">
            <div className="flex gap-8 items-center">
              <h1 className="text-[60px] font-bold">{artistData?.name}</h1>
              <span
                className="p-2 rounded-full bg-white text-main-500 hover:text-gray-100 cursor-pointer relative"
                onMouseEnter={() => setIsHoverPlay(true)}
                onMouseLeave={() => setIsHoverPlay(false)}
              >
                <div className="w-8 h-8"></div>
                {isHoverPlay && (
                  <span className="absolute left-0 top-0 right-0 bottom-0 rounded-full animate-scale-up-center bg-main-500"></span>
                )}
                <span className="absolute left-0 top-0 right-0 bottom-0 p-2 z-50">
                  <BiPlay size={32} />
                </span>
              </span>
            </div>
            <div className="flex gap-6 items-center mt-4">
              <span className="text-sm text-gray-100 font-semibold">{`${Number(
                artistData?.totalFollow.toLocaleString()
              )} người quan tâm`}</span>
              <button
                type="button"
                className="bg-transparent px-4 py-1 border border-gray-300 text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-gray-100 font-semibold"
              >
                <span>{<AiOutlineUserAdd />}</span>
                <span className="text-xs">QUAN TÂM</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singer;
