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
    this.angularSpeed = 0;
    this.range = 175;
    this.viewAngle = p.radians(280);
  }

  // Update physics and movement
  update() {
    // Move forwards
    this.pos.add(this.forward.mult(this.speed));

    // Apply spin
    this.angle = p.lerp(this.angle, this.angle + this.angularSpeed, 0.01);
    this.angularSpeed = 0;

    // Teleport if moving out of screen bounds
    if (this.pos.x > p.width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = p.width;
    if (this.pos.y > p.height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = p.height;

    let closeBoids = [];

    // Find nearby boids and add to list
    for (let i = 0; i < boids.length; i++) {
      if (boids[i] === this) continue;

      if (this.inRange(boids[i])) {
        closeBoids.push(boids[i]);
        // Draw debug color for nearby boids
        if (this.debug) {
          boids[i].color = p.color(20, 200, 20);
          // p.line(this.pos.x, this.pos.y, boids[i].pos.x, boids[i].pos.y);
        }
      } else {
        // Remove debug color for nearby boids
        if (this.debug) boids[i].color = this.color;
      }
    }

    // Orient self based on other boids in proximity
    if (closeBoids.length > 0) {
      // Spin to face other boids
      let heading = this.averageHeading(closeBoids);
      this.angularSpeed -= this.calcAngle(heading);

      if (this.debug) {
        p.line(this.pos.x, this.pos.y, this.pos.x + heading.x * 60, this.pos.y + heading.y * 60);
      }

      // Face center of mass of nearby boids
      let com = this.centerOfMass(closeBoids);
      let comDir = p5.Vector.sub(com, this.pos);
      this.angularSpeed -= this.calcAngle(comDir);
      
      if (this.debug) {
        p.fill(200, 20, 20);

        p.line(this.pos.x, this.pos.y, com.x, com.y);
        p.ellipse(com.x, com.y, 5, 5);
      }
    }
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
      p.arc(0, 0, this.range * 2, this.range * 2, p.HALF_PI + halfBlindAngle, p.HALF_PI + this.viewAngle + halfBlindAngle);
      p.stroke(0);
      
      p.fill(0);
      p.line(0, 0, 0, -this.range / 2);
    }

    p.fill(this.color);
    p.triangle(0, -15, 10, 10, -10, 10);

    p.ellipse(0, 0, 1, 1);
    p.pop();
  }

  // Returns signed angle difference between forward vector and another vector
  calcAngle(vec) {
    let ang = this.forward.heading() - vec.heading();
    if (ang > p.PI) ang -= p.TWO_PI;
    else if (ang < -p.PI) ang += p.TWO_PI;

    return ang;
  }

  // Returns if another boid is in the view range and view angle
  inRange(boid) {
    if (this.pos.dist(boid.pos) > this.range) return false;
    
    let posVec = p5.Vector.sub(boid.pos, this.pos);
    let blindAngle = p.TWO_PI - this.viewAngle;
    let viewMax = p.PI - blindAngle / 2;

    if (p.abs(this.forward.angleBetween(posVec)) > viewMax) return false;

    return true;
  }

  // Returns the vector for the average heading of a group of boids
  averageHeading(group) {
    let heading = p.createVector(0, 0);

    group.forEach(boid => {
      heading.add(boid.forward);
    });

    heading.div(group.length);
    return heading.normalize();
  }

  // Returns the position of the center of mass of a group of nearby boids
  centerOfMass(group) {
    let com = p.createVector(0, 0);

    group.forEach(boid => {
      com.add(boid.pos);
    });

    com.div(group.length);
    return com;
  }
}