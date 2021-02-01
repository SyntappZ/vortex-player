import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_SELECTED_ALBUM,
  SET_PLAYER_TRACK_DATA,
  SET_IS_PLAYING,
  SET_CURRENT_TRACK,

  } from "../actions/types";
  
  
  const initialState = {
    playerTracks: [],
    playerAlbumData: null,
    currentPlaylist: [],
    selectedAlbum:{},
    selectedFolder:{},
    isPlaying: false,
    currentPlayingTrack: {}

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
          playerAlbumData: payload
        };
      }
      case SET_PLAYER_TRACK_DATA: {
     
        return {
          ...state,
          playerTracks: payload,

        };
      }

      case SET_IS_PLAYING: {
        return {
          ...state,
          isPlaying: payload
        }
      }

      case SET_CURRENT_TRACK: {
        const track = payload
        const albumName = track.album
         track.cover = state.playerAlbumData[albumName].cover

        return {
          ...state,
          currentPlayingTrack: track
        }
      }

     
    
      default:
        return state;
    }
  };
  
  export default playerReducer;
  