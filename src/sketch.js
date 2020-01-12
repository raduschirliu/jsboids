import Boid from './boid';

export default class Sketch {
  // Initialize canvas and boids
  setup() {
    p.createCanvas(1000, 650);
    p.angleMode(p.RADIANS);
    this.createFlock(60, 2.5, false);
  }

  // Draw boids
  draw() {
    p.background(240, 240, 240);
    
    if (this.boids == null) return;

    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].update();
      this.boids[i].draw();
    }
  }

  createFlock(size, speed = 2, debug = false) {
    this.boids = [];

    for (let i = 0; i < size; i++) {
      let boid = new Boid();
      boid.speed = speed;

      this.boids.push(boid);
    }

    this.boids[0].debug = debug;
    window.boids = this.boids;
  }
}