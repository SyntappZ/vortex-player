import {fetchTracks} from './globalActions.js';

import {changeTheme, fetchThemeFromStorage, storeTheme} from './themeActions';

const allActions = {
  fetchTracks,
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
};

export default allActions;
