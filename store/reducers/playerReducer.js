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
  HANDLE_SHUFFLE,
  PLAY_FIRST_SONG
} from '../actions/types';
import defaultImage from '../../images/defaultNote.jpg';
import TracksView from '../../views/swipeScreens/TracksView';
import {
  firstLoad,
  playTrackFromId,
  loadPlaylist,
  addPlaylstAndPlay,
  skipAndPlay,
} from '../functions/playerFunctions.js';
const initialState = {
  playerTracks: null,
  playerAlbumData: null,
  currentPlaylist: [],
  tracksViewPlaylist: [],
  cleanPlaylist: [],
  shuffledPlaylist: [],
  isShuffleOn: false,
  currentPlaylistId: null,
  selectedAlbum: {},
  selectedFolder: {},
  isPlaying: false,
  currentPlayingTrack: {},
  firstTrackLoaded: false,
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const playerReducer = (state = initialState, action) => {
  const { payload } = action;
  const playlistConverter = (arr) => {
    if(arr[0].converted) return arr

    return arr.map((item) => ({
      id: item.id,
      album: item.album,
      artist: item.artist,
      title: item.title,
      duration: item.seconds,
      url: item.path,
      artwork: item.artwork,
      converted: true
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
        cleanPlaylist: data,
        tracksViewPlaylist: playlist,
        currentPlaylistId: id,
        isShuffleOn: false
       
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
        cleanPlaylist: data,
        tracksViewPlaylist: payload,
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

    case HANDLE_SHUFFLE: {
 
      const playlist = [...payload]
      const shuffledPlaylist = shuffle(playlist)
      const data = playlistConverter(shuffledPlaylist);
      
      const id = data.map((item) => item.id).join('');
      return {
        ...state,
        isShuffleOn: true,
        cleanPlaylist: playlistConverter(playlist),
        tracksViewPlaylist: shuffledPlaylist,
        currentPlaylist: data,
        currentPlaylistId: id
      }
    }

    case PLAY_FIRST_SONG: {
      addPlaylstAndPlay(state.currentPlaylist, state.currentPlaylist[0].id);
      return state
    }

    case PLAY_SONG: {
      
      addPlaylstAndPlay(state.currentPlaylist, payload);
      return state
    }

    default:
      return state;
  }
};

export default playerReducer;
