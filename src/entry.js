
import Pad from './pad.js';

document.addEventListener('DOMContentLoaded', () => {
  const map = document.getElementById('game');
  // const controls = document.getElementById('controls');
  const result = document.getElementById('score');
  const restart = document.getElementById('restart');
  const jumper = document.createElement('div');
  const startButton = document.createElement('div');
  const rules = document.getElementById('instructions');
  const difficulty = document.getElementById('difficulty');
  const mainMenu = document.getElementById('main-menu');
  const newButton = document.createElement('div');
  let jumperLeftSpace = 50;
  let jumperBottomSpace = 250;
  let padCount = 5;
  let isGameOver = false;
  let pads = [];
  let redPadCounter = 0;
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let startPoint = 150;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId; 
  let rightTimerId;
  let score = 0;
  let hardMode = false;
  const x = document.getElementById("audio");
  const musicButton = document.getElementById('button');
  let y = false;

  function createJumper() {
    map.appendChild(jumper)
    jumper.classList.add('jumper')
    jumperLeftSpace = pads[0].left
    jumper.style.left= jumperLeftSpace + 'px'
    jumper.style.bottom = jumperBottomSpace + 'px'
  }

  function createPads() {
    let color;
    // if (redPadCounter >= 2) {
    //   color = 'red';
    //   redPadCounter = 0;
    // } else {
      color = 'white';
    //   redPadCounter++
    // }
    for (let i = 0; i < padCount; i++) {
      let padGap = 600/ 5;
      let newPadBottom = 100 + i * padGap
      let viz = document.createElement('div')
      let newPad = new Pad(newPadBottom, viz, map, color)
      pads.push(newPad);
      console.log(pads)
    }
  }

  function movePads() {
    if (jumperBottomSpace > 200) {
      pads.forEach(pad => {
        pad.bottom -= 4
        let visual = pad.visual
        visual.style.bottom = pad.bottom + 'px'
        if(pad.bottom < 10) {
          let firstPad = pads[0].visual
          firstPad.classList.remove('pad')
          firstPad.classList.remove('redPad')
          pads.shift()
          score++
          let color = 'white';
          if(hardMode === true) {
            if (redPadCounter >= 3) {
              color = 'red';
              redPadCounter = 0;
            } else {
              color = 'white';
              redPadCounter++
            }
          }
          let viz = document.createElement('div')
          let newPad = new Pad(600, viz, map, color)
          pads.push(newPad)
        }
      })
    }
  }

  function jump() {
    clearInterval(downTimerId)
    // clearInterval(upTimerId)
    isJumping = true;
    upTimerId = setInterval(() => {
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + 'px';
      if (jumperBottomSpace > startPoint + 200) {
        fall()
      }
    }, 30)
  }

  function fall() {
    clearInterval(upTimerId)
    isJumping = false;
    downTimerId = setInterval(() => {
      jumperBottomSpace -= 5;
      jumper.style.bottom = jumperBottomSpace + 'px';
      if (jumperBottomSpace <= 0) {
        gameOver()
      }
      pads.forEach( pad => {
        if((jumperBottomSpace >= pad.bottom) && 
        (jumperBottomSpace <= pad.bottom + 15) &&
        ((jumperLeftSpace + 60) >= pad.left) &&
        (jumperLeftSpace <= (pad.left + 85)) &&
        (!isJumping)) {
          if(pad.color === 'red') {
            gameOver();
          } else {
            startPoint = jumperBottomSpace
            jump()
          }
        }
      })
    },30)
  }

  function gameOver() {
    // console.log('game over')
    isGameOver = true;
    while (map.firstChild) {
      map.removeChild(map.firstChild)
    }
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
    result.innerHTML = score
    restart.innerHTML = 'Retry'
    restart.onclick = restartGame;
    if(hardMode === false) {
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
    restart.innerHTML = ''
    result.innerHTML = ''
    mainMenu.innerHTML = ''
    difficulty.innerHTML = ''
    score = 0;
    pads = [];
    hardMode = false;
    map.appendChild(startButton)
    startButton.classList.add('start')
    startButton.innerHTML = 'Start';
    map.appendChild(newButton)
    newButton.classList.add('button')
    if(y === false) {
      newButton.innerHTML = 'Sound On';
    } else {
      newButton.innerHTML = 'Sound Off';
    }
    newButton.onclick = replayAudio;
    startButton.onclick = restartGame;
    rules.classList.remove('hidden');
  }

  function restartGame() {
    restart.innerHTML = ''
    result.innerHTML = ''
    difficulty.innerHTML = ''
    mainMenu.innerHTML = ''
    newButton.innerHTML = ''
    score = 0;
    isGameOver = false;
    createPads()
    createJumper()
    // pads = []
    document.addEventListener('keydown',control)
    // setInterval(movePads, 30)
    jump()
    hideStart()
    // jumperBottomSpace = 250;
    // map.appendChild(startButton)
    // setInterval(movePads, 30)
  }

  function difficultyChange() {
    restart.innerHTML = ''
    result.innerHTML = ''
    difficulty.innerHTML = ''
    mainMenu.innerHTML = ''
    if (hardMode === false) {
      hardMode = true;
    } else {
      hardMode = false;
    }
    score = 0;
    isGameOver = false;
    createPads()
    createJumper()
    document.addEventListener('keydown',control)
    jump()    
  }

  function control(e) {
    if(e.key === 'ArrowLeft') {
      moveLeft()
    } else if (e.key === 'ArrowRight') {
      moveRight()
    } else if (e. key === 'ArrowUp') {
      moveStraight()
    }
  }

  function moveLeft() {
    clearInterval(leftTimerId)
    if(isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (jumperLeftSpace >= 0) {
        jumperLeftSpace -=5
        jumper.style.left = jumperLeftSpace + 'px'
      } else {
        moveRight()
      }
    },30)
  }

  function moveRight() {
    clearInterval(rightTimerId)
    if(isGoingLeft) {
      clearInterval(leftTimerId)
      isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function() {
      if (jumperLeftSpace <= 315) {
        jumperLeftSpace += 5
        jumper.style.left = jumperLeftSpace + 'px'
      } else {
        moveLeft()
        // isGoingRight = false;
      }
    }, 30)
  }

  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId)
  }

  function start() {
    if (isGameOver === false) {
      createPads()
      createJumper()
      setInterval(movePads, 30)
      jump()
      document.addEventListener('keydown',control)
      hideStart()
    }
  }

  function instructions() {
    map.appendChild(startButton)
    startButton.classList.add('start')
    startButton.innerHTML = 'Start';
    startButton.onclick = start;
    // startButton.onclick = hideStart;
    // startButton.onclick = startButton.style.display = "none";
    // musicButton.classList.add('button')
    if(y === false) {
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
    rules.classList.add('hidden')
    // startButton.style.visibility = 'hidden';
    // musicButton.style.visibility = 'hidden';
    // rules.style.visibility = 'hidden'
    musicButton.innerHTML = '';
    difficulty.innerHTML = '';
    // rules.innerHTML = '';
    map.removeChild(startButton);
      // startButton.innerHTML = '';
  }


    
  function playAudio() {
    if(y === false) {
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
    if(y === false) {
      y = true;
      x.play();
      document.querySelector('.button').innerHTML = 'Sound Off';
    } else {
      y = false;
      x.pause();
      document.querySelector('.button').innerHTML = 'Sound On';
    }
  }

  // start()
  instructions()
})