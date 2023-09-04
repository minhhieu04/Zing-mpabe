import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SectionItem = ({ item }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();

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
      key={item.encodeId}
      className="flex flex-col gap-3 flex-auto text-sm w-1/5"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="w-full relative overflow-hidden rounded-lg"
      >
        {isHover && (
          <div className="absolute z-40 top-0 left-0 bottom-0 right-0 bg-overlay-30 rounded-lg" />
        )}
        <img
          ref={imageRef}
          className="h-auto w-full cursor-pointer"
          onClick={() => {
            navigate(item?.link?.split(".")[0]);
          }}
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
