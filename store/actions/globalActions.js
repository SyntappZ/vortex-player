import {fetchAlbumArt} from '../functions/AlbumArtApi.js';
import {getMusicTracks, getMusicAlbums} from '../functions/fetchMusic.js';
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
} from './types';

const createCoverArtObject = async (arr, objData = {}) => {
  if (arr.length < 1) return objData;

  const album = arr.shift();

  const author = album[1][0].author;

  const image = await fetchAlbumArt(author, album[0]);

  const albumName = album[0];
  const tracks = album[1];
  objData[albumName] = {
    cover: '',
    tracks: tracks,
    totalTracks: tracks.length,
  };

  return createCoverArtObject(arr, objData);
};

const addTracksToAlbums = (albums, tracks, output = {}) => {
  if (albums.length < 1) return output;
  const album = albums.shift();
  const id = album.id;
  // console.log(tracks[0])
  const albumTracks = tracks.filter((track) => {
    track.albumId = id;
    return track.album === album.album;
  });
  const allDetails = {
    ...album,
    tracks: albumTracks,
    cover: album.cover === 'null' ? null : album.cover,
    author: album.author == '<unknown>' ? null : album.author,
  };

  output[id] = allDetails;

  return addTracksToAlbums(albums, tracks, output);
};

const addCoversToAlbums = async (keys, object, output = {}) => {
  if (keys.length < 1) return output;

  const key = keys.shift();

  const cover = await convertImageToBase64(object[key].cover);

  object[key].cover = cover ? cover : null;

  output[key] = object[key];

  return addCoversToAlbums(keys, object, output);
};

const fetchAlbums = () => {
  return async (dispatch) => {
    const musicAlbums = await getMusicAlbums();
    const musicTracks = await getMusicTracks();
    const tracks = trackConverter(musicTracks);
    dispatch(addTracks(tracks));

    const albumsObject = addTracksToAlbums(musicAlbums, tracks);
    dispatch(addAlbums(albumsObject));
    const keys = Object.keys(albumsObject);

    const updatedAlbumsObject = await addCoversToAlbums(keys, albumsObject);
    // console.log(updatedAlbumsObject)
    dispatch(addAlbums(updatedAlbumsObject));
  };
};


const fetchCoverArt = (albums) => {
  return async (dispatch) => {
   
  };
};

const updateImage = (payload) => ({
  type: UPDATE_IMAGE,
  payload: payload,
});

const addTracks = (payload) => ({
  type: ADD_TRACKS,
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

export {fetchAlbums, updateImage, setAppLoaded, setPlayerVisibility};
