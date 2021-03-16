import {
  SET_CURRENT_PLAYLIST,
  SET_SELECTED_FOLDER,
  SET_PLAYER_ALBUM_DATA,
  SET_SELECTED_ALBUM,
  SET_PLAYER_TRACK_DATA,
  SET_IS_PLAYING,
  SET_CURRENT_TRACK,
  PLAY_PLAYLIST,
  PLAY_SONG,
  SET_ALL_TRACKS,
  LOAD_FIRST_TRACKS,
} from '../actions/types';
import defaultImage from '../../images/defaultNote.jpg';
import TracksView from '../../views/swipeScreens/TracksView';
import {
  firstLoad,
  playTrackFromId,
  loadPlaylist,
  addPlaylstAndPlay,
  skipAndPlay
} from '../functions/playerFunctions.js';
const initialState = {
  playerTracks: null,
  playerAlbumData: null,
  currentPlaylist: [],
  currentPlaylistId: null,
  selectedAlbum: {},
  selectedFolder: {},
  isPlaying: false,
  currentPlayingTrack: {},
  firstTrackLoaded: false,
};
const playerReducer = (state = initialState, action) => {
  const { payload } = action;
  const playlistConverter = (arr) => {
    return arr.map((item) => ({
      id: item.id,
      album: item.album,
      artist: item.artist,
      title: item.title,
      duration: item.duration,
      url: item.path,
      artwork: state.playerAlbumData[item.album].artwork || null,
    }));
  };
  switch (action.type) {
    case SET_CURRENT_PLAYLIST: {
      const { playlist, track } = payload;
      const data = playlistConverter(playlist);
      const id = data.map((item) => item.id).join('');

      if (id === state.currentPlaylistId) {
        skipAndPlay(track.id);
      } else {
        addPlaylstAndPlay(data, track.id);
      }

      return {
        ...state,
        currentPlaylist: data,
        currentPlaylistId: id,
        // currentPlayingTrack: track
      };
    }
    case SET_SELECTED_ALBUM: {
      return {
        ...state,
        selectedAlbum: payload,
      };
    }
    case SET_SELECTED_FOLDER: {
      return {
        ...state,
        selectedFolder: payload,
      };
    }
    case SET_PLAYER_ALBUM_DATA: {
      return {
        ...state,
        playerAlbumData: payload,
      };
    }
    case SET_PLAYER_TRACK_DATA: {
      const data = playlistConverter(payload);
      const id = data.map((item) => item.id).join('');
      let track = data[0];
      
     
     
      return {
        ...state,
        playerTracks: data,
        currentPlaylist: data,
        currentPlaylistId: id,
        currentPlayingTrack: track,
      };
    }

    case SET_IS_PLAYING: {
      return {
        ...state,
        isPlaying: payload,
      };
    }

    case SET_CURRENT_TRACK: {
      let track = payload;

      // const albumName = track.album;
      // track.artwork = state.playerAlbumData[albumName].artwork;
      // track.artist = track.author;

      return {
        ...state,
        currentPlayingTrack: track,
      };
    }

    case LOAD_FIRST_TRACKS: {
      const playlist = state.currentPlaylist;
      firstLoad(playlist, playlist[0].id);

      return {
        ...state,
        firstTrackLoaded: true,
      };
    }

    case SET_ALL_TRACKS: {
      // const playlist = state.playerTracks;
      // // console.log(playlist)
      // const id = playlist.map((item) => item.id).join('');
      // // console.log('add all tracks')
      // // console.log(state.playerTracks)
      // if (id === state.currentPlaylistId) {
  
      //   skipAndPlay(payload.id);
      // } else {
        
        
      //   addPlaylstAndPlay(playlist, payload.id);
      // }
      return {
        ...state,
        // currentPlaylist: playlist,
        // currentPlaylistId: id,
        // currentPlayingTrack: payload
      };
    }

    case PLAY_SONG: {
      const { playlist, track } = payload;
      addPlaylstAndPlay(playlist, track.id);
    }

    default:
      return state;
  }
};

export default playerReducer;
