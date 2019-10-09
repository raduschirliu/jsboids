import p5 from "p5";

new p5(p => {
  p.setup = () => {
    p.createCanvas(400, 400);
  }

  p.draw = () => {
    p.background(255, 255, 255);
    p.fill(20, 200, 20);
    p.rect(100, 100, 500, 50);
  }
});