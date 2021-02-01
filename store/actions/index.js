import {
  fetchAlbums,
  updateImage,
  setAppLoaded,
  setPlayerVisibility,
} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';
import {
  setCurrentPlaylist,
  setSelectedAlbum,
  setSelectedFolder,
  setPlayerAlbumData,
  setPlayerTrackData,
  setIsPlaying,
  setCurrentTrack
} from './playerActions';

const AllActions = {
  fetchAlbums,
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
  setCurrentTrack
};

export default AllActions;
