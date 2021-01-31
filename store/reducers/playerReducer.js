import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_SELECTED_ALBUM,
  SET_PLAYER_TRACK_DATA,

  } from "../actions/types";
  
  
  const initialState = {
    tracks: [],
    albumData: {},
    currentPlaylist: [],
    selectedAlbum:{},
    selectedFolder:{}


  };
  const playerReducer = (state = initialState, action) => {
    const {payload} = action
    switch (action.type) {
      case SET_CURRENT_PLAYLIST: {
      
        return {
          ...state,
        
        };
      }
      case SET_SELECTED_ALBUM: {
      
        return {
          ...state,
          selectedAlbum: payload
        };
      }
      case SET_SELECTED_FOLDER: {
      
        return {
          ...state,
          selectedFolder: payload
        };
      }
      case SET_PLAYER_ALBUM_DATA: {
    
        return {
          ...state,
          albumData: payload
        };
      }
      case SET_PLAYER_TRACK_DATA: {
      
        return {
          ...state,
          tracks: payload
        };
      }

     
    
      default:
        return state;
    }
  };
  
  export default playerReducer;
  