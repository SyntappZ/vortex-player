import { fetchData } from '../functions/storageFunctions.js';
import { getMusicTracks, getMusicAlbums } from '../functions/fetchMusic.js';
import {
  trackConverter,
  createFolders,
  convertImageToBase64,
} from '../functions/converters.js';

import {
  ADD_TRACKS,
  ADD_ALBUMS,
  ADD_FOLDERS,
  UPDATE_IMAGE,
  APP_LOADED,
  SET_PLAYER_VISIBILITY,
  ADD_FAVORITE,
  ADD_STORAGE_FAVORITES,
  ADD_FAVORITE_ALBUM,
  ADD_STORAGE_ALBUM_FAVORITES,
  ADD_FAVORITE_FOLDER,
  ADD_STORAGE_FOLDER_FAVORITES,
  SET_NOW_PLAYING_OPEN,
  SHOW_BOTTOM_PLAYER
} from './types';

const addTracksToAlbums = async (albums, tracks, output = {}) => {
  if (albums.length < 1) return output;
  const album = albums.shift();
  const id = album.album;
  const albumTracks = tracks.filter((track) => {
    return track.album === album.album;
  });

  const artwork = await convertImageToBase64(album.cover);

  const allDetails = {
    ...album,
    tracks: albumTracks,
    artwork: artwork,
    artist: album.author == '<unknown>' ? null : album.author,
  };

  output[id] = allDetails;

  return addTracksToAlbums(albums, tracks, output);
};

const fetchAll = () => {
  return async (dispatch) => {
    const musicAlbums = await getMusicAlbums();

    const musicTracks = await getMusicTracks();

    const albumFavorites = await fetchData('albumFavorites');
    dispatch(addStorageAlbumFavorites(albumFavorites));
    const folderFavorites = await fetchData('folderFavorites');
    dispatch(addStorageFolderFavorites(folderFavorites));

    musicTracks.forEach((track, i) => {
      const splitPath = track.path.split('/').reverse();
      const folder = splitPath[1];
      const folderPath = splitPath[2];
      track.folder = folder;
      track.folderPath = `/${folderPath}`;
    });

    // console.log(Object.values(count).filter(item => item > 1));

    const tracks = trackConverter(musicTracks);
    dispatch(addTracks(tracks));

    const albumsObject = await addTracksToAlbums(musicAlbums, tracks);

    dispatch(addAlbums(albumsObject));
    const favorites = await fetchData('favorites');
    dispatch(addStorageFavorites(favorites));

    dispatch(setAppLoaded(true))
  };
};

const addFavorite = (payload, type) => {
  // console.log(`album id ${payload}`)
  return async (dispatch) => {
    if (type === 'track') {
      dispatch(addFavoriteTrack(payload));
    } else if (type === 'album') {
      dispatch(addFavoriteAlbum(payload));
    } else {
      dispatch(addFavoriteFolder(payload));
    }
  };
};

const fetchCoverArt = (albums) => {
  return async (dispatch) => {};
};

const updateImage = (payload) => ({
  type: UPDATE_IMAGE,
  payload: payload,
});

const addFavoriteTrack = (payload) => ({
  type: ADD_FAVORITE,
  payload: payload,
});

const addFavoriteAlbum = (payload) => ({
  type: ADD_FAVORITE_ALBUM,
  payload: payload,
});

const addFavoriteFolder = (payload) => ({
  type: ADD_FAVORITE_FOLDER,
  payload: payload,
});

const addTracks = (payload) => ({
  type: ADD_TRACKS,
  payload: payload,
});

const addStorageFavorites = (payload) => ({
  type: ADD_STORAGE_FAVORITES,
  payload: payload,
});

const addStorageAlbumFavorites = (payload) => ({
  type: ADD_STORAGE_ALBUM_FAVORITES,
  payload: payload,
});
const addStorageFolderFavorites = (payload) => ({
  type: ADD_STORAGE_FOLDER_FAVORITES,
  payload: payload,
});

const addAlbums = (payload) => ({
  type: ADD_ALBUMS,
  payload: payload,
});

const addFolders = (payload) => ({
  type: ADD_FOLDERS,
  payload: payload,
});

const setAppLoaded = (payload) => ({
  type: APP_LOADED,
  payload: payload,
});

const showBottomPlayer = payload => ({
  type: SHOW_BOTTOM_PLAYER,
  payload: payload,
})

const setPlayerVisibility = (payload) => ({
  type: SET_PLAYER_VISIBILITY,
  payload: payload,
});

const setNowPlayingOpen = (payload) => ({
  type: SET_NOW_PLAYING_OPEN,
  payload: payload
})

export {
  fetchAll,
  updateImage,
  setAppLoaded,
  setPlayerVisibility,
  addFavorite,
  setNowPlayingOpen,
  showBottomPlayer
};
