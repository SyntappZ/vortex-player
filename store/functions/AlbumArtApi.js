const apiKey = '13a3b938fec73f7f4400a980a36e692a';

const fetchAlbumArt = async (author, album) => {
  const search = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${album} ${author}&api_key=${apiKey}&format=json`;
  // const info = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&album=${album}&author=${author}&format=json`;
  // const track = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${author}&track=${title}&format=json`;
  try {
    const response = await fetch(search);
    const data = await response.json();
    const matches = data.results.albummatches['album'];
    if (matches.length > 0) {
      const image = matches[0].image[2]['#text'];
      return image;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {fetchAlbumArt};
