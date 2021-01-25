import {
  ADD_TRACKS,
  ADD_ALBUMS,
  ADD_FOLDERS,
  ADD_ALBUM_DATA,
  ADD_IMAGES,
  ADD_FAVORITES,
  ADD_COVER_ART,
} from '../actions/types';

const initialState = {
  coverArt: null,
  albumData: null,
  tracks: [],
  albums: [],
  folders: [],
  favorites: [],
};
const globalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_TRACKS: {
      // console.log(payload)
      return {
        ...state,
        tracks: payload
      };
    }
    case ADD_ALBUMS: {
      //  console.log(payload);

     const imageOnlyAlbums = Object.values(payload).filter(album => album.cover)
     

      return {
        ...state,
        albums: imageOnlyAlbums,
        albumData: payload,
        folders: Object.values(payload)
      };
    }

    case ADD_FOLDERS: {

      return {
        ...state,
      }
    }

    case ADD_COVER_ART: {
      return {
        ...state,
      }
    }

    default:
      return state;
  }
};

export default globalReducer;
