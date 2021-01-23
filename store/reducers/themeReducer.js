import {
  CHANGE_THEME,
  STORE_THEME,
  CHANGE_THEME_COLORS,
  TOGGLE_PANEL,
  ACTIVATE_PREMIUM_THEMES,
  SHOW_TAB_LABELS,
} from "../actions/types";

import { storeData } from "../storageFunctions.js";
import { freeThemeObject, premiumThemeObject } from "../data.js";

const red = {
  title: "red",
  mainColor: "#701326",
  secondaryColor: "#A8203B",
  tabsColor: "#5C1120",
  premium: true,
};

const darkTheme = {
  darkColor: "#111",
  mediumColor: "#222",
  lightColor: "#333",
  mainTextColor: "#fff",
  status: "light",
  textColor: "#555",
  subtitleColor: "grey",
  activeColor: "#fff",
  borderColor: "#333",
  saveButtonColor: "grey",
};

const lightTheme = {
  darkColor: "#fff",
  mediumColor: "#eee",
  lightColor: "#dedede",
  mainTextColor: "#000",
  status: "dark",
  subtitleColor: "#111",
  textColor: "#222",
  activeColor: "#5C1120",
  borderColor: "#dedede",
  saveButtonColor: "#666",
};

const initialState = {
  darkMode: true,
  themeMode: darkTheme,
  chosenColor: "red",
  themeColors: red,
  panelClosed: true,
  themeColorsObject: freeThemeObject,
  showTabLabels: true,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      const darkMode = action.payload;
     
      const theme = darkMode ? darkTheme : lightTheme;
      return {
        ...state,
        themeMode: theme,
        darkMode: darkMode,
      };
    }

    case ACTIVATE_PREMIUM_THEMES: {
      const theme = action.payload ? premiumThemeObject : freeThemeObject;
    
      return {
        ...state,
        themeColorsObject: theme,
      };
    }
    case CHANGE_THEME_COLORS: {
      const colors = state.themeColorsObject[action.payload];
      return {
        ...state,
        themeColors: colors,
        chosenColor: action.payload,
      };
    }

    case STORE_THEME: {
      
     
      storeData("themeStorage", {
        darkMode: state.darkMode,
        themeColors: state.chosenColor,
        showTabLabels: state.showTabLabels,
      });
      return state;
    }

    case TOGGLE_PANEL: {
      return {
        ...state,
        panelClosed: action.payload,
      };
    }
    case SHOW_TAB_LABELS: {
      const visible = action.payload;
      return {
        ...state,
        showTabLabels: visible,
      };
    }

    default:
      return state;
  }
};

export default themeReducer;
