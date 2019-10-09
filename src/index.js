import p5 from "p5";

new p5(p => {
  let x = 0;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
  }

  p.draw = () => {
    p.background(255, 255, 255);
    
    p.push();
    p.translate(100, 100);
    p.rotate(x);

    p.fill(20, 200, 20);
    p.triangle(0, -50, 50, 50, -50, 50);
    
    p.fill(200, 20, 20);
    p.ellipse(0, 0, 5, 5);
    p.pop();

    x++;
  }
});