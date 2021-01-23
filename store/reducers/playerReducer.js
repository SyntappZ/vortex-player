import {
    FETCH_TRACKS,
    FETCH_ALBUMS,
    FETCH_IMAGES,
  } from "../actions/types";
  
  
  const initialState = {
    coverImages: [],
    tracks: [],
    albums: [],
    folders: [],
    favorites: []
  };
  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRACKS: {
      
        return {
          ...state,
        };
      }
    
      default:
        return state;
    }
  };
  
  export default playerReducer;
  