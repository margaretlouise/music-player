import React from 'react';

const Song = (props) => {
  const { artist, album, track } = props;

  return (
    <div>
      <h4>{track}</h4>
      <p>
        {artist} - {album}
      </p>
    </div>
  );
};

export default Song;
