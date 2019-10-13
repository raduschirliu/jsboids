export default class Boid {
  constructor() {
    this.pos = p.createVector(p.random(20, p.width - 20), p.random(20, p.height - 20));
    this.color = p.color(20, 200, 200);
    this.angle = 0;
    this.debug = false;
    this.speed = 3;
  }

  update() {
    this.pos.add(p.createVector(this.speed, this.speed));

    if (this.pos.x > p.width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = p.width;
    if (this.pos.y > p.height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = p.height;
  }

  draw() {
    p.push();
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.angle);
    
    if (this.debug) {
      p.noStroke();
      p.fill(200, 20, 20, 100);
      p.ellipse(0, 0, 40, 40);
      p.stroke(0);
    }

    p.fill(this.color);
    p.triangle(0, -15, 10, 10, -10, 10);

    p.ellipse(0, 0, 1, 1);
    p.pop();
  }
}