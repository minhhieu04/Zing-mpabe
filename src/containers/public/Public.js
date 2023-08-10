import React from "react";
import { Outlet } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
  return (
    <div className="w-full h-screen relative flex bg-main-300 flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-400">
          <div className="h-[70px] px-[59px] flex items-center mb-5">
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="w-[329px] hidden 1600:flex flex-none border border-green-400 animate-slide-left">
          <SidebarRight />
        </div>
      </div>
      <div className="flex-none h-[90px]">
        <Player />
      </div>
    </div>
  );
};

export default Public;
