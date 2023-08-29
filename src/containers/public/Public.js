import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { LoadingSpinner } from "../../components";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div className="w-full h-screen relative flex bg-main-300 flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="relative flex-auto flex flex-col border border-red-400">
          {isLoading && (
            <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-main-300 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          <div className="h-[70px] flex-none px-[59px] flex items-center">
            <Header />
          </div>
          <div className="w-full flex-auto">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowSidebarRight && (
          <div className="w-[329px] hidden 1600:flex flex-none border border-green-400 animate-slide-left">
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
