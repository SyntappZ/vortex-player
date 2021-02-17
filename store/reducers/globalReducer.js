import {
  ADD_TRACKS,
  ADD_ALBUMS,
  ADD_FOLDERS,
  ADD_ALBUM_DATA,
  UPDATE_IMAGE,
  ADD_FAVORITES,
  SET_PLAYER_VISIBILITY,
  APP_LOADED,
} from '../actions/types';
import { convertListView, createFolders } from '../functions/converters.js';

const initialState = {
  albumData: {},
  tracks: [],
  albums: [],
  foldersObject: {},
  folders: [],
  folderNames: [],
  favorites: [],
  appLoaded: false,
  sheetSnapPoint: 0,
};
const globalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TRACKS: {
      const folders = createFolders(payload);
      const folderArray = Object.entries(folders).map((item, index) => ({
        type: 'FOLDERS',
        item: {
          folder: item[0],
          tracks: item[1],
          numberOfSongs: item[1].length,
          id: `ID_${index}`,
          folderPath: item[1][0].folderPath,
        },
      }));

      return {
        ...state,
        tracks: payload,
        foldersObject: folders,
        folders: folderArray,
        folderNames: Object.keys(folders),
      };
    }
    case ADD_ALBUMS: {
      const sortedAlbums = Object.values(payload).sort(
        (a, b) => parseInt(b.numberOfSongs) - parseInt(a.numberOfSongs));


      const filterFolders = sortedAlbums.filter(
        (album) => !state.folderNames.includes(album.album),
      );

    
      return {
        ...state,
        albums: convertListView(filterFolders ,'ALBUMS'),
        albumData: payload,
      };
    }

    case ADD_FOLDERS: {
      return {
        ...state,
      };
    }

    case APP_LOADED: {
      return {
        ...state,
        appLoaded: true,
        bottomPlayerPosition: 20,
      };
    }

    case SET_PLAYER_VISIBILITY: {
      

      return {
        ...state,
        sheetSnapPoint: 0,
      };
    }

    case UPDATE_IMAGE: {
      return {
        ...state,
        albumData: payload,
      };
    }

    default:
      return state;
  }
};

export default globalReducer;
