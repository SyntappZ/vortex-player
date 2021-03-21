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
  folderNames: [],
  favorites: [],
  albumFavorites: [],
  appLoaded: false,
  sheetSnapPoint: 0,
};

const bringFavoritesToFront = (albums, favorites) => {
  if (favorites.length < 1) return albums;
  const favoriteAlbums = albums.filter((album) => favorites.includes(album.id));
  const noneFavoriteAlbums = albums.filter(
    (album) => !favorites.includes(album.id),
  );

  return [...favoriteAlbums, ...noneFavoriteAlbums];
};
const globalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_STORAGE_FAVORITES: {
      const favoritesIds = payload;

      const filterFavorites = state.tracks.filter((track) =>
        favoritesIds.includes(track.id),
      );
      return {
        ...state,
        favorites: filterFavorites,
      };
    }
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

    case ADD_STORAGE_ALBUM_FAVORITES: {
      return {
        ...state,
        albumFavorites: payload,
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
        freshAlbums: albums,
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
