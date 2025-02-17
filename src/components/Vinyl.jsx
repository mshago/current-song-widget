import PropTypes from 'prop-types';
import { NO_ARTWORK_URL } from '../constants';
import { useState, useEffect } from 'react';
import { Vibrant } from 'node-vibrant/browser';

const Vinyl = ({ noArtwork, image }) => {
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    Vibrant.from(image)
      .getPalette()
      .then((palette) => {
        setPalette(palette);
      });
  }, [image]);

  if (noArtwork) {
    return (
      <div className="imageContainer">
        <img src={NO_ARTWORK_URL} alt="No artwork" className="image" />
      </div>
    );
  }

  console.log(palette);

  return (
    <div
      className="imageContainer"
      style={{
        backgroundColor: palette?.Vibrant?.hex,
        boxShadow: `${palette?.Vibrant?.hex} 0px 5px 15px`,
      }}
    >
      <img
        src={noArtwork ? NO_ARTWORK_URL : image}
        alt="No artwork"
        className="image"
      />
    </div>
  );
};

Vinyl.propTypes = {
  noArtwork: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};

export default Vinyl;
