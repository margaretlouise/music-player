# Music Player

![music player](/music-player.gif)

## Getting Started

We recommend using Node 13 for this project

- To download dependencies: `npm install`
- To run the app locally: `npm run` then open the browser to [http://localhost:3333](http://localhost:3333/)
- To run the tests: `npm test`

### Development server

The repository is ready to go with a [brunch](https://brunch.io/) configuration to build and serve a development version of the page with React.

As currently configured, the starting point for brunch is at `app/assets/index.html`.

## My Approach

- Designing My Solution
  - My first iteration involved navigation forward and back through two arrays of indexes (one shuffled, one not) and the user could navigate with no end in either direction. I decided a true "song history" was really important, regardless of whether the users switched shuffle mode off/on OR manually selected a song out of order. Implementing the song history added code complexity but the payoff of a good user experience was worth it.
  - I stuck closely to the design elements from the provided gif, the only departure being a new coat of paint.
- User Experience
  - I added an alert when a user navigates all the way back and hits the end of their song history. This alert gives the user feedback when the "Previous" button stops navigating through the song list.
  - I considered making the default behavior to play each song once, and then adding an alert to let the user know they'd reached the end of the playlist and stopping song play. Ultimately I decided against it but this would be a nice toggle to add - playlist and song looping.
- State Management
  - I opted to have one container component that receives data and manages all state. This container passes props down to a few feature components which are able to stay presentational only. This makes sure we have only one source of truth for our state.
- Testing
  - I wrote basic tests to ensure components were rendering without crashing and that some of the critical presentational elements that depend on specific props were working correctly. This is one area I would have liked to spend more time.

## Wish List

- I had to stop futzing with it, but after adding the song history work, I think I'd really like to split the music player container into two pieces - one that handles displaying song list data and one that manages the controls and navigation through a shuffled or unshuffled list.
- I'd also like to optimize my shuffle function. I'm sure there is a better way to do this!
