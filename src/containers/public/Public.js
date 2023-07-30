import React from "react";
import { Outlet } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight, Player } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex bg-[#ced9d9] flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] min-h-screen flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-400">
          <Outlet />
        </div>
        <div className="w-[329px] flex-none border border-green-400">
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
