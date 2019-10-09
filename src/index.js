import p5 from 'p5';
import Sketch from './sketch';

new p5(p => {
  window.p = p;
  
  let sketch = new Sketch();
  p.setup = sketch.setup.bind(sketch);
  p.draw = sketch.draw.bind(sketch);
});