/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/engine.js":
/*!**********************!*\
  !*** ./js/engine.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// // Made by, and copyright, @trevorsargent 2018
// import _ from 'highland'
// import { sanitizeBasic, buildAction } from './lib/operative'
// import Dispatch from './dispatch.js'

// // IO Streams
// export const input$ = _()
// export const output$ = _()

// input$
//   .map(sanitizeBasic)
//   .map(buildAction)
//   .each(Dispatch.broadcastAction)


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(/*! ./engine.js */ "./js/engine.js");

var _state = __webpack_require__(/*! ./state.js */ "./js/state.js");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('HELO!?');

var commandLine = document.getElementById('command_line');
var form = document.getElementById('form');
var log = document.getElementById('console');

var getCommandLineValue = function getCommandLineValue() {
  return commandLine.value.trim().toLowerCase();
};

var setCommandLineValue = function setCommandLineValue(text) {
  commandLine.value = text;
};

var logText = function logText(x) {
  var p = document.createElement('p');
  p.innerHTML = x;
  log.appendChild(x);
};

var smoothScrollWindow = function smoothScrollWindow(px) {
  window.scrollBy({
    top: px, // could be negative value
    left: 0,
    behavior: 'smooth'
  });
};

form.onsubmit = function () {
  var input = getCommandLineValue();

  // TODO: Clean input here

  // send input to engine
  _engine.input$.write(input);

  // set command line empty
  setCommandLineValue('');
};

_engine.output$.each(function (x) {
  // print the output
  logText(x);

  // scroll the window up to accomodate for new text
  smoothScrollWindow(100);
});

console.log(_state2.default);

/***/ }),

/***/ "./js/state.js":
/*!*********************!*\
  !*** ./js/state.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {};
var data = {};

var getNewState = function getNewState() {};

var getData = function getData(url) {
  window.fetch(url).then(function (res) {
    return res.json();
  }).then(function (json) {
    data = json;
  });
};

state = getNewState();
data = getData('../roms/carnival.json');

exports.default = state;

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map