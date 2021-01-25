import {fetchAlbumArt} from '../functions/AlbumArtApi.js';
import {getMusicTracks, getMusicAlbums} from '../functions/fetchMusic.js';
import {trackConverter, createFolders} from '../functions/converters.js';

import {ADD_TRACKS, ADD_ALBUMS, ADD_FOLDERS, ADD_COVER_ART} from './types';

// const createCoverArtObject = async (arr, objData = {}) => {
//   if (arr.length < 1) return objData;
//   // console.log(data[0])

//   const album = arr.shift();

//   const author = album[1][0].author;
//   // const title = album[1][0].title;
//   //  console.log(albumName, author)
//   const image = await fetchAlbumArt(author, album[0]);

//   const albumName = album[0];
//   const tracks = album[1];
//   objData[albumName] = {
//     cover: '',
//     tracks: tracks,
//     totalTracks: tracks.length,
//   };

//    return createCoverArtObject(arr, objData)

//   // album.cover = image
//   // console.log(image);
// };

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

const addTracksToAlbums = (albums, tracks, output = {}) => {
  if (albums.length < 1) return output;
  const album = albums.shift();
  const id = album.id;
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

const fetchAlbums = () => {
  return async (dispatch) => {
    const musicAlbums = await getMusicAlbums();
    const musicTracks = await getMusicTracks();
    const tracks = trackConverter(musicTracks);
    dispatch(addTracks(tracks));

    const albumsObject = addTracksToAlbums(musicAlbums, tracks);
    dispatch(addAlbums(albumsObject));
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

const addCoverArt = () => ({
  type: ADD_COVER_ART,
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

export {fetchAlbums, addCoverArt};
