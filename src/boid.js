import p5 from 'p5';

export default class Boid {
  // Returns normalized forward direction vector
  get forward() {
    return p5.Vector.sub(this.point, this.pos).rotate(p.radians(this.angle)).normalize();
  }

  constructor() {
    this.debug = false;
    this.pos = p.createVector(p.random(20, p.width - 20), p.random(20, p.height - 20));
    this.point = p.createVector(this.pos.x, this.pos.y - 15);
    this.color = p.color(20, 200, 200);
    this.angle = p.random(0, p.TWO_PI);
    this.speed = 0;
    this.range = 175;
    this.viewAngle = p.radians(280);
  }

  // Update physics
  update() {
    this.pos.add(p.createVector(this.speed, this.speed));

    if (this.pos.x > p.width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = p.width;
    if (this.pos.y > p.height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = p.height;
  }

  // Draw boid
  draw() {
    p.push();
    p.translate(this.pos.x, this.pos.y);
    p.rotate(this.angle);
    
    if (this.debug) {
      p.noStroke();
      p.fill(200, 20, 20, 100);
      let halfHiddenAngle = (p.TWO_PI - this.viewAngle) / 2;
      p.arc(0, 0, this.range, this.range, p.HALF_PI + halfHiddenAngle, p.HALF_PI + this.viewAngle + halfHiddenAngle);
      p.stroke(0);
      
      p.fill(0);
      p.line(0, 0, this.forward.x * 50, this.forward.y * 50);
    }

    p.fill(this.color);
    p.triangle(0, -15, 10, 10, -10, 10);

    p.ellipse(0, 0, 1, 1);
    p.pop();
  }
}