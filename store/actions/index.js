import {fetchTracks, fetchAlbums} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';

const AllActions = {
  fetchTracks,
  fetchAlbums,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
};

export default AllActions;
