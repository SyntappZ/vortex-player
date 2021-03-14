import TrackPlayer from 'react-native-track-player';
import Track from '../../components/Track';


const playerControls = (control) => {
 
    switch (control) {
      case 'play':
        TrackPlayer.play();
        break;
      case 'pause':
        TrackPlayer.pause();
        break;
      case 'stop':
        TrackPlayer.stop();
        break;
      case 'reset':
        TrackPlayer.reset();
        break;
      case 'forwards':
        TrackPlayer.skipToNext();
        break;
      case 'backwards':
        TrackPlayer.skipToPrevious();
    }
  };


  const playTrackFromId = async (id) => {
   
    await TrackPlayer.skip(id)
    await TrackPlayer.play()
    return
  }

  const setTrackFromId = async (id) => {
    await TrackPlayer.skip(id)
    return
  }

  const getQueue = async () => {
    const tracks = await TrackPlayer.getQueue();
    
  }

  const loadPlaylist = async (playlist) => {
    if (playlist) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlist);
    }
  };

  const firstLoad = async (playlist, id) => {
    await TrackPlayer.add(playlist);
    await TrackPlayer.skip(id)
  }

  

  export {playerControls, playTrackFromId, setTrackFromId, loadPlaylist, firstLoad, getQueue}