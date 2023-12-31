import React from "react";
import icons from "../utils/icons";
import { Search } from "./";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { BsArrowLeft, BsArrowRight } = icons;

const Header = () => {
  const navigate = useNavigate();
  // const { singer } = useParams();
  const { scrollTop } = useSelector((state) => state.app);
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-6 w-full items-center">
        <div
          className={`flex gap-5 ${
            scrollTop ? "text-main-200" : "text-gray-400"
          }`}
        >
          <span onClick={() => navigate(-1)}>
            <BsArrowLeft size={24} />
          </span>
          <span onClick={() => navigate(1)}>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className="w-3/5">
          <Search />
        </div>
      </div>
      <div>Đăng nhập</div>
    </div>
  );
};

export default Header;
