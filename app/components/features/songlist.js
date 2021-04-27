import React from 'react';

// components
import Song from './song';

const SongList = (props) => {
  const {
    songs,
    isShuffled,
    handleShuffle,
    currentSongId,
    handleSelectSong,
    showEndPlaylistAlert
  } = props;

  return (
    <div className="playlist">
      <h3>Playlist</h3>
      <div className="shuffle-toggle">
        <label>
          <input
            name="isShuffled"
            type="checkbox"
            id="shuffle-songs"
            checked={isShuffled}
            onChange={handleShuffle}
          />
          Shuffle
        </label>
      </div>
      {showEndPlaylistAlert && (
        <h5 className="alert">
          You've reached the end of your song listening history.
        </h5>
      )}
      <ul>
        {songs.map((song) => {
          return (
            <li
              key={song.id}
              className={currentSongId === song.id ? 'current-song' : 'song'}
            >
              <button onClick={() => handleSelectSong(song)}>
                <Song
                  artist={song.artist}
                  album={song.album}
                  track={song.track}
                  url={song.url}
                  id={song.id}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SongList;
