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
  ADD_STORAGE_FAVORITES
} from './types';

// const createCoverArtObject = async (arr, objData = {}) => {
//   if (arr.length < 1) return objData;

//   const album = arr.shift();

//   const author = album[1][0].author;

//   const albumName = album[0];
//   const tracks = album[1];
//   objData[albumName] = {
//     cover: '',
//     tracks: tracks,
//     totalTracks: tracks.length,
//   };

//   return createCoverArtObject(arr, objData);
// };

const addTracksToAlbums = async (albums, tracks, output = {}) => {
  if (albums.length < 1) return output;
  const album = albums.shift();
  const id = album.album;
  const albumTracks = tracks.filter((track) => {
    return track.album === album.album;
  });

  const artwork = await convertImageToBase64(album.cover);

  // console.log(albumTracks)

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
  };
};



const fetchCoverArt = (albums) => {
  return async (dispatch) => {};
};

const updateImage = (payload) => ({
  type: UPDATE_IMAGE,
  payload: payload,
});

const addFavorite = (payload) => ({
  type: ADD_FAVORITE,
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

const addAlbums = (payload) => ({
  type: ADD_ALBUMS,
  payload: payload,
});

const addFolders = (payload) => ({
  type: ADD_FOLDERS,
  payload: payload,
});

const setAppLoaded = () => ({
  type: APP_LOADED,
  payload: null,
});

const setPlayerVisibility = (payload) => ({
  type: SET_PLAYER_VISIBILITY,
  payload: payload,
});

export {
  fetchAll,
  updateImage,
  setAppLoaded,
  setPlayerVisibility,
  addFavorite
};
