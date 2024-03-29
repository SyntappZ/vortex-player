import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_ALBUM,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_PLAYER_TRACK_DATA,
  SET_IS_PLAYING,
  SET_CURRENT_TRACK,
  SET_ALL_TRACKS,
  LOAD_FIRST_TRACKS,
  HANDLE_SHUFFLE,
  PLAY_FIRST_SONG,
  PLAY_SONG,
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

const setAllTracks = (payload) => ({
  type: SET_ALL_TRACKS,
  payload: payload,
});
const loadFirstTracks = () => ({
  type: LOAD_FIRST_TRACKS,
});
const playFirstSong = (payload) => ({
  type: PLAY_FIRST_SONG,
  payload: payload,
});

const handleShuffle = (payload) => ({
  type: HANDLE_SHUFFLE,
  payload: payload,
});

const playSong = (payload) => ({
  type: PLAY_SONG,
  payload: payload,
});

const setPlaylist = (playlist, track) => {
  return async (dispatch) => {
    await dispatch(setCurrentPlaylist({ playlist: playlist, track: track }));
  };
};

const handleShuffleAsync = (playlist) => {
  return async (dispatch) => {
    await dispatch(handleShuffle(playlist));
    dispatch(playFirstSong());
  };
};

const setPlayerData = (albumData, tracks) => {
  return async (dispatch) => {
    await dispatch(setPlayerAlbumData(albumData));
    await dispatch(setPlayerTrackData(tracks));
    await dispatch(loadFirstTracks());
  };
};

export {
  setCurrentPlaylist,
  setSelectedAlbum,
  setSelectedFolder,
  setPlayerAlbumData,
  setPlayerTrackData,
  setIsPlaying,
  setCurrentTrack,
  setPlaylist,
  setPlayerData,
  setAllTracks,
  loadFirstTracks,
  handleShuffleAsync,
};
