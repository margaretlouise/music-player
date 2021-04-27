import React from 'react';

const Controls = (props) => {
  const {
    currentSong,
    audioPlayer,
    isPlaying,
    handleNav,
    handlePlayOrPause
  } = props;

  const buttonCopy = isPlaying ? 'Pause' : 'Play';

  return (
    <div>
      <h1>{currentSong.track}</h1>
      <audio src={currentSong.url} ref={audioPlayer} type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>
      <div className="music-player-controls">
        <button className="nav-btn" value="backward" onClick={handleNav}>
          Prev
        </button>
        <button className="play-pause-btn" onClick={handlePlayOrPause}>
          {buttonCopy}
        </button>
        <button className="nav-btn" value="forward" onClick={handleNav}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Controls;
