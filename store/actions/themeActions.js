import {CHANGE_THEME, STORE_THEME} from './types';
// import { fetchData } from "../storageFunctions.js";

const changeTheme = (color) => ({
  type: CHANGE_THEME,
  payload: color,
});

// const fetchThemeFromStorage = (isPremium) => {
//   return async (dispatch) => {
//     const theme = await fetchData("themeStorage");

//     if (theme) {
//       dispatch(changeTheme(theme.darkMode));
//       dispatch(showTabLabels(theme.showTabLabels))
//       if (isPremium) {
//         dispatch(changeThemeColors(theme.themeColors));
//       } else {
//         dispatch(changeThemeColors("red"));
//       }
//     }
//   };
// };

const storeTheme = () => ({
  type: STORE_THEME,
  payload: null,
});

export {changeTheme, storeTheme};
