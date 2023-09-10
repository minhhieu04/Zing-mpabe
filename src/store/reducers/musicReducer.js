import actionTypes from "../actions/actionTypes";

const initState = {
  curSongId: null,
  isPlaying: false,
  songs: null,
  curSongData: null,
  curAlbumId: null,
  recentSongs: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.pid || null,
      };
    case actionTypes.SET_RECENT_SONG:
      const newData = action.data;
      const existingIndex = state.recentSongs.findIndex(
        (song) => song.sid === newData.sid
      );

      let updatedRecentSongs;

      // Nếu data đã tồn tại trong mảng, thì xoá nó đi
      if (existingIndex !== -1) {
        updatedRecentSongs = [...state.recentSongs];
        updatedRecentSongs.splice(existingIndex, 1);
      } else {
        updatedRecentSongs = [...state.recentSongs];
      }

      // Chèn data vào đầu mảng
      updatedRecentSongs.unshift(newData);

      // Giới hạn mảng chỉ có 20 phần tử
      if (updatedRecentSongs.length > 20) {
        updatedRecentSongs.pop(); // Xoá phần tử cuối cùng
      }

      return {
        ...state,
        recentSongs: updatedRecentSongs,
      };

    default:
      return state;
  }
};

export default musicReducer;
