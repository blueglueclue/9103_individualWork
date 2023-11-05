let skyColorsFrom = [];
let skyColorsTo = [];
let skyColorsLerpA = [];
let skyColorsLerpB = [];
let skyColorsLerpC = [];
let skyColorsLerpD = [];
let skyEllipse = [];
let skyLerpEllipseA = [];
let skyLerpEllipseB = [];
let skyLerpEllipseC = [];
let skyLerpEllipseD = [];
let brushWidth;
let brushAmount;

let inc = 0.1;
let scl; //segmet size
let cols, rows;

let waterColorsFrom = [];
let waterColorsTo = [];
let waterColorsLerpA = [];
let waterColorsLerpB = [];
let waterColorsLerpC = [];
let waterColorsLerpD = [];

let unitX;
let unitY;
let w;
let h;

let iniCol;
let showingCol;

//divide the building into 4 parts for the parallex effect
let building1;
let building2;
let building3;
let building4;

let polyShadow;
let polyBlurry1;//the transition part between building and distant building
let polyBlurry2;//the distant building

let mouseXOffset=0;
let mouseYOffset=0;

let showSky=false;

function setup() {
  createCanvas(windowWidth,windowHeight);

  //Define the color arrays for lerpColor().

  //The colors are: [0]navy blue, [1]sea green, [2]bright yellow, [3]orange red, [4]dark red
  skyColorsFrom.push(color(62, 84, 143), color(125, 155, 147), color(255, 214, 101), color(193, 113, 67), color(205, 74, 74));

  //The colors are: [0]sea green, [1]bright yellow, [2]orange red
  skyColorsTo.push(color(125, 155, 147), color(255, 214, 101), color(193, 113, 67), color(205, 74, 74));

  //Build four arrays: skyColorLerp A/B/C/D to contain the lerpColor() results between the 
  //skyColorsFrom[] and skyColorsTo[]

  generateColor(1,skyColorsLerpA,0,8);
  generateColor(1,skyColorsLerpB,1,8);
  generateColor(1,skyColorsLerpC,2,8);
  generateColor(1,skyColorsLerpD,3,8);

  //The brushWidth of the ellipse is 1/64 of the height of canvas.
  brushWidth = height / 64;

  //The amount of brush is the window's width divides the brush's width.
  brushAmount = width / brushWidth;

  scl = windowHeight/140;//size of segment
  cols=windowWidth/scl;
  rows=windowHeight/scl;
  //Define the color arrays for lerpColor().

  //The colors are: [0]navy blue, [1]sea green, [2]bright yellow, [3]orange red, [4]dark red
  waterColorsFrom.push(
    //color(205, 74, 74),
    // color(random(255),random(255),random(255)),
    color(193, 113, 67),
    color(255, 214, 101),
    color(125, 155, 147),
    color(62, 84, 143)
  );

  //The colors are: [0]sea green, [1]bright yellow, [2]orange red
  waterColorsTo.push(
    color(205, 74, 74),
    color(193, 113, 67),
    color(255, 214, 101),
    color(125, 155, 147)
  );

  //Build four arrays: skyColorLerp A/B/C/D to contain the lerpColor() results between the
  //skyColorsFrom[] and skyColorsTo[]

  generateColor(2,waterColorsLerpA,0,9);
  generateColor(2,waterColorsLerpB,1,9);
  generateColor(2,waterColorsLerpC,2,9);
  generateColor(2,waterColorsLerpD,3,9);

  w=windowWidth;
  h=windowHeight;
  unitX=w/32;//unit coordinate for x
  unitY=h/32;//unit coordinate for y

  iniCol=(255,255,255,255);
  showingCol=(255,255,255,0);

  shadow();
  blurryBg1();//transition
  blurryBg2();//distant building
  createBuilding1();
  createBuilding2();
  createBuilding3();
  createBuilding4();

  //noLoop();
}

//type: 1=sky;2=water
//colorLerp: array for colors
//num: number of each array
//r: row
function generateColor(type,colorLerp,num,r){
  if(type==1){
    for (let i=1;i<r;i++){
      colorLerp.push(lerpColor(skyColorsFrom[num],skyColorsTo[num],i*0.125));
    }
  }
  else if (type==2){
    for (let i=1;i<r;i++){
      colorLerp.push(lerpColor(waterColorsFrom[num],waterColorsTo[num],i*0.125));
    }
  }
}

