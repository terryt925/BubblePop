// const { platform } = require("node:os");
// import { platform } from 'node:os';
// import { platform } from 'node:os';
import Pad from './pad.js';

document.addEventListener('DOMContentLoaded', () => {
  const map = document.getElementById('game');
  const jumper = document.createElement('div');
  let jumperLeftSpace = 50;
  let jumperBottomSpace = 250;
  let padCount = 5;
  let isGameOver = false;
  const pads = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let startPoint = 150;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId; 
  let rightTimerId;
  let score = 0;

  function createJumper() {
    map.appendChild(jumper)
    jumper.classList.add('jumper')
    jumperLeftSpace = pads[0].left
    jumper.style.left= jumperLeftSpace + 'px'
    jumper.style.bottom = jumperBottomSpace + 'px'
  }

  function createPads() {
    for (let i = 0; i < padCount; i++) {
      let padGap = 600/ 5;
      let newPadBottom = 100 + i * padGap
      let viz = document.createElement('div')
      let newPad = new Pad(newPadBottom, viz, map)
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
          pads.shift()
          score++
          let viz = document.createElement('div')
          let newPad = new Pad(600, viz, map)
          pads.push(newPad)
        }
      })
    }
  }

  function jump() {
    clearInterval(downTimerId)
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
          console.log('landed')
          startPoint = jumperBottomSpace
          jump()
        }
      })
    },30)
  }

  function gameOver() {
    console.log('game over')
    isGameOver = true;
    while (map.firstChild) {
      map.removeChild(map.firstChild)
    }
    map.innerHTML = score
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
  }

  function control(e) {
    if(e.key === 'ArrowLeft') {
      moveLeft()
    } else if (e.key === 'ArrowRight') {
      moveRight()
    } else if (e. key === 'ArrowUp') {

    }
  }

  function moveLeft() {
    clearInterval(leftTimerId)
    if(isGoingRight) {
      clearInterval(rightTimerId)
      isGoingRight = false
    }
    isGoingLeft = true;
    leftTimerId - setInterval(function () {
      if (jumperLeftSpace >= 0) {
        jumperLeftSpace -=5
        jumper.style.left = jumperLeftSpace + 'px'
      } else moveRight()
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
      if (jumperLeftSpace <= 340) {
        jumperLeftSpace += 5
        jumper.style.left = jumperLeftSpace + 'px'
      } else moveLeft()
    }, 30)
  }

  function start() {
    if (isGameOver === false) {
      createPads()
      createJumper()
      setInterval(movePads, 30)
      jump()
      document.addEventListener('keyup',control)
    }
  }

  start()
})