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
var Pad = function Pad(newPadBottom, viz, map, color) {
  _classCallCheck(this, Pad);

  this.bottom = newPadBottom;
  this.left = Math.random() * 315;
  this.visual = viz;
  this.color = color; // const visual = this.visual;

  if (this.color === 'white') {
    this.visual.classList.add('pad');
  } else {
    this.visual.classList.add('redPad');
  }

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

document.addEventListener('DOMContentLoaded', function () {
  var map = document.getElementById('game'); // const controls = document.getElementById('controls');

  var result = document.getElementById('score');
  var restart = document.getElementById('restart');
  var jumper = document.createElement('div');
  var startButton = document.createElement('div');
  var rules = document.getElementById('instructions');
  var links = document.getElementById('links');
  var difficulty = document.getElementById('difficulty');
  var mainMenu = document.getElementById('main-menu');
  var newButton = document.createElement('div');
  var jumperLeftSpace = 50;
  var jumperBottomSpace = 250;
  var padCount = 5;
  var isGameOver = false;
  var pads = [];
  var redPadCounter = 0;
  var upTimerId;
  var downTimerId;
  var isJumping = true;
  var startPoint = 150;
  var isGoingLeft = false;
  var isGoingRight = false;
  var leftTimerId;
  var rightTimerId;
  var score = 0;
  var hardMode = false;
  var x = document.getElementById("audio");
  var musicButton = document.getElementById('button');
  var y = false;

  function createJumper() {
    map.appendChild(jumper);
    jumper.classList.add('jumper');
    jumperLeftSpace = pads[0].left;
    jumper.style.left = jumperLeftSpace + 'px';
    jumper.style.bottom = jumperBottomSpace + 'px';
  }

  function createPads() {
    var color; // if (redPadCounter >= 2) {
    //   color = 'red';
    //   redPadCounter = 0;
    // } else {

    color = 'white'; //   redPadCounter++
    // }

    for (var i = 0; i < padCount; i++) {
      var padGap = 600 / 5;
      var newPadBottom = 100 + i * padGap;
      var viz = document.createElement('div');
      var newPad = new _pad_js__WEBPACK_IMPORTED_MODULE_0__.default(newPadBottom, viz, map, color);
      pads.push(newPad);
    }
  }

  function movePads() {
    if (jumperBottomSpace > 200) {
      pads.forEach(function (pad) {
        pad.bottom -= 4;
        var visual = pad.visual;
        visual.style.bottom = pad.bottom + 'px';

        if (pad.bottom < 10) {
          var firstPad = pads[0].visual;
          firstPad.classList.remove('pad');
          firstPad.classList.remove('redPad');
          pads.shift();
          score++;
          var color = 'white';

          if (hardMode === true) {
            if (redPadCounter >= 3) {
              color = 'red';
              redPadCounter = 0;
            } else {
              color = 'white';
              redPadCounter++;
            }
          }

          var viz = document.createElement('div');
          var newPad = new _pad_js__WEBPACK_IMPORTED_MODULE_0__.default(600, viz, map, color);
          pads.push(newPad);
        }
      });
    }
  }

  function jump() {
    clearInterval(downTimerId); // clearInterval(upTimerId)

    isJumping = true;
    upTimerId = setInterval(function () {
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + 'px';

      if (jumperBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      jumperBottomSpace -= 5;
      jumper.style.bottom = jumperBottomSpace + 'px';

      if (jumperBottomSpace <= 0) {
        gameOver();
      }

      pads.forEach(function (pad) {
        if (jumperBottomSpace >= pad.bottom && jumperBottomSpace <= pad.bottom + 15 && jumperLeftSpace + 55 >= pad.left && //60
        jumperLeftSpace <= pad.left + 80 && //85
        !isJumping) {
          if (pad.color === 'red') {
            gameOver();
          } else {
            startPoint = jumperBottomSpace;
            jump();
          }
        }
      });
    }, 30);
  }

  function gameOver() {
    // .log('game over')
    isGameOver = true;

    while (map.firstChild) {
      map.removeChild(map.firstChild);
    }

    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    result.innerHTML = score;
    restart.innerHTML = 'Retry';
    restart.onclick = restartGame;

    if (hardMode === false) {
      difficulty.innerHTML = 'Hard Mode';
      difficulty.onclick = difficultyChange;
    } else {
      difficulty.innerHTML = 'Easy Mode';
      difficulty.onclick = difficultyChange;
    }

    mainMenu.innerHTML = 'Main Menu';
    mainMenu.onclick = main;
    pads = [];
  }

  function main() {
    restart.innerHTML = '';
    result.innerHTML = '';
    mainMenu.innerHTML = '';
    difficulty.innerHTML = '';
    score = 0;
    pads = [];
    hardMode = false;
    map.appendChild(startButton);
    startButton.classList.add('start');
    startButton.innerHTML = 'Start';
    map.appendChild(newButton);
    newButton.classList.add('button');

    if (y === false) {
      newButton.innerHTML = 'Sound On';
    } else {
      newButton.innerHTML = 'Sound Off';
    }

    newButton.onclick = replayAudio;
    startButton.onclick = restartGame;
    rules.classList.remove('hidden');
    links.classList.remove('hidden');
  }

  function restartGame() {
    restart.innerHTML = '';
    result.innerHTML = '';
    difficulty.innerHTML = '';
    mainMenu.innerHTML = '';
    newButton.innerHTML = '';
    score = 0;
    isGameOver = false;
    createPads();
    createJumper(); // pads = []

    document.addEventListener('keydown', control); // setInterval(movePads, 30)

    jump();
    hideStart(); // jumperBottomSpace = 250;
    // map.appendChild(startButton)
    // setInterval(movePads, 30)
  }

  function difficultyChange() {
    restart.innerHTML = '';
    result.innerHTML = '';
    difficulty.innerHTML = '';
    mainMenu.innerHTML = '';

    if (hardMode === false) {
      hardMode = true;
    } else {
      hardMode = false;
    }

    score = 0;
    isGameOver = false;
    createPads();
    createJumper();
    document.addEventListener('keydown', control);
    jump();
  }

  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowUp') {
      moveStraight();
    }
  }

  function moveLeft() {
    clearInterval(leftTimerId);

    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }

    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (jumperLeftSpace >= 0) {
        jumperLeftSpace -= 5;
        jumper.style.left = jumperLeftSpace + 'px';
      } else {
        moveRight();
      }
    }, 30);
  }

  function moveRight() {
    clearInterval(rightTimerId);

    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (jumperLeftSpace <= 315) {
        jumperLeftSpace += 5;
        jumper.style.left = jumperLeftSpace + 'px';
      } else {
        moveLeft(); // isGoingRight = false;
      }
    }, 30);
  }

  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }

  function start() {
    if (isGameOver === false) {
      createPads();
      createJumper();
      setInterval(movePads, 30);
      jump();
      document.addEventListener('keydown', control);
      hideStart();
    }
  }

  function instructions() {
    map.appendChild(startButton);
    startButton.classList.add('start');
    startButton.innerHTML = 'Start';
    startButton.onclick = start; // startButton.onclick = hideStart;
    // startButton.onclick = startButton.style.display = "none";
    // musicButton.classList.add('button')

    if (y === false) {
      musicButton.innerHTML = 'Sound On';
    } else {
      musicButton.innerHTML = 'Sound Off';
    }

    musicButton.onclick = playAudio;
    pads = [];
  }

  function hideStart() {
    // startButton.style.display = 'none';
    // musicButton.style.display = 'none';
    rules.classList.add('hidden');
    links.classList.add('hidden'); // startButton.style.visibility = 'hidden';
    // musicButton.style.visibility = 'hidden';
    // rules.style.visibility = 'hidden'

    musicButton.innerHTML = '';
    difficulty.innerHTML = ''; // rules.innerHTML = '';

    map.removeChild(startButton); // startButton.innerHTML = '';
  }

  function playAudio() {
    if (y === false) {
      y = true;
      x.play();
      document.getElementById('button').innerHTML = 'Sound Off';
    } else {
      y = false;
      x.pause();
      document.getElementById('button').innerHTML = 'Sound On';
    }
  }

  function replayAudio() {
    if (y === false) {
      y = true;
      x.play();
      document.querySelector('.button').innerHTML = 'Sound Off';
    } else {
      y = false;
      x.pause();
      document.querySelector('.button').innerHTML = 'Sound On';
    }
  } // start()


  instructions();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map