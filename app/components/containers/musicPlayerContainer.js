import React, { useEffect, useRef, useState } from 'react';

// feature components
import Controls from '../features/controls';
import SongList from '../features/songlist';

const MusicPlayerContainer = (props) => {
  const { songs } = props;
  const audioPlayer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledSongList, setShuffledSongList] = useState([]);

  // Keep playing audio as long as `isPlaying` is true. If a new song is
  // selected while `isPlaying` is true, start it up. If `isPlaying` is
  // false, we pause the song!
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [currentSong, isPlaying]);

  // Listen for song end so we can find the next song and start
  // playing it automatically.
  useEffect(() => {
    audioPlayer.current.addEventListener('ended', () => {
      navigatePlaylist();
    });
  });

  // This function does the two initial action items needed when a
  // user toggles shuffle off or on - we set shuffle to the opposite
  // of what it's currently set to, and we make a copy of our songs
  // list and shuffle them, then set the shuffled list to state.
  const shufflePlaylist = () => {
    setIsShuffled(!isShuffled);

    var shuffledArray = [...songs];

    for (var i = shuffledArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    setShuffledSongList(shuffledArray);
  };

  // This function handles the user action of clicking on a song
  // to play it. If a user manually selects a song, we turn
  // shuffle mode off.
  const manuallySelectSong = (song) => {
    if (isShuffled) {
      setIsShuffled(!isShuffled);
    }

    setCurrentSong(song);
  };

  // This function handles song navigation, whether we are on
  // shuffle mode or not.
  const navigatePlaylist = (event) => {
    let songIndex;

    // If no event is passed, default to 'forward'
    const direction = event ? event.target.value : 'forward';

    const lastSongInPlaylist = songs.length - 1;

    // Find the current song's index in either the shuffled list
    // or the regular list, depending on our shuffle status
    const currentSongIndex = isShuffled
      ? shuffledSongList.indexOf(currentSong)
      : songs.indexOf(currentSong);

    if (direction === 'forward') {
      if (currentSongIndex === lastSongInPlaylist) {
        songIndex = 0;
      } else {
        songIndex = currentSongIndex + 1;
      }
    } else {
      // TODO: whats the best UX here?
      if (currentSongIndex === 0) {
        songIndex = lastSongInPlaylist;
      } else {
        songIndex = currentSongIndex - 1;
      }
    }

    if (isShuffled) {
      setCurrentSong(shuffledSongList[songIndex]);
    } else {
      setCurrentSong(songs[songIndex]);
    }
  };

  return (
    <div className="music-player">
      {songs.length ? (
        <div>
          <Controls
            currentSong={currentSong}
            audioPlayer={audioPlayer}
            isPlaying={isPlaying}
            handleNav={(e) => navigatePlaylist(e)}
            handlePlayOrPause={() => setIsPlaying(!isPlaying)}
          />
          <SongList
            songs={songs}
            isShuffled={isShuffled}
            handleShuffle={() => shufflePlaylist()}
            handleSelectSong={(song) => manuallySelectSong(song)}
            currentSongId={currentSong.id}
          />
        </div>
      ) : (
        <div>no songs sad</div>
      )}
    </div>
  );
};

export default MusicPlayerContainer;
