// Inspired by Recursive trees in p5.js | Coding Project #13 https://youtu.be/-3HwUKsovBE
// https://p5js.org/learn/p5-screen-reader.html

// function setup() {
//     createCanvas(windowWidth, windowHeight)
//     angleMode(DEGREES)
//     console.log("hello world")
//     noLoop()
// }

// function draw() {
//     background(100)
//     // translate to the center of the screen
//     translate(width/2, height/2)
//     branch(100)
// }

// function branch(len) {
//     //draw a line in 2D with a default width of 1 pixel
//     //the y-coordinate of the second point should be negative of the length inorder for the tree to turn in the right direction
//     line(0, 0, 0, -len) 
//     //displace objects within the display window
//     //The x parameter specifies left/right translation, the y parameter specifies up/down translation.
//     translate(0, -len) //translate to the end of the branch
//     rotate(30)
//     branch(len*0.7)


// }

//MY POTENTIAL SETUP
// export default function sketch(p){
//     let canvas;

//     p.setup = () => {
//         createCanvas(windowWidth, windowHeight)
//         angleMode(DEGREES)
//         console.log("hello world")
    
//         noLoop()
//     }

//     p.draw = () => {
//         background(100)
//         // translate to the center of the screen
//         translate(width/2, height/2)
//         branch(100)
//     }

//     p.branch = () => {
//         background(100)
//         // translate to the center of the screen
//         translate(width/2, height/2)
//         branch(100)
//     }

//     p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
//       if(canvas) //Make sure the canvas has been created
//         p.fill(newProps.color);
//     }
// }
//END OF MY POTENTIAL SETUP