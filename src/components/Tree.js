//inspired by https://youtu.be/-3HwUKsovBE

import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

export default function Tree(props) {
  function sketch(p5) {
    let IS_LEAF = true;
    let selfCareCount;
    console.log(props.selfCare)
    props.selfCare == 0 ? selfCareCount = 0 : selfCareCount = 200;
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

    let width = p5.windowWidth;
    let height = p5.windowHeight*0.9;
  
    p5.setup = () => { 
      p5.createCanvas(width, height);
      let blue2 = p5.color(255);
      let blue1 = p5.color(63, 191, 191);
      
      for(let y=0; y<height; y++){
        let n = p5.map(y,0,height,0,1);
        let newc = p5.lerpColor(blue1,blue2,n);
        p5.stroke(newc);
        p5.line(0,y,width, y);
    }
    p5.angleMode(p5.DEGREES)
      p5.noLoop()
  }
  
    p5.draw = () => {
      // translate to the center of the screen
      p5.translate(width/2, height);

      let branchLength = props.tasks;
      if(branchLength < 150) {
        branchLength = branchLength + (props.tasks * 15);
        // console.log(props.tasks, branchLength)
        p5.branch(branchLength)
      }
      else {
        p5.branch(branchLength)
      }
    }
  
    p5.branch = (len) => {
      p5.push();
      if(len > 10) {

        p5.strokeWeight(p5.map(len, 10, 100, 1, 15))
        p5.stroke(70, 40, 20, 200)
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
        if(selfCareCount > 0) {
          
          color = colorGreenIfLeaf(IS_LEAF)
          IS_LEAF = !IS_LEAF; //a counter governs how many flowers are produced based on self care
          selfCareCount--;
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
        
        //draw leaf
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