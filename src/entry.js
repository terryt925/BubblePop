// const { platform } = require("node:os");
// import { platform } from 'node:os';
// import { platform } from 'node:os';
import Pad from './pad.js';

document.addEventListener('DOMContentLoaded', () => {
  const map = document.getElementById('game');
  const jumper = document.createElement('div');
  let jumperLeftSpace = 50;
  let jumperBottomSpace = 250;
  let isGameOver = false;
  const pads = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;

  function createJumper() {
    map.appendChild(jumper)
    jumper.classList.add('jumper')
    jumperLeftSpace = pads[0].left
    jumper.style.left= jumperLeftSpace + 'px'
    jumper.style.bottom = jumperBottomSpace + 'px'
  }

  function createPads() {
    for (let i = 0; i < 5; i++) {
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
      })
    }
  }

  function jump() {
    clearInterval(downTimerId)
    isJumping = true;
    upTimerId = setInterval(() => {
      jumperBottomSpace += 20;
      jumper.style.bottom = jumperBottomSpace + 'px';
      if (jumperBottomSpace > 350) {
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
          jump()
        }
      })
    },30)
  }

  function gameOver() {
    console.log('game over')
    isGameOver = true;
    clearInterval(upTimerId)
    clearInterval(downTimerId)
  }

  function conrol(e) {
    if(e.key === 'ArrowLeft') {

    } else if (e.key === 'ArrowRight') {

    } else if (e. key === 'ArrowUp') {

    }
  }

  function start() {
    if (isGameOver === false) {
      createPads()
      createJumper()
      setInterval(movePads, 30)
      jump()
    }
  }

  start()
})