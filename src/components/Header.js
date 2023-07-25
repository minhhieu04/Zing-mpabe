import React from "react";
import icons from "../utils/icons";
import { Search } from "./";

const { BsArrowLeft, BsArrowRight } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-5 text-gray-400">
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div>Đăng nhập</div>
    </div>
  );
};

export default Header;
