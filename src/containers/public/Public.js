import React from "react";
import { Outlet } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex bg-[#ced9d9]">
      <div className="w-[240px] flex-none border border-blue-500">
        <SidebarLeft />
      </div>
      <div className="flex-auto border border-red-400">
        <Outlet />
      </div>
      <div className="w-[329px] flex-none border border-green-400">
        <SidebarRight />
      </div>
    </div>
  );
};

export default Public;
