import {
  ADD_TRACKS,
  ADD_ALBUMS,
  ADD_FOLDERS,
  ADD_ALBUM_DATA,
  UPDATE_IMAGE,
  ADD_FAVORITES,
} from '../actions/types';
import {
  convertListView,
  convertImageToBase64,
} from '../functions/converters.js';



const initialState = {
  albumData: {},
  tracks: [],
  albums: [],
  folders: [],
  favorites: [],
};
const globalReducer = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case ADD_TRACKS: {
      // console.log(payload)
      return {
        ...state,
        tracks: payload,
      };
    }
    case ADD_ALBUMS: {
      //  console.log(payload);

      const imageOnlyAlbums = Object.values(payload).filter(
        (album) => album.cover,
      );


      return {
        ...state,
        albums: convertListView(imageOnlyAlbums, 'ALBUMS'),
        folders: Object.values(payload),
      };
    }

    case ADD_FOLDERS: {
      return {
        ...state,
      };
    }

    case UPDATE_IMAGE: {
     
      return {
        ...state,
        albumData: payload,
      }
    }

    default:
      return state;
  }
};

export default globalReducer;
