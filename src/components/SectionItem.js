import React, { memo, useState, useRef } from "react";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";

const SectionItem = ({ item }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();
  const { IoMdHeartEmpty, BsThreeDots, BiPlay } = icons;

  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList.remove("animate-scale-down-image");
    imageRef.current.classList.add("animate-scale-up-image");
  };
  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList?.remove("animate-scale-up-image");
    imageRef.current.classList?.add("animate-scale-down-image");
  };

  return (
    <div
      onClick={() => {
        navigate(item?.link?.split(".")[0], { state: { playAlbum: false } });
      }}
      key={item.encodeId}
      className="flex flex-col gap-3 text-sm justify-start w-1/5 p-4 cursor-pointer"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="w-full relative overflow-hidden rounded-lg"
      >
        {isHover && (
          <div className="absolute z-40 top-0 left-0 bottom-0 right-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-10 ">
            <span>
              <IoMdHeartEmpty size={20} />
            </span>
            <span
              className="p-1 border border-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(item?.link?.split(".")[0], {
                  state: { playAlbum: true },
                });
              }}
            >
              <BiPlay size={40} />
            </span>
            <span>
              <BsThreeDots size={20} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          className="h-auto w-full rounded-lg"
          src={item.thumbnailM}
          alt="thumbnailSection"
        ></img>
      </div>
      <span className="text-gray-500">
        {item.sortDescription.length > 50
          ? `${item.sortDescription.substring(0, 50)} ...`
          : item.sortDescription}
      </span>
    </div>
  );
};

export default memo(SectionItem);
