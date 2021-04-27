import React from 'react';
import { shallow } from 'enzyme';

import SongList from 'components/features/songlist';

import playlist from 'playlist';

describe('<SongList />', () => {
  it('renders the component', () => {
    const songlist = shallow(<SongList songs={playlist} />);

    expect(songlist.exists()).to.equal(true);
  });

  it('displays the playlist header', () => {
    const songlist = shallow(<SongList songs={playlist} />);

    expect(songlist.find('h3')).to.have.lengthOf(1);
    expect(songlist.text()).includes('Playlist');
  });

  it('shows an end of song listening alert if the user reaches the end', () => {
    const songlist = shallow(
      <SongList songs={playlist} showEndPlaylistAlert={true} />
    );

    expect(songlist.find('h5')).to.have.lengthOf(1);
    expect(songlist.text()).includes(
      'reached the end of your song listening history.'
    );
  });
});
