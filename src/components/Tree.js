import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

export default function Tree(props) {
  

  function sketch(p5) {

    let width = 500;
    let height = 400; 
    // console.log(this.props.tasks)
  
    p5.setup = () => { 
      p5.createCanvas(width, height, p5.WEBGL);
      console.log(p5.angleMode());
    }
  
    p5.draw = () => {
      p5.background(100)
      // translate to the center of the screen
      p5.translate(width/2, height/2)
      p5.branch(100)
      // p5.background(250);
      // p5.normalMaterial();
      // p5.push();
      // p5.rotateZ(p5.frameCount * 0.01);
      // p5.rotateX(p5.frameCount * 0.01);
      // p5.rotateY(p5.frameCount * 0.01);
      // p5.plane(100);
      // p5.pop();
    }
  
    p5.branch = (len) => {
      // console.log(props.tasks) //yay it is accessible here!

      //draw a line in 2D with a default width of 1 pixel
      //the y-coordinate of the second point should be negative of the length inorder for the tree to turn in the right direction
      p5.line(0, 0, 0, -len) 
      //displace objects within the display window
      //The x parameter specifies left/right translation, the y parameter specifies up/down translation.
      p5.translate(0, -len) //translate to the end of the branch
      p5.rotate(30)
      p5.branch(len*0.7)
    };
  }

  return <ReactP5Wrapper sketch={sketch} />;
}