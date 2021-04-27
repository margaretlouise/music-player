import React from 'react';
import { shallow } from 'enzyme';

import MusicPlayerContainer from 'components/containers/musicPlayerContainer';

import Controls from 'components/features/controls';
import SongList from 'components/features/songlist';

import playlist from 'playlist';

describe('<MusicPlayerContainer />', () => {
  let currentSong = {
    artist: 'Junior Boys',
    album: 'Big Black Coat',
    track: 'You Say That',
    url:
      'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
    id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
  };

  it('renders the component', () => {
    const playerContainer = shallow(<MusicPlayerContainer songs={playlist} />);

    expect(playerContainer.exists()).to.equal(true);
  });

  it('renders the controls and playlist components', () => {
    const controls = shallow(<Controls currentSong={currentSong} />);
    const songlist = shallow(<SongList songs={playlist} />);

    expect(controls.exists()).to.equal(true);
    expect(songlist.exists()).to.equal(true);
  });
});
