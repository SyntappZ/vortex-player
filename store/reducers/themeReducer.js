import {CHANGE_THEME, STORE_THEME} from '../actions/types';
const bluenew = "#192240"
const themes = {
  // blue: {
  //   color: 'blue',
  //   background: '#0d0d0d',
  //   lightBackground: '#141414',
  //   extraLightBackground: '#202020',
  //   bottomPlayer: "#18181A",
  //   border: '#323232',
  //   primary: '#2A56B9',
  //   secondary: '#333333',
  //   folderColor: "#074DD9",
  //   subtext: "#888888",
  //   text: "#ffffff"
  // },
  lightBlue: {
    color: 'lightBlue',
    background: '#151D39',
    lightBackground: '#eeeeee',
    extraLightBackground: '#ffffff',
    bottomPlayer: "#192240",
    // border: '#323232',
    primary: '#374780',
    secondary: '#9CAADD',
    
    folderColor: "#151D39",
    
    subtext: '#aaaaaa',
    text: "#555555",
    titleColor: "#ffffff",
    line: "#334171",
    vinalColor: "#425390"
  },
};

const initialState = {
  theme: themes.lightBlue,
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
