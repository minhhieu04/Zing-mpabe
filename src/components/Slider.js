import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArrSlider } from "../utils/fn";
import * as actions from "../store/actions";
const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //animation for slider
  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 1;
    let max = 3;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);

      for (let i = 0; i < sliderEls.length; i++) {
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-0"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-0"
        );

        if (list.some((item) => item === i)) {
          sliderEls[i].style.cssText = `display: block`;
        } else {
          sliderEls[i].style.cssText = `display: none`;
        }
      }
      list.forEach((item) => {
        if (item === max) {
          sliderEls[max]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-10"
          );
        } else if (item === min) {
          sliderEls[min]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-0"
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-0"
          );
        }
      });
      if (min === sliderEls.length - 1) {
        min = 0;
      } else {
        min += 1;
      }
      if (max === sliderEls.length - 1) {
        max = 0;
      } else {
        max += 1;
      }
    }, 3000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    }
    if (item?.type === 4) {
      // console.log(item);
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  return (
    <div className="flex gap-8 w-full overflow-hidden px-[59px] pt-8">
      {banner?.map((item, index) => (
        <img
          key={item.encodeId}
          src={item.banner}
          onClick={() => handleClickBanner(item)}
          className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
            index <= 2 ? "block" : "hidden"
          }`}
        />
      ))}
    </div>
  );
};

export default Slider;
