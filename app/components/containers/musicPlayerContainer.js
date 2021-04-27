import React, { useEffect, useRef, useState } from 'react';

// feature components
import Controls from '../features/controls';
import SongList from '../features/songlist';

// song data
import playlist from '../../playlist';

const MusicPlayerContainer = () => {
  const songs = playlist;
  const audioPlayer = useRef(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledIndexList, setShuffledIndexList] = useState([]);

  // Keep playing audio as long as `isPlaying` is true. If a new song is
  // selected while `isPlaying` is true, start it up. If `isPlaying` is
  // false, we pause the song!
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [currentSongIndex, isPlaying]);

  // Listen for a song end so we can find the next song and start
  // playing it automatically
  useEffect(() => {
    audioPlayer.current.addEventListener('ended', () => {
      navigatePlaylist();
    });
  });

  // This function does the two initial action items
  const shufflePlaylist = () => {
    setIsShuffled(!isShuffled);
    if (isShuffled) {
      setShuffledIndexList([currentSongIndex]);
    } else {
      setShuffledIndexList([]);
    }
  };

  // This function handles the user action of clicking on a song
  // to play it
  const manuallySelectSong = (song) => {
    const songIndex = songs.indexOf(song);

    // if we are in shuffle mode, save this song to our history stack
    if (isShuffled) {
      shuffledIndexList.push(songIndex);
    }

    setCurrentSongIndex(songIndex);
  };

  const navigatePlaylist = (event) => {
    let songIndex;
    const lastSongInPlaylist = songs.length - 1;

    // If no event is passed, 'forward' is the default direction
    const direction = event ? event.target.value : 'forward';

    if (isShuffled) {
      if (direction === 'forward') {
        songIndex = Math.floor(Math.random() * songs.length);
        shuffledIndexList.push(songIndex);
      } else {
        // if we are at the beginning of our shuffled list,
        // don't let the user navigate further back
        if (shuffledIndexList.length === 1) {
          songIndex = shuffledIndexList[0];
        } else {
          // pop off the current song
          shuffledIndexList.pop();
          // set the next song index to the next item in the array
          songIndex = shuffledIndexList[shuffledIndexList.length - 1];
        }
      }
    } else {
      if (direction === 'forward') {
        if (currentSongIndex === lastSongInPlaylist) {
          songIndex = 0;
        } else {
          songIndex = currentSongIndex + 1;
        }
      } else {
        if (currentSongIndex === 0) {
          songIndex = lastSongInPlaylist;
        } else {
          songIndex = currentSongIndex - 1;
        }
      }
    }

    setCurrentSongIndex(songIndex);
  };

  return (
    <div className="music-player">
      <Controls
        currentSong={songs[currentSongIndex]}
        currentSongUrl={songs[currentSongIndex].url}
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
        currentSongId={songs[currentSongIndex].id}
      />
    </div>
  );
};

export default MusicPlayerContainer;
