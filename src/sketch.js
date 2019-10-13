import Boid from './boid';

export default class Sketch {
  constructor() {
    this.amount = 30;
    this.boids = [];
  }

  setup() {
    p.createCanvas(1000, 650);
    p.angleMode(p.DEGREES);

    for (let i = 0; i < this.amount; i++) {
      this.boids.push(new Boid());
    }

    this.boids[0].debug = true;
  }

  draw() {
    p.background(240, 240, 240);
    
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].update();
      this.boids[i].draw();
    }
  }
}