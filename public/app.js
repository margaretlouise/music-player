(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _musicPlayerContainer = _interopRequireDefault(require("./containers/musicPlayerContainer"));

var _error = _interopRequireDefault(require("./shared/error"));

var _playlist = _interopRequireDefault(require("../playlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// containers
// shared components
// song data
var App = function App() {
  return _playlist["default"].length ? /*#__PURE__*/_react["default"].createElement(_musicPlayerContainer["default"], {
    songs: _playlist["default"]
  }) : /*#__PURE__*/_react["default"].createElement(_error["default"], null);
};

var _default = App;
exports["default"] = _default;
});

require.register("components/containers/musicPlayerContainer.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _controls = _interopRequireDefault(require("../features/controls"));

var _songlist = _interopRequireDefault(require("../features/songlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MusicPlayerContainer = function MusicPlayerContainer(props) {
  var songs = props.songs;
  var audioPlayer = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPlaying = _useState2[0],
      setIsPlaying = _useState2[1];

  var _useState3 = (0, _react.useState)(songs[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      currentSong = _useState4[0],
      setCurrentSong = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isShuffled = _useState6[0],
      setIsShuffled = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      shuffledSongList = _useState8[0],
      setShuffledSongList = _useState8[1]; // Keep playing audio as long as `isPlaying` is true. If a new song is
  // selected while `isPlaying` is true, start it up. If `isPlaying` is
  // false, we pause the song!


  (0, _react.useEffect)(function () {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [currentSong, isPlaying]); // Listen for song end so we can find the next song and start
  // playing it automatically.

  (0, _react.useEffect)(function () {
    audioPlayer.current.addEventListener('ended', function () {
      navigatePlaylist();
    });
  }); // This function does the two initial action items needed when a
  // user toggles shuffle off or on - we set shuffle to the opposite
  // of what it's currently set to, and we make a copy of our songs
  // list and shuffle them, then set the shuffled list to state.

  var shufflePlaylist = function shufflePlaylist() {
    setIsShuffled(!isShuffled);

    var shuffledArray = _toConsumableArray(songs);

    for (var i = shuffledArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    setShuffledSongList(shuffledArray);
  }; // This function handles the user action of clicking on a song
  // to play it. If a user manually selects a song, we turn
  // shuffle mode off.


  var manuallySelectSong = function manuallySelectSong(song) {
    if (isShuffled) {
      setIsShuffled(!isShuffled);
    }

    setCurrentSong(song);
  }; // This function handles song navigation, whether we are on
  // shuffle mode or not.


  var navigatePlaylist = function navigatePlaylist(event) {
    var songIndex; // If no event is passed, default to 'forward'

    var direction = event ? event.target.value : 'forward';
    var lastSongInPlaylist = songs.length - 1; // Find the current song's index in either the shuffled list
    // or the regular list, depending on our shuffle status

    var currentSongIndex = isShuffled ? shuffledSongList.indexOf(currentSong) : songs.indexOf(currentSong);

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

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-player"
  }, songs.length ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_controls["default"], {
    currentSong: currentSong,
    audioPlayer: audioPlayer,
    isPlaying: isPlaying,
    handleNav: function handleNav(e) {
      return navigatePlaylist(e);
    },
    handlePlayOrPause: function handlePlayOrPause() {
      return setIsPlaying(!isPlaying);
    }
  }), /*#__PURE__*/_react["default"].createElement(_songlist["default"], {
    songs: songs,
    isShuffled: isShuffled,
    handleShuffle: function handleShuffle() {
      return shufflePlaylist();
    },
    handleSelectSong: function handleSelectSong(song) {
      return manuallySelectSong(song);
    },
    currentSongId: currentSong.id
  })) : /*#__PURE__*/_react["default"].createElement("div", null, "no songs sad"));
};

var _default = MusicPlayerContainer;
exports["default"] = _default;
});

require.register("components/features/controls.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Controls = function Controls(props) {
  var currentSong = props.currentSong,
      audioPlayer = props.audioPlayer,
      isPlaying = props.isPlaying,
      handleNav = props.handleNav,
      handlePlayOrPause = props.handlePlayOrPause;
  var buttonCopy = isPlaying ? 'Pause' : 'Play';
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, currentSong.track), /*#__PURE__*/_react["default"].createElement("audio", {
    src: currentSong.url,
    ref: audioPlayer,
    type: "audio/mpeg"
  }, "Your browser does not support the audio tag."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-player-controls"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-btn",
    value: "backward",
    onClick: handleNav
  }, "Prev"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "play-pause-btn",
    onClick: handlePlayOrPause
  }, buttonCopy), /*#__PURE__*/_react["default"].createElement("button", {
    className: "nav-btn",
    value: "forward",
    onClick: handleNav
  }, "Next")));
};

