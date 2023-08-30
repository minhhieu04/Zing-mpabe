import React from "react";
import moment from "moment";

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
    <div className="w-[30%] flex flex-auto p-[10px] gap-[10px] hover:bg-main-200 cursor-auto rounded-md">
      <img
        src={thumbnail}
        alt={title}
        className="w-[60px] h-[60px] object-cover rounded-md"
      />
      <div className="flex flex-col justify-between">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="text-xs text-gray-500">{artists}</span>
        <span className="text-xs text-gray-500">{formattedReleaseDate}</span>
      </div>
    </div>
  );
};

export default SongItem;
