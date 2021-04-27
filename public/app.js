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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  return /*#__PURE__*/_react["default"].createElement(_musicPlayerContainer["default"], null);
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

var _playlist = _interopRequireDefault(require("../../playlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MusicPlayerContainer = function MusicPlayerContainer() {
  var songs = _playlist["default"];
  var audioPlayer = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      currentSongIndex = _useState2[0],
      setCurrentSongIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPlaying = _useState4[0],
      setIsPlaying = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isShuffled = _useState6[0],
      setIsShuffled = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      shuffledIndexList = _useState8[0],
      setShuffledIndexList = _useState8[1]; // Keep playing audio as long as `isPlaying` is true. If a new song is
  // selected while `isPlaying` is true, start it up. If `isPlaying` is
  // false, we pause the song!


  (0, _react.useEffect)(function () {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [currentSongIndex, isPlaying]); // Listen for a song end so we can find the next song and start
  // playing it automatically

  (0, _react.useEffect)(function () {
    audioPlayer.current.addEventListener('ended', function () {
      navigatePlaylist();
    });
  }); // This function does the two initial action items

  var shufflePlaylist = function shufflePlaylist() {
    setIsShuffled(!isShuffled);

    if (isShuffled) {
      setShuffledIndexList([currentSongIndex]);
    } else {
      setShuffledIndexList([]);
    }
  }; // This function handles the user action of clicking on a song
  // to play it


  var manuallySelectSong = function manuallySelectSong(song) {
    var songIndex = songs.indexOf(song); // if we are in shuffle mode, save this song to our history stack

    if (isShuffled) {
      shuffledIndexList.push(songIndex);
    }

    setCurrentSongIndex(songIndex);
  };

  var navigatePlaylist = function navigatePlaylist(event) {
    var songIndex;
    var lastSongInPlaylist = songs.length - 1; // If no event is passed, 'forward' is the default direction

    var direction = event ? event.target.value : 'forward';

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
          shuffledIndexList.pop(); // set the next song index to the next item in the array

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

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "music-player"
  }, /*#__PURE__*/_react["default"].createElement(_controls["default"], {
    currentSong: songs[currentSongIndex],
    currentSongUrl: songs[currentSongIndex].url,
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
    currentSongId: songs[currentSongIndex].id
  }));
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
  if (!songs || songs.length === 0) return /*#__PURE__*/_react["default"].createElement("p", null, "No Songs");
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