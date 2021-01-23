import {FETCH_TRACKS} from './types';

const fetchTracks = (premium) => ({
  type: FETCH_TRACKS,
  payload: premium,
});

export {fetchTracks};
