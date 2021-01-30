import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_ALBUM,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_PLAYER_TRACK_DATA,
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

export {
  setCurrentPlaylist,
  setSelectedAlbum,
  setSelectedFolder,
  setPlayerAlbumData,
  setPlayerTrackData,
};
