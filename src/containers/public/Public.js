import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { LoadingSpinner } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const { singer } = useParams();
  const dispatch = useDispatch();
  const handleCrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.zeroScrollTop(true));
    } else {
      dispatch(actions.zeroScrollTop(false));
    }
  };
  return (
    <div className="w-full h-screen relative flex bg-main-300 flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none">
          <SidebarLeft />
        </div>
        <div className="relative flex-auto flex flex-col">
          {isLoading && (
            <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-main-300 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          <div
            className={`h-[70px] ${
              scrollTop ? "bg-transparent" : "bg-main-300"
            }  fixed top-0 left-[240px] right-[329px] z-[50] px-[59px] flex items-center`}
          >
            <Header />
          </div>
          <div className="w-full flex-auto">
            <Scrollbars
              onScroll={handleCrollTop}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <Outlet />
              <div className="w-full h-[120px]" />
            </Scrollbars>
          </div>
        </div>
        {isShowSidebarRight && (
          <div className="w-[329px] hidden 1600:flex flex-none animate-slide-left">
            <SidebarRight />{" "}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px] z-50">
        <Player setIsShowSidebarRight={setIsShowSidebarRight} />
      </div>
    </div>
  );
};

export default Public;
