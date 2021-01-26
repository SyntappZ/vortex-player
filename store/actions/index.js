import {fetchTracks, fetchAlbums, updateImage} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';

const AllActions = {
  fetchTracks,
  fetchAlbums,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
  updateImage
};

export default AllActions;