function draw() {
  background(255);

  //use mouseX to move the building, the shadow of it and the blurry scenery
  mouseXOffset=map(mouseX,0,width,50,-50);

  mouseYOffset=map(mouseY,0,height,50,-50);

  // if(showSky){
  //   drawSkyEllipse();
  // }
  drawSkyEllipse();

  // fill(255);
  // rect(0,0,w,h);

  //showingSky();

  waterSurface();

  // //color of building
  // fill(71,41,50);
  strokeWeight(2);
  stroke(43,49,45,120);

  //noStroke();

  //drawBuilding(mouseXOffset);
  fill(94,63,79);
  drawBuilding(mouseXOffset*3, building1);

  fill(104,51,33);
  drawBuilding(mouseXOffset*2.5, building2);

  fill(33,74,88);
  drawBuilding(mouseXOffset*2, building3);

  fill(130,65,46);
  drawBuilding(mouseXOffset, building4);
 
  waterColor(polyShadow,71,41,50,20,mouseXOffset);
  waterColor(polyBlurry1,20,70,10,10,mouseXOffset);//transition
  waterColor(polyBlurry2,40,90,30,5,mouseXOffset);//distant building
}


function drawBuilding(xOffset,building){
  push();
  translate(xOffset,0);
  building.draw();
  pop();
}

function createBuilding1(){
  const v=[];
  v.push(createVector(-150,16*unitY));
  v.push(createVector(-50,13.8*unitY));
  v.push(createVector(-26,13.8*unitY));
  v.push(createVector(-26,12*unitY));
  v.push(createVector(-1,12*unitY));
  v.push(createVector(-1,13.8*unitY));
  v.push(createVector(unitX,13.8*unitY));
  v.push(createVector(2*unitX,11*unitY));
  v.push(createVector(3*unitX,11*unitY));
  v.push(createVector(3.4*unitX,9*unitY));
  v.push(createVector(4*unitX,11*unitY));
  v.push(createVector(4.7*unitX,11*unitY));
  v.push(createVector(5.1*unitX,12*unitY));
  v.push(createVector(5.1*unitX,16*unitY));
  building1=new Building(v);
}

function createBuilding2(){
  const v=[];
  v.push(createVector(3.2*unitX,16*unitY));
  v.push(createVector(3.2*unitX,13*unitY));
  v.push(createVector(4.7*unitX,11*unitY));
  v.push(createVector(4.7*unitX,4*unitY));
  v.push(createVector(4.9*unitX,4*unitY));
  v.push(createVector(5.15*unitX,0.5*unitY));
  v.push(createVector(5.35*unitX,0.5*unitY));
  v.push(createVector(5.75*unitX,3*unitY));
  v.push(createVector(6*unitX,4*unitY));
  v.push(createVector(6*unitX,11.2*unitY));
  v.push(createVector(6.8*unitX,13.2*unitY));
  v.push(createVector(6.8*unitX,16*unitY));
  building2=new Building(v);
}

function createBuilding3(){
  const v=[];
  v.push(createVector(5.5*unitX,16*unitY));
  v.push(createVector(5.5*unitX,11.8*unitY));
  v.push(createVector(6*unitX,11.2*unitY));
  v.push(createVector(6.25*unitX,9*unitY));
  v.push(createVector(7*unitX,8*unitY));
  v.push(createVector(7.5*unitX,7*unitY));
  v.push(createVector(8*unitX,8*unitY));
  v.push(createVector(8.7*unitX,9*unitY));
  v.push(createVector(8.7*unitX,10*unitY));
  v.push(createVector(9.9*unitX,12.5*unitY));
  v.push(createVector(9.9*unitX,16*unitY));
  building3=new Building(v);
}

function createBuilding4(){
  const v=[];
  v.push(createVector(8*unitX,16*unitY));
  v.push(createVector(8*unitX,11.8*unitY));
  v.push(createVector(8.7*unitX,10*unitY));
  v.push(createVector(10*unitX,10*unitY));
  v.push(createVector(10.5*unitX,11*unitY));
  v.push(createVector(11.2*unitX,10*unitY));
  v.push(createVector(11.5*unitX,11*unitY));
  v.push(createVector(12*unitX,12*unitY));
  v.push(createVector(13*unitX,13.8*unitY));
  v.push(createVector(15*unitX,13.8*unitY));
  v.push(createVector(16*unitX,16*unitY));
  building4=new Building(v);
}

