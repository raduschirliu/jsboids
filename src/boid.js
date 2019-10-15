import p5 from 'p5';

export default class Boid {
  // Returns normalized forward direction vector
  get forward() {
    let point = p5.Vector.sub(this.pos, p.createVector(0, 15));
    return p5.Vector.sub(point, this.pos).rotate(this.angle).normalize();
  }

  constructor() {
    this.debug = false;
    this.pos = p.createVector(p.random(20, p.width - 20), p.random(20, p.height - 20));
    this.color = p.color(20, 200, 200);
    this.angle = p.random(0, p.TWO_PI);
    this.speed = 2;
    this.range = 175;
    this.viewAngle = p.radians(280);
  }

  // Update physics and movement
  update() {
    this.pos.add(this.forward.mult(this.speed));

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
    
    // Draw debug visualization for boid
    if (this.debug) {
      p.noStroke();
      p.fill(200, 20, 20, 100);
      let halfBlindAngle = (p.TWO_PI - this.viewAngle) / 2;
      p.arc(0, 0, this.range, this.range, p.HALF_PI + halfBlindAngle, p.HALF_PI + this.viewAngle + halfBlindAngle);
      p.stroke(0);
      
      p.fill(0);
      p.line(0, 0, 0, -50);
    }

    p.fill(this.color);
    p.triangle(0, -15, 10, 10, -10, 10);

    p.ellipse(0, 0, 1, 1);
    p.pop();
  }
}