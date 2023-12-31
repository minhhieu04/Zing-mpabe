/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"; // useSelector: Lấy dữ liệu từ redux, useDispatch: mang actions tới redux
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  WeekRank,
  ZingChart,
  Search,
  SearchAll,
  SearchSongs,
  SearchPlaylist,
  SearchArtist,
  Singer,
} from "./containers/public/";
import path from "./utils/path";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import * as actions from "./store/actions";
import { apiGetChartHome } from "./apis";

function App() {
  // tham số state: Đại diện cho các giá trị trong store mà trước đó mình lưu trữ
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);
  // get first time the width
  const [currentWidth, setCurrentWidth] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) setWeekChart(response.data.data.weekChart);
    };
    fetchChartData();
  }, []);

  // function setWidth when resize
  const setWidth = (e) => {
    setCurrentWidth(e.target.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  // Pass the width to the pages
  // useEffect(() => {
  //   dispatch.actions.setCurrentWidth(currentWidth);
  // }, [currentWidth]);

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route
              path={path.WEEKRANK__TITLE__PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME__ARTIST__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONGS} element={<SearchSongs />} />
              <Route path={path.PLAYLIST} element={<SearchPlaylist />} />
              <Route path={path.ARTIST} element={<SearchArtist />} />
            </Route>

            <Route path={path.START} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
