import { useEffect, useState } from 'react';
import ScrollableText from './components/ScrollableText';

function App() {
  const [data, setData] = useState(null);
  const api_key = import.meta.env.VITE_API_KEY;
  const user = import.meta.env.VITE_USER;
  const URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${api_key}&format=json`;
  const NO_ARTWORK_URL = 'no-artwork.png';

  useEffect(() => {
    const interval = setInterval(() => {
      const getData = async () => {
        const response = await fetch(URL);
        if (response.ok) {
          const json = await response.json();
          const {
            recenttracks: { track },
          } = json;
          const currentTrack = {
            artist: track[0].artist['#text'],
            song: track[0].name,
            image: track[0].image[2]['#text'],
          };
          setData(currentTrack);
        }
      };
      getData();
    }, 5000);

    return () => clearInterval(interval);
  }, [URL]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const noArtwork = data.image === NO_ARTWORK_URL;
  const { image, song, artist } = data;

  return (
    <div className="container">
      <div className="imageContainer">
        <img src={image} alt={song} className="image" />
      </div>
      <div className="infoContainer">
        <div
          className="songBackground"
          style={{ '--dynamic-image-url': `url(${image})` }}
        >
          <div
            className="songInfo"
            style={{
              '--text-color': noArtwork ? '#000' : '#fff',
              textShadow:
                image === NO_ARTWORK_URL
                  ? 'none'
                  : '0px 0px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            <ScrollableText text={song} />
            <h3>{artist}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
