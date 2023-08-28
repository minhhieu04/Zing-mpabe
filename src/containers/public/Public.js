import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // dùng để hiển thị các trang con của public
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";

const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
  return (
    <div className="w-full h-screen relative flex bg-main-300 flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto flex flex-col border border-red-400">
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
      <div className="fixed bottom-0 left-0 right-0 h-[90px]">
        <Player setIsShowSidebarRight={setIsShowSidebarRight} />
      </div>
    </div>
  );
};

export default Public;
