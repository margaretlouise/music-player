import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App';
import MusicPlayerContainer from 'components/containers/musicPlayerContainer';

import playlist from 'playlist';

describe('<App />', () => {
  it('renders the container if there are songs', () => {
    const app = shallow(<App songs={playlist} />);
    const playerContainer = shallow(<MusicPlayerContainer songs={playlist} />);

    expect(app.exists()).to.equal(true);
    expect(playerContainer.exists()).to.equal(true);
  });

  it('renders an error if there are no songs', () => {
    const app = shallow(<App />);
    const error = shallow(<Error />);

    expect(app.exists()).to.equal(true);
    expect(error.exists()).to.equal(true);
  });
});
