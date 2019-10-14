import Boid from './boid';

export default class Sketch {
  constructor() {
    this.amount = 30;
    this.boids = [];
  }

  // Initialize canvas and boids
  setup() {
    p.createCanvas(1000, 650);
    p.angleMode(p.RADIANS);

    for (let i = 0; i < this.amount; i++) {
      this.boids.push(new Boid());
    }

    this.boids[0].debug = true;
  }

  // Draw boids
  draw() {
    p.background(240, 240, 240);
    
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].update();
      this.boids[i].draw();
    }
  }
}