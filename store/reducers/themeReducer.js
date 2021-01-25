import {CHANGE_THEME, STORE_THEME} from '../actions/types';

const themes = {
  blue: {
    color: 'blue',
    background: '#0d0d0d',
    lightBackground: '#131313',
    primary: '#2A56B9',
    secondary: '#0B64D9',
    folderColor: "#074DD9"
  },
};

const initialState = {
  theme: themes.blue,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      const color = action.payload;
      return {
        ...state,
        theme: themes[color],
      };
    }

    case STORE_THEME: {
      return state;
    }

    default:
      return state;
  }
};

export default themeReducer;
