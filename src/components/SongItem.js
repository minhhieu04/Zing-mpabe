import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";

const SongItem = ({ thumbnail, title, artists, releaseDate }) => {
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

  return (
    <div className="w-[45%] flex w= p-[10px] gap-[10px] hover:bg-main-200 cursor-auto rounded-md 1024:w-[30%]">
      <img
        src={thumbnail}
        alt={title}
        className="w-[60px] h-[60px] object-cover rounded-md"
      />
      <div className="flex flex-col justify-between">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="text-xs text-gray-500">{artists}</span>
        {/* <span className="text-xs text-gray-500">{moment(releaseDate * 1000 ).fromNow()}</span> */}
        <span className="text-xs text-gray-500">{formattedReleaseDate}</span>
      </div>
    </div>
  );
};

export default memo(SongItem);
