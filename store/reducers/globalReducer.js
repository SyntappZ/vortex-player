import {
  ADD_TRACKS,
  ADD_ALBUMS,
  ADD_FOLDERS,
  ADD_ALBUM_DATA,
  UPDATE_IMAGE,
  ADD_FAVORITE,
  ADD_FAVORITE_ALBUM,
  SET_PLAYER_VISIBILITY,
  APP_LOADED,
  ADD_STORAGE_FAVORITES,
  ADD_STORAGE_ALBUM_FAVORITES,
  ADD_FAVORITE_FOLDER,
  ADD_STORAGE_FOLDER_FAVORITES,
  SET_NOW_PLAYING_OPEN
} from '../actions/types';
import { convertListView, createFolders } from '../functions/converters.js';
import { storeData } from '../functions/storageFunctions.js';
const initialState = {
  albumData: {},
  tracks: [],
  albums: [],
  freshAlbums: [],
  foldersObject: {},
  folders: [],
  freshFolders: [],
  folderNames: [],
  folderFavorites: [],
  favorites: [],
  albumFavorites: [],
  appLoaded: false,
  sheetSnapPoint: 0,
  nowPlayingOpen: false
};

const sortFavoritesOrdered = (favorites, arr, orderedList = []) => {
  favorites = [...favorites];

  if (favorites.length < 1) return orderedList;
  const id = favorites.shift();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (id === item.id) {
      orderedList.push(item);
      break;
    }
  }
  return sortFavoritesOrdered(favorites, arr, orderedList);
};

const bringFavoritesToFront = (albums, favorites) => {
  if (favorites.length < 1) return albums;

  const favoriteAlbums = sortFavoritesOrdered(favorites, albums);

  const noneFavoriteAlbums = albums.filter(
    (album) => !favorites.includes(album.id),
  );

  return [...favoriteAlbums, ...noneFavoriteAlbums];
};

const globalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_STORAGE_FAVORITES: {
      const filterFavorites = sortFavoritesOrdered(payload, state.tracks);
      return {
        ...state,
        favorites: filterFavorites,
      };
    }
    case ADD_TRACKS: {
      const folders = createFolders(payload);

      const convertedFolders = Object.entries(folders).map((item) => {
        return {
          folder: item[0],
          tracks: item[1],
          numberOfSongs: item[1].length,
          id: `ID_${item[0]}${item[1][0].folderPath}`,
          folderPath: item[1][0].folderPath,
        };
      });

      const addedFavoriteFolders = bringFavoritesToFront(convertedFolders, state.folderFavorites);

      return {
        ...state,
        tracks: payload,
        foldersObject: folders,
        folders: addedFavoriteFolders,
        freshFolders: convertedFolders,
        folderNames: Object.keys(folders),
      };
    }

    case ADD_STORAGE_ALBUM_FAVORITES: {
      return {
        ...state,
        albumFavorites: payload,
      };
    }

    case ADD_STORAGE_FOLDER_FAVORITES: {
      return {
        ...state,
        folderFavorites: payload,
      };
    }


    case ADD_FAVORITE: {
      const id = payload;

      let favorites = [...state.favorites];
      const tempIds = favorites.map((track) => track.id);
      if (tempIds.includes(id)) {
        const alteredArray = favorites.filter((track) => track.id !== id);
        favorites = alteredArray;
      } else {
        const track = state.tracks.filter((track) => track.id === id)[0];

        favorites.unshift(track);
      }

      const ids = favorites.map((track) => track.id);

      storeData('favorites', ids);

      return {
        ...state,
        favorites: favorites,
      };
    }

    case ADD_FAVORITE_ALBUM: {
      const id = payload;
      let albums = [];
      let albumFavorites = [...state.albumFavorites];

      if (albumFavorites.includes(id)) {
        const filterFavoriteAlbum = albumFavorites.filter(
          (albumId) => albumId !== id,
        );

        albums = bringFavoritesToFront(state.freshAlbums, filterFavoriteAlbum);
        albumFavorites = filterFavoriteAlbum;
      } else {
        albumFavorites.unshift(id);
        albums = bringFavoritesToFront(state.freshAlbums, albumFavorites);
      }

      storeData('albumFavorites', albumFavorites);

      return {
        ...state,
        albums: albums,
        albumFavorites: albumFavorites,
      };
    }

    case ADD_FAVORITE_FOLDER: {
      const id = payload;
      let folders = [];
      let folderFavorites = [...state.folderFavorites];

      if (folderFavorites.includes(id)) {
        const filterFavoriteFolder = folderFavorites.filter(
          (folderId) => folderId !== id,
        );

        folders = bringFavoritesToFront(state.freshFolders, filterFavoriteFolder);
        folderFavorites = filterFavoriteFolder;
      } else {
        folderFavorites.unshift(id);
        folders = bringFavoritesToFront(state.freshFolders, folderFavorites);
      }

      storeData('folderFavorites', folderFavorites);

      return {
        ...state,
        folders: folders,
        folderFavorites: folderFavorites,
      };
    }

    case ADD_ALBUMS: {
      const sortAlbums = Object.values(payload).sort(
        (a, b) => parseInt(b.numberOfSongs) - parseInt(a.numberOfSongs),
      );

      const filterFolders = sortAlbums.filter(
        (album) => !state.folderNames.includes(album.album),
      );

      const albums = bringFavoritesToFront(filterFolders, state.albumFavorites);

      return {
        ...state,
        albums: albums,
        freshAlbums: filterFolders,
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

    case SET_NOW_PLAYING_OPEN: {
      return {
        ...state,
        nowPlayingOpen: payload,
      };
    }

    default:
      return state;
  }
};

export default globalReducer;