var _default = Controls;
exports["default"] = _default;
});

require.register("components/features/song.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Song = function Song(props) {
  var artist = props.artist,
      album = props.album,
      track = props.track;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, track), /*#__PURE__*/_react["default"].createElement("p", null, artist, " - ", album));
};

var _default = Song;
exports["default"] = _default;
});

require.register("components/features/songlist.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _song = _interopRequireDefault(require("./song"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// components
var SongList = function SongList(props) {
  var songs = props.songs,
      isShuffled = props.isShuffled,
      handleShuffle = props.handleShuffle,
      currentSongId = props.currentSongId,
      handleSelectSong = props.handleSelectSong;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "playlist"
  }, /*#__PURE__*/_react["default"].createElement("h3", null, "Playlist"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "shuffle-toggle"
  }, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("input", {
    name: "isShuffled",
    type: "checkbox",
    id: "shuffle-songs",
    checked: isShuffled,
    onChange: handleShuffle
  }), "Shuffle")), /*#__PURE__*/_react["default"].createElement("ul", null, songs.map(function (song) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: song.id,
      className: currentSongId === song.id ? 'current-song' : 'song'
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleSelectSong(song);
      }
    }, /*#__PURE__*/_react["default"].createElement(_song["default"], {
      artist: song.artist,
      album: song.album,
      track: song.track,
      url: song.url,
      id: song.id
    })));
  })));
};

var _default = SongList;
exports["default"] = _default;
});

require.register("components/shared/error.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Error = function Error() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "error"
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Dang, we had trouble loading your music."), /*#__PURE__*/_react["default"].createElement("p", null, "Please double check your playlist file and try again."));
};

var _default = Error;
exports["default"] = _default;
});

require.register("initialize.js", function(exports, require, module) {
"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App["default"], null), document.querySelector('#app'));
});
});

;require.register("playlist.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  artist: 'Frank Ocean',
  album: 'channel ORANGE',
  track: 'Sweet Life',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/frank_ocean_sweet_life.mp3',
  id: '7a187a2c-e6fe-46a6-a8d4-5b5984da3de3'
}, {
  artist: 'Grace Jones',
  album: 'Bulletproof Heart',
  track: 'On My Way',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/grace_jones_on_my_way.mp3',
  id: '9f6b44a3-0d57-4ae1-bfab-2447adf6eaf0'
}, {
  artist: 'Junior Boys',
  album: 'Big Black Coat',
  track: 'You Say That',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/junior_boys_you_say_that.mp3',
  id: '1c8d7409-59fb-4bf8-9ee6-8a328559754a'
}, {
  artist: 'Kate Bush',
  album: 'Hounds of Love',
  track: 'Running Up That Hill',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/kate_bush_running_up_that_hill.mp3',
  id: 'a27f140e-082d-4004-9368-1c7bfd84e9d0'
}, {
  artist: 'King',
  album: 'We Are King',
  track: 'Supernatural',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/king_supernatural.mp3',
  id: '0a78d3b2-7dc6-462b-8d8c-a5310ccb6451'
}, {
  artist: 'Terry Riley',
  album: 'Persian Surgery Dervishes',
  track: 'Performance 1, part 1',
  url: 'https://s3.us-east-2.amazonaws.com/react-challenge/tracks/terry_riley_persian_surgery_dervises_performance_1_part_1.mp3',
  id: 'd7e10f3c-e967-43f8-babc-14ce537a2578'
}];
exports["default"] = _default;
});

;require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("path-browserify/index.js", "path");
require.alias("process/browser.js", "process");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/lib/string_decoder.js", "string_decoder");
require.alias("util/util.js", "sys");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map