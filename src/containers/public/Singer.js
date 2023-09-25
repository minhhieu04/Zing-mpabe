import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
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
      <img
        src={artistData?.cover}
        alt="background"
        className="w-full h-[400px] object-cover"
      />
    </div>
  );
};

export default Singer;
