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
  const [showEndPlaylistAlert, setShowEndPlaylistAlert] = useState(false);
  const [songHistory, setSongHistory] = useState([]);

  // Keep playing audio as long as `isPlaying` is true. If a new song is
  // selected while `isPlaying` is true, start it up. If `isPlaying` is
  // false, pause the song!
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }

    // Save each played song to our listening history as we go
    setSongHistory(songHistory.concat(currentSong));
  }, [currentSong, isPlaying]);

  // Listen for song end so we can navigate to the next song and start
  // playing it automatically.
  useEffect(() => {
    audioPlayer.current.addEventListener('ended', () => {
      navigatePlaylist();
    });
  }, []);

  // This function handles song navigation, whether we are on
  // shuffle mode or regular listening. If no event is passed,
  // we default to 'forward'
  const navigatePlaylist = (event) => {
    const direction = event ? event.target.value : 'forward';

    if (direction === 'forward') {
      navForward();
    } else {
      navBack();
    }
  };

  const navBack = () => {
    // When we reach the end of our song history,
    // make sure shuffle is set to off, and don't let
    // the user go past the first song in the playlist
    if (songHistory.length <= 1) {
      setIsShuffled(false);
      setCurrentSong(songs[0]);
      setShowEndPlaylistAlert(true);
    } else {
      // Otherwise, pop off the current song and then
      // pop the next song off to set to the new current.
      songHistory.pop();
      setCurrentSong(songHistory.pop());
    }
  };

  const navForward = () => {
    let songIndex;
    setShowEndPlaylistAlert(false);

    // Find the index of the current song in either the shuffled list
    // or the regular list, depending on our shuffle status
    const currentSongIndex = isShuffled
      ? shuffledSongList.indexOf(currentSong)
      : songs.indexOf(currentSong);

    if (currentSongIndex === songs.length - 1) {
      songIndex = 0;
    } else {
      songIndex = currentSongIndex + 1;
    }

    isShuffled
      ? setCurrentSong(shuffledSongList[songIndex])
      : setCurrentSong(songs[songIndex]);
  };

  // This function does the two initial action items needed when a
  // user toggles shuffle off or on: set `isShuffled` and create
  // a shuffled list of songs, starting with our current song
  const shufflePlaylist = () => {
    setIsShuffled(!isShuffled);

    // Create a variable to store our shuffled array and put the
    // current song as the first item in the array
    let shuffledArray = [currentSong];

    // Now make a copy of the songs array
    let array = [...songs];
    // Find the song we are starting with
    const startedAt = array.indexOf(currentSong);
    // Remove it, we don't want to shuffle it
    array.splice(startedAt, 1);

    // Shuffle the items in the array
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    // Add the shuffled items to our starting song
    shuffledArray = shuffledArray.concat(array);

    setShuffledSongList(shuffledArray);
  };

  return (
    <div className="music-player">
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
        handleSelectSong={(song) => setCurrentSong(song)}
        currentSongId={currentSong.id}
        showEndPlaylistAlert={showEndPlaylistAlert}
      />
    </div>
  );
};

export default MusicPlayerContainer;
