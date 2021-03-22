import ImgToBase64 from "react-native-image-base64";
const nameConverter = str => {
    str = str.replace('.mp3', '');
    let arr = str.split('-');
    return arr.length === 2 ? arr : null;
  };
  
  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const totalTimeConverter = (arr) => {
    let total = 0
     arr.forEach(item => {
     total += parseInt(item.duration)
    })
    return durationConverter(total)
  }

  
  
  const secondsConverter = millis => (millis / 1000).toFixed(1);
  
  const trackConverter = (tracks) => {
    return tracks.map((track, index) => {
      let title = '';
      let artist = '';
  
      if (track.author === "<unknown>") {
        if (nameConverter(track.fileName)) {
          title = nameConverter(track.fileName)[1].trim();
          artist = nameConverter(track.fileName)[0].trim();
        }
      }
    
      return {
        ...track,
        artist: artist ? artist : track.author !== "<unknown>" ? track.author : 'Unknown',
        displayDuration: durationConverter(track.duration),
        seconds: secondsConverter(track.duration),
        title: title
          ? title
          : track.title
          ? track.title
          : track.fileName.replace(/.mp3/, ''),
      };
    });
  }  

  const createFolders = (array) => {
    const prop = 'folder';
  
    const folders = array.reduce((a, b) => {
      if (!a[b[prop]]) {
        a[b[prop]] = [];
      }
      a[b[prop]].push(b);
      return a;
    }, {});
   return folders
  };

  const convertImageToBase64 = async (file) => {
    if(!file || file == 'null') return null
    
    const image = `file://${file}`

    try {
      const base64String = await ImgToBase64.getBase64String(image)
      return `data:image/jpeg;base64,${base64String}`
    }catch(err) {
      console.log(err)
    }

  }

  const convertListView = (items, type) => {
   
   const tracks = items.map(item => {
      return {
        type: type,
        item: item
      }
    })
    return tracks
  }

 


  

  export { trackConverter, createFolders, convertImageToBase64, convertListView, totalTimeConverter }