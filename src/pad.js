// import { V4MAPPED } from "node:dns";

class Pad {
  constructor(newPadBottom, viz, map, color) {
    this.bottom = newPadBottom;
    this.left = Math.random() * 315;
    this.visual = viz
    this.color = color
    // const visual = this.visual;
    if(this.color === 'white') {
      this.visual.classList.add('pad')
    } else {
      this.visual.classList.add('redPad')
    }
    this.visual.style.left = this.left + 'px'
    this.visual.style.bottom = this.bottom + 'px'
    map.appendChild(this.visual)
  }
}

export default Pad;