import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Lists } from "../../components";

const SearchSongs = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData?.top?.playlistId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getSearchSong(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="w-full px-[60px]">
      <Lists isHideTitle />
    </div>
  );
};

export default SearchSongs;
