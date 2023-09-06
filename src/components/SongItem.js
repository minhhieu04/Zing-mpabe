import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  sid,
  order,
  percent,
}) => {
  const releaseDateInSeconds = releaseDate;
  const releaseDateMoment = moment.unix(releaseDateInSeconds);

  const currentDate = moment();

  const minutesDifference = currentDate.diff(releaseDateMoment, "minutes");
  const hoursDifference = currentDate.diff(releaseDateMoment, "hours");
  const daysDifference = currentDate.diff(releaseDateMoment, "days");
  const weeksDifference = currentDate.diff(releaseDateMoment, "weeks");

  let formattedReleaseDate;

  if (minutesDifference < 60) {
    formattedReleaseDate = `${minutesDifference} phút trước`;
  } else if (hoursDifference < 24) {
    formattedReleaseDate = `${hoursDifference} giờ trước`;
  } else if (daysDifference < 1) {
    formattedReleaseDate = "hôm qua";
  } else if (daysDifference < 7) {
    formattedReleaseDate = `${daysDifference} ngày trước`;
  } else if (weeksDifference === 1) {
    formattedReleaseDate = "1 tuần trước";
  } else if (weeksDifference > 1) {
    formattedReleaseDate = `${weeksDifference} tuần trước`;
  } else {
    formattedReleaseDate = releaseDateMoment.format("DD/MM/YYYY");
  }

  const dispatch = useDispatch();
  return (
    <div
      className={`w-full flex p-[10px] gap-[10px] cursor-pointer rounded-md justify-between items-center ${
        order
          ? "bg-[hsla(0,0%,100%,.07)] hover:bg-[#643f7a] text-white "
          : "hover:bg-main-200"
      }`}
    >
      <div className="flex gap-4">
        {order && (
          <span class="text-[32px] text-white relative">
            <span class="absolute top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] text-red-500 z-10">
              {order}
            </span>
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt={title}
          className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
          onClick={() => {
            dispatch(actions.setCurSongId(sid));
            dispatch(actions.play(true));
          }}
        />
        <div className="flex flex-col justify-center ">
          <span className="text-sm font-semibold opacity-90">{title}</span>
          <span className="text-xs opacity-70">{artists}</span>
          {/* <span className="text-xs text-gray-500">{moment(releaseDate * 1000 ).fromNow()}</span> */}
          {releaseDate && (
            <span className="text-xs text-gray-500">
              {formattedReleaseDate}
            </span>
          )}
        </div>
      </div>
      {percent && <span>{percent}</span>}
    </div>
  );
};

export default memo(SongItem);
