import { RNAndroidAudioStore } from 'react-native-get-music-files';

const getMusicTracks = async () => {
  const options = {
    blured: false, 
    artist: true,
    duration: true, 
    album: true,
    genre: true,
    title: true,
    cover: false,
    id: true,
    minimumSongDuration: 10000,
  };

  try {
    const response = await RNAndroidAudioStore.getAll(options);
    if (response === 'Something get wrong with musicCursor') {
      return null;
    } else {
      
      return response;
    }
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

    if (response === 'Something get wrong with musicCursor') {
      return null;
    } else {
      
      return response;
    }
  } catch (err) {
    return err;
  }
};

const getSongCover = async (path) => {


  const options = {
    songUri: path,
    cover: true,
    icon: false
  }
  
  try {
    const response = await RNAndroidAudioStore.getSongByPath(options);
    return response[0].cover
  } catch (err) {
    return err;
  }
}

export { getMusicTracks, getMusicAlbums, getSongCover };
