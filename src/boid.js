export default class Boid {
  constructor() {
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.color = p.color(p.random(255), p.random(255), p.random(255));
  }

  draw() {
    p.fill(this.color);
    p.ellipse(this.pos.x, this.pos.y, 20, 20);
  }
}