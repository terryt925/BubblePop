/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pad.js":
/*!********************!*\
  !*** ./src/pad.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { V4MAPPED } from "node:dns";
var Pad = function Pad(newPadBottom, viz, map) {
  _classCallCheck(this, Pad);

  this.bottom = newPadBottom;
  this.left = Math.random() * 315;
  this.visual = viz; // const visual = this.visual;

  this.visual.classList.add('pad');
  this.visual.style.left = this.left + 'px';
  this.visual.style.bottom = this.bottom + 'px';
  map.appendChild(this.visual);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pad);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pad.js */ "./src/pad.js");
// const { platform } = require("node:os");

document.addEventListener('DOMContentLoaded', function () {
  var map = document.getElementById('game');
  var jumper = document.createElement('div');
  var jumperLeftSpace = 50;
  var jumperBottomSpace = 250;
  var isGameOver = false;
  var pads = [];
  var upTimerId;
  var downTimerId;

  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add('jumper');
    jumper.style.left = jumperLeftSpace + 'px';
    jumper.style.bottom = jumperBottomSpace + 'px';
  }

  function createPads() {
    for (var i = 0; i < 5; i++) {
      var padGap = 600 / 5;
      var newPadBottom = 100 + i * padGap;
      var viz = document.createElement('div');
      var newPad = new _pad_js__WEBPACK_IMPORTED_MODULE_0__.default(newPadBottom, viz, map);
      pads.push(newPad);
      console.log(pads);
    }
  }

  function movePads() {
    if (jumperBottomSpace > 200) {
      pads.forEach(function (pad) {
        pad.bottom -= 4;
        var visual = pad.visual;
        visual.style.bottom = pad.bottom + 'px';
      });
    }
  }

  function jump() {
    clearInterval(downTimerId);
    upTimerId = setInterval(function () {
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + 'px';

      if (jumperBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
      jumperBottomSpace -= 5;
      jumper.style.bottom = jumperBottomSpace + 'px';
    }, 30);
  }

  function start() {
    if (isGameOver === false) {
      createJumper();
      createPads();
      setInterval(movePads, 30);
      jump();
    }
  }

  start();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map