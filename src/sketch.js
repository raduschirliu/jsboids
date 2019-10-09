import Boid from './boid';

export default class Sketch {
  constructor() {
    this.amount = 30;
    this.boids = [];
  }

  setup() {
    p.createCanvas(800, 600);
    p.angleMode(p.DEGREES);

    for (let i = 0; i < this.amount; i++) {
      this.boids.push(new Boid());
    }
  }

  draw() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].draw();
    }
  }
}