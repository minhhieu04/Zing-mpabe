import React, { useEffect, useState } from "react";
import { apiGetArtist } from "../../apis";
import { useSelector } from "react-redux";
import { SectionItem } from "../../components";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await apiGetArtist(searchData?.top?.alias);
      if (response.data.err === 0) {
        setPlaylists(response.data.data.sections[1]);
        console.log(response.data.data.sections[1].items);
      }
    };
    fetch();
  }, [searchData]);
  return (
    <div className="w-full flex-col flex gap-8 px-[46px]">
      <h3 className="text-lg font-bold mb-5 ml-[14px]">Playlist/Album</h3>
      <div className="flex items-start flex-wrap justify-start">
        {playlists?.items?.map((item, index) => (
          <SectionItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