class Building{
  constructor(buildingVertices){
    this.buildingVertices=buildingVertices;
  }

  draw(){
    beginShape();
    for(let v of this.buildingVertices){
      vertex(v.x,v.y);
    }
    endShape(CLOSE);
  }
}

function shadow(){
  const v=[];
  v.push(createVector(-50,15.5*unitY));
  v.push(createVector(unitX,15.5*unitY));
  v.push(createVector(3*unitX,15*unitY));
  v.push(createVector(4.9*unitX,15*unitY));
  v.push(createVector(4.9*unitX,h));
  v.push(createVector(6.5*unitX,h));
  v.push(createVector(6.5*unitX,14.5*unitY));
  v.push(createVector(8*unitX,15*unitY));
  v.push(createVector(10*unitX,14.8*unitY));
  v.push(createVector(11.2*unitX,15.2*unitY));
  v.push(createVector(12*unitX,15.3*unitY));
  v.push(createVector(15*unitX,14.3*unitY));
  v.push(createVector(15.9*unitX,15.5*unitY));
  polyShadow=new Poly(v);
}

function blurryBg1(){
  const v=[];
  v.push(createVector(16*unitX,16*unitY));
  for (let i=0;i<random(5);i++){
    let xScale=random(16,24);
    let yScale=random(15,16);
    v.push(createVector(xScale*unitX,yScale*unitY));
  }
  v.push(createVector(24*unitX,16*unitY));
  polyBlurry1=new Poly(v);
}

function blurryBg2(){
  const v=[];
  v.push(createVector(24*unitX,16*unitY));
  let increment=0;
  for (let i=0;i<random(20);i++){
    let xScale=constrain(random(24,32)*increment/2,24,82);
    //let xScale=random(24,32)*i/2;
    let yScale=random(15,16);
    v.push(createVector(xScale*unitX,yScale*unitY));
    increment++;
  }
  v.push(createVector(82*unitX,16*unitY));
  polyBlurry2=new Poly(v);
}

class Poly{
  constructor(vertices,modifiers){
    this.vertices=vertices;
    if(!modifiers){
      modifiers=[];
      for(let i=0;i<vertices.length;i++){
        modifiers.push(random(0.01,0.5));
      }
    }
    this.modifiers=modifiers;
  }

  grow(){
    const grownVerts=[];
    const grownMods=[];
    for(let i=0;i<this.vertices.length;i++){
      const j=(i+1)%this.vertices.length;
      const v1=this.vertices[i];
      const v2=this.vertices[j];

      const mod=this.modifiers[i];
      const chmod=m=>{
        return m+(rand()-0.5)*0.1;
      }

      grownVerts.push(v1);
      grownMods.push(chmod(mod));

      const segment=p5.Vector.sub(v2,v1);
      const len=segment.mag();
      segment.mult(rand());

      const v=p5.Vector.add(segment,v1);

      segment.rotate(-PI/2+(rand()-0.5)*PI/4);
      segment.setMag(rand()*len/2*mod);
      v.add(segment);

      grownVerts.push(v);
      grownMods.push(chmod(mod));
    }
    return new Poly(grownVerts,grownMods);
  }

  dup(){
    return new Poly(Array.from(this.vertices),Array.from(this.modifiers));
  }

  draw(){
    beginShape();
    for(let v of this.vertices){
      vertex(v.x,v.y);
    }
    endShape(CLOSE);
  }
}

function waterColor(poly,r,g,b,numLayers,xOffset){
  //const numLayers=20;
  fill(r,g,b,255/(2*numLayers));
  //fill(red(color),green(color),blue(color),255/(2*numLayers));
  noStroke();

  poly=poly.grow().grow();
  poly.vertices = poly.vertices.map((v) => createVector(v.x + xOffset, v.y));

  for(let i=0;i<numLayers;i++){
    if(i==int(numLayers/3) || i==int(2*numLayers/3)){
      poly=poly.grow().grow();
      poly.vertices = poly.vertices.map((v) => createVector(v.x + xOffset, v.y));

    }
    push();
    //translate(xOffset,0);
    poly.grow().draw();
    pop();
  }
}

