import {
FETCH_TRACKS
} from "./types";

const fetchTracks = (payload) => ({
  type: FETCH_TRACKS,
  payload: payload,
});



export {
  fetchTracks
};
