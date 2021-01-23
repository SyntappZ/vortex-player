import {
  CHANGE_THEME,
  STORE_THEME,
  CHANGE_THEME_COLORS,
  TOGGLE_PANEL,
  ACTIVATE_PREMIUM_THEMES,
  SHOW_TAB_LABELS
} from "./types";
import { fetchData } from "../storageFunctions.js";

const changeTheme = (obj) => ({
  type: CHANGE_THEME,
  payload: obj,
});

const changeThemeColors = (colors) => ({
  type: CHANGE_THEME_COLORS,
  payload: colors,
});

const fetchThemeFromStorage = (isPremium) => {
  return async (dispatch) => {
    const theme = await fetchData("themeStorage");

    if (theme) {
      dispatch(changeTheme(theme.darkMode));
      dispatch(showTabLabels(theme.showTabLabels))
      if (isPremium) {
        dispatch(changeThemeColors(theme.themeColors));
      } else {
        dispatch(changeThemeColors("red"));
      }
    }
  };
};

const activatePremiumThemes = (premium) => ({
  type: ACTIVATE_PREMIUM_THEMES,
  payload: premium
})
const storeTheme = () => ({
  type: STORE_THEME,
  payload: null,
});

const togglePanel = (open) => ({
  type: TOGGLE_PANEL,
  payload: open,
});

const showTabLabels = (visible) => ({
  type: SHOW_TAB_LABELS,
  payload: visible
})

export {
  changeTheme,
  fetchThemeFromStorage,
  storeTheme,
  changeThemeColors,
  togglePanel,
  activatePremiumThemes,
  showTabLabels,
};
