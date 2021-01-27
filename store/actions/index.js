import {fetchAlbums, updateImage, setAppLoaded, setPlayerVisibility} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';

const AllActions = {
  fetchAlbums,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
  updateImage,
  setAppLoaded,
  setPlayerVisibility
};

export default AllActions;
