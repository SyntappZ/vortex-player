import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_ALBUM,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_PLAYER_TRACK_DATA,
  SET_IS_PLAYING,
  SET_CURRENT_TRACK,
} from './types';


const setCurrentPlaylist = (payload) => ({
  type: SET_CURRENT_PLAYLIST,
  payload: payload,
});
const setSelectedAlbum = (payload) => ({
  type: SET_SELECTED_ALBUM,
  payload: payload,
});
const setSelectedFolder = (payload) => ({
  type: SET_SELECTED_FOLDER,
  payload: payload,
});
const setPlayerAlbumData = (payload) => ({
  type: SET_PLAYER_ALBUM_DATA,
  payload: payload,
});

const setPlayerTrackData = (payload) => ({
  type: SET_PLAYER_TRACK_DATA,
  payload: payload,
});

const setIsPlaying = (payload) => ({
  type: SET_IS_PLAYING,
  payload: payload,
});

const setCurrentTrack = (payload) => ({
  type: SET_CURRENT_TRACK,
  payload: payload,
});



const setPlaylist = (playlist, track) => {
  return async (dispatch) => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentTrack(track));
  };
};

const setPlayerData = (albumData, tracks) => {
  return async (dispatch) => {
   await dispatch(setPlayerAlbumData(albumData));
    dispatch(setPlayerTrackData(tracks));
  };
}



export {
  setCurrentPlaylist,
  setSelectedAlbum,
  setSelectedFolder,
  setPlayerAlbumData,
  setPlayerTrackData,
  setIsPlaying,
  setCurrentTrack,
  setPlaylist,
  setPlayerData
};
