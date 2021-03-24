import {
  fetchAll,
  updateImage,
  setAppLoaded,
  setPlayerVisibility,
  fetchFavorites,
  addFavorite,
  setNowPlayingOpen
} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';
import {
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
  handleShuffleAsync
} from './playerActions';

const AllActions = {
  fetchAll,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
  updateImage,
  setAppLoaded,
  setPlayerVisibility,
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
  fetchFavorites,
  addFavorite,
  loadFirstTracks,
  handleShuffleAsync,
  setNowPlayingOpen
};

export default AllActions;
