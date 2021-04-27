import React from 'react';
import { shallow } from 'enzyme';

import Controls from 'components/features/controls';

describe('<Controls />', () => {
  let currentSong = {
    artist: 'Junior Boys',
    album: 'Big Black Coat',
    track: 'You Say That',
    url:
      'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
    id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
  };

  it('renders the component', () => {
    const controls = shallow(<Controls currentSong={currentSong} />);

    expect(controls.exists()).to.equal(true);
  });

  it('loads an audio tag', () => {
    const controls = shallow(<Controls currentSong={currentSong} />);

    expect(controls.find('audio')).to.have.lengthOf(1);
  });

  it('has a play button if the song is not playing', () => {
    const controls = shallow(
      <Controls currentSong={currentSong} isPlaying={false} />
    );

    expect(controls.text()).includes('Play');
  });

  it('has a pause button if the song is playing', () => {
    const controls = shallow(
      <Controls currentSong={currentSong} isPlaying={true} />
    );

    expect(controls.text()).includes('Pause');
  });
});
