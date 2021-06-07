// import { V4MAPPED } from "node:dns";

class Pad {
  constructor(newPadBottom, viz, map) {
    this.bottom = newPadBottom;
    this.left = Math.random() * 315;
    this.visual = viz
    // const visual = this.visual;
    this.visual.classList.add('pad')
    this.visual.style.left = this.left + 'px'
    this.visual.style.bottom = this.bottom + 'px'
    map.appendChild(this.visual)
  }
}

export default Pad;