function rand(){
  return distribute(random(1));
}

function distribute(x){
  return pow((x-0.5)*1.58740105,3)+0.5;
}

//Draw the first line of ellipses using lerpColor() and color arrays.
function drawSkyEllipse() {
  for (let i = 0; i < skyColorsFrom.length; i++) {
    for (let j = 0; j < brushAmount; j++) {
      noStroke();
      fill(skyColorsFrom[i]);
      skyEllipse.push(ellipse(brushWidth / 2 + brushWidth * j, brushWidth / 2 + height / 8 * i, brushWidth));
    }
  }
  drawEllipse(skyLerpEllipseA,skyColorsLerpA,1);
  drawRect(0,0);
  drawEllipse(skyLerpEllipseB,skyColorsLerpB,9);
  drawRect(1,7);
  drawEllipse(skyLerpEllipseC,skyColorsLerpC,17);
  drawRect(2,14);
  drawEllipse(skyLerpEllipseD,skyColorsLerpD,25);
  drawRect(3,21);
  drawRect(3,25);
}

//draw ellipses between each two basic color lines
//r: rows
//colorArray: each array for sky
function drawEllipse(lerpEllipse,colorArray,r){
  for(let i=0;i<7;i++){
    for(let j=0;j<brushAmount;j++){
      fill(colorArray[i]);
      lerpEllipse.push(ellipse(brushWidth/2+brushWidth*j,brushWidth/2+brushWidth*(i+r),brushWidth));
    }
  }
}

//num: the number of each pair of sky colors
function drawRect(num,r){
  for(let i=0;i<7;i++){
    for (let j=0;j<brushAmount;j++){
      let amt=i/7;
      let currentSkyCol=lerpColor(skyColorsFrom[num],skyColorsTo[num],amt);
      fill(currentSkyCol);
      rect(brushWidth*j,brushWidth*(i+r),brushWidth);
    }
  }
  // for (let i=0;i<(h/8);i++){
  //   let amt=i/20;
  //   let currentSkyCol=lerpColor(skyColorsFrom[num],skyColorsTo[num],amt);
  //   fill(currentSkyCol);
  //   rect()
  // }
  //let currentSkyCol=lerpColor(skyColorsFrom[num],skyColorsTo[num])
}
// function generateColor(type,colorLerp,num,r){
//   if(type==1){
//     for (let i=1;i<r;i++){
//       colorLerp.push(lerpColor(skyColorsFrom[num],skyColorsTo[num],i*0.125));
//     }
//   }

function waterSurface(){
  push();
  randomSeed(45);
  translate(0, windowHeight/ 2);
  let yoff = 0;
  for (let y = 0; y < rows / 2; y++) {
    let xoff= 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle * -0.2);
      xoff += mouseY/100;
      //xoff += inc;
      //rect(x*scl,y*scl,scl,scl);
      noStroke();
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      rect(0, 0, 23, 4);
      pop();
    }

    if (y < 14) {
      fill(waterColorsLerpA[y%8]);
    } 

    else if (y>=14 && y<27){
      fill(waterColorsLerpB[y % 8]);  
    }
    else if (y>=27 && y<=50) {
      fill(waterColorsLerpC[y % 8]);
 
    } 
    else {
      fill(waterColorsLerpD[y % 8]);
      
    }
    yoff += inc; 
  }
  //reference web:https://www.youtube.com/watch?v=BjoM9oKOAKY&t=3s.
  pop();
}

//update the sizes of variables
function updateDimensions() {
  w = width;
  h = height;
  unitX = w / 32;
  unitY = h / 32;

  shadow();
  blurryBg1();
  blurryBg2();

  createBuilding1();
  createBuilding2();
  createBuilding3();
  createBuilding4();
}

function updateWater(){
  scl = windowHeight / 140;
  cols = windowWidth / scl;
  rows = windowHeight / scl;
  yoff = 0;
}

//resize the window
function windowResized() {
  clear();
  brushWidth = height / 64;
  brushAmount = width / brushWidth;
  drawSkyEllipse();
  updateDimensions();
  updateWater();
  resizeCanvas(windowWidth, windowHeight);
  
}