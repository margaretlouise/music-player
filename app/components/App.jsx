import React from 'react';

// containers
import MusicPlayerContainer from './containers/musicPlayerContainer';

// shared components
import Error from './shared/error';

// song data
import playlist from '../playlist';

const App = () => {
  return playlist.length ? (
    <MusicPlayerContainer songs={playlist} />
  ) : (
    <Error />
  );
};

export default App;
