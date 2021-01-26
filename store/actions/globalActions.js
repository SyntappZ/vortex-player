import {fetchAlbumArt} from '../functions/AlbumArtApi.js';
import {getMusicTracks, getMusicAlbums} from '../functions/fetchMusic.js';
import {
  trackConverter,
  createFolders,
  convertImageToBase64,
} from '../functions/converters.js';

import {ADD_TRACKS, ADD_ALBUMS, ADD_FOLDERS, UPDATE_IMAGE} from './types';

const createCoverArtObject = async (arr, objData = {}) => {
  if (arr.length < 1) return objData;
  // console.log(data[0])

  const album = arr.shift();

  const author = album[1][0].author;
  // const title = album[1][0].title;
  //  console.log(albumName, author)
  const image = await fetchAlbumArt(author, album[0]);

  const albumName = album[0];
  const tracks = album[1];
  objData[albumName] = {
    cover: '',
    tracks: tracks,
    totalTracks: tracks.length,
  };

  return createCoverArtObject(arr, objData);

  // album.cover = image
  // console.log(image);
};

// const createAlbumsObject = async (arr, objData = {}) => {
//   if (arr.length < 1) return objData;

//   const album = arr.shift();
//   console.log(album)
//   const albumName = album[0];
//   const tracks = album[1];

//   console.log(cover)
//   objData[albumName] = {
//     cover: cover,
//     tracks: tracks,
//     trackAmount: tracks.length
//   };

//   console.log(objData)
//   // return createAlbumsObject(arr, objData);
// };

// const fetchTracks = () => {
//   return async (dispatch) => {
//     const data = await getMusicTracks();
//     const tracks = trackConverter(data);
//     dispatch(addTracks(tracks));
//     const folders = createFolders(tracks);
//     const entries = Object.entries(folders);

//     const obj = createAlbumsObject(entries);

//     dispatch(addAlbumData(obj));
//   };
// };

// const fetchCoverArt = async (image) => {

//   return convertedImage;
// };

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

// const addCoversToAlbums = async (albums, output = {}) => {
//   if (albums.length < 1) return output;

//   const album = albums.shift();
//   const id = album.id;
//   const cover = album.cover;

//   const convertedImage = cover ? await convertImageToBase64() : null;

//   const allDetails = {
//     ...album,
//     cover: convertedImage,
//   };

//   output[id] = allDetails;

//   console.log(output);

//   return addTracksToAlbums(albums, output);
// };

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

// const fetchAlbums = () => {
//   return async (dispatch) => {
//     const folders = await getMusicAlbums();
//     const albums = folders.filter((item) => item.cover !== 'null');
//     dispatch(addAlbums(albums));
//     // dispatch(fetchCoverArt(albums));
//     dispatch(addFolders(folders));
//   };
// };

const fetchCoverArt = (albums) => {
  return async (dispatch) => {
    // const folders = await getMusicAlbums();
    // const albums = res.filter((item) => item.cover !== 'null');
    // dispatch(addAlbums(albums));
    // dispatch(addFolders(folders));
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

export {fetchAlbums, updateImage};
