import { random } from "nanoid";
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

export default function Tree(props) {
  function sketch(p5) {
    let IS_LEAF = true;

    function colorGreenIfLeaf(isLeaf) {
      if(isLeaf) {
        return {
          r: 80 + p5.random(-20, 20),
          g: 120 + p5.random(-20, 20),
          b: 40 + p5.random(-20, 20),
          transparency: 200
        }
      }
      else {
        return {
          r: 220 + p5.random(-20, 20),
          g: 120 + p5.random(-20, 20),
          b: 170 + p5.random(-20, 20),
          transparency: 255
        }
      }
    }

    let width = 500;
    let height = 400; 
    // console.log(this.props.tasks)
  
    p5.setup = () => { 
      p5.createCanvas(width, height, p5.WEBGL);
      p5.angleMode(p5.DEGREES)

      p5.noLoop()
      // console.log(p5.angleMode());
    }
  
    p5.draw = () => {
      p5.background(220)
      // translate to the center of the screen
      p5.translate(0, height/2)
      p5.branch(60)
    }
  
    p5.branch = (len) => {
      console.log(props.selfCare)
      // console.log(props.tasks) //yay it is accessible here!
      p5.push();
      if(len > 10) {

        p5.strokeWeight(p5.map(len, 10, 100, 1, 15))
        p5.stroke(70, 40, 20)
        // stroke
        //draw a line in 2D with a default width of 1 pixel
        //the y-coordinate of the second point should be negative of the length inorder for the tree to turn in the right direction
        p5.line(0, 0, 0, -len) 
        //displace objects within the display window
        //The x parameter specifies left/right translation, the y parameter specifies up/down translation.
        p5.translate(0, -len) //translate to the end of the branch
        p5.rotate(25)
        p5.branch(len * p5.random(0.7, 0.9))
        p5.rotate(p5.random(-50, -60))
        p5.branch(len * p5.random(0.7, 0.9))
      } else {

        let r, g, b, transparency, color;
        if(props.selfCare > 0){
          color = colorGreenIfLeaf(IS_LEAF)
          IS_LEAF = !IS_LEAF;
          console.log("flipped!")
        }
        else {
          color = colorGreenIfLeaf(true)
        }
        r = color.r
        g = color.g
        b = color.b
        transparency = color.transparency;
        
        p5.fill(r, g, b, transparency);
        p5.noStroke()


        

        
        
        p5.beginShape()
        for(let i=45; i<135; i++) {
          let rad = 10;
          let x = rad * p5.cos(i)
          let y = rad * p5.sin(i)
          p5.vertex(x, y)
        }
        for(let i=135; i>40; i--) {
          let rad = 10;
          let x = rad * p5.cos(i)
          let y = rad * p5.sin(-i) + 15
          p5.vertex(x, y)
        }
        p5.endShape(p5.CLOSE)
      }
      p5.pop();
    };
  }

  return <ReactP5Wrapper sketch={sketch} />;
}