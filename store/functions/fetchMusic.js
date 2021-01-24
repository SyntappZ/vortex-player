
import { RNAndroidAudioStore } from "react-native-get-music-files";

const getMusicTracks = async () => {
 
  const options = {
    blured: false, // works only when 'cover' is set to true
    artist: true,
    duration: true, //default : true
    album: true,
    genre: true,
    title: true,
    cover: false,
    id: true,
    minimumSongDuration: 10000,
  };

  try {
    const response = await RNAndroidAudioStore.getAll(options);
    return response;
  } catch (err) {
    return err;
  }
};

const getMusicAlbums = async () => {
 
  const options = {
    author: true,
    album: true,
    cover: true,
    id: true,
    numberOfSongs: true,
  };

  try {
    const response = await RNAndroidAudioStore.getAlbums();
    return response;
  } catch (err) {
    return err;
  }
};

export { getMusicTracks, getMusicAlbums };
