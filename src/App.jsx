import { useEffect, useState } from 'react';

const api_key = import.meta.env.VITE_API_KEY;
const user = import.meta.env.VITE_USER;
console.log('api_key', api_key, import.meta.env);
const URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${api_key}&format=json`;
const FREE_IMAGE_URL =
  'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
const NO_ARTWORK_URL = 'no-artwork.png';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const getData = async () => {
        const response = await fetch(URL);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      };
      getData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }
  const {
    recenttracks: { track },
  } = data;
  const artist = track[0].artist['#text'];
  const song = track[0].name;
  const image =
    track[0].image[2]['#text'] !== FREE_IMAGE_URL
      ? track[0].image[2]['#text']
      : NO_ARTWORK_URL;

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
              '--text-color': image === NO_ARTWORK_URL ? '#000' : '#fff',
              textShadow:
                image === NO_ARTWORK_URL
                  ? 'none'
                  : '0px 0px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1>{song}</h1>
            <h3>{artist}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
