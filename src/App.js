/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux"; // useSelector: Lấy dữ liệu từ redux, useDispatch: mang actions tới redux
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
  Singer
} from "./containers/public/";
import path from "./utils/path";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import * as actions from "./store/actions";

function App() {
  // tham số state: Đại diện cho các giá trị trong store mà trước đó mình lưu trữ
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, []);
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
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
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
