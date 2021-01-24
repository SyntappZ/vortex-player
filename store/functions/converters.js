
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
        author: artist ? artist : track.author !== "<unknown>" ? track.author : 'Unknown',
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
    const prop = 'album';
  
    const folders = array.reduce((a, b) => {
      if (!a[b[prop]]) {
        a[b[prop]] = [];
      }
      a[b[prop]].push(b);
      return a;
    }, {});
   return folders
  };

  export { trackConverter, createFolders }