import appReducer from "../reducers/appReducer";
import musicReducer from "./musicReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const comonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const configMusic = {
  ...comonConfig,
  key: "music",
  whitelist: ["curSongId", "curSongData", "curAlbumId", "recentSongs"],
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(configMusic, musicReducer),
});

export default rootReducer;
