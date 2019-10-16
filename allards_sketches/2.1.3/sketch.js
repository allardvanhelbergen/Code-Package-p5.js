/**
 * changing size and position of circles in a grid
 *
 * MOUSE
 * position x          : circle amount and size
 * position y          : circle position
 * left click          : toggle randomness
 *
 * KEYS
 * s                   : save png
 * q                   : draw foreground
 * up / down           : size of foreground
 * 1-2                 : toggle stroke, solid, and alpha modes
 */
'use strict';

var tileCount = 20;
var tileWidth;
var tileHeight;
var isRandom = false;
var activeRandomSeed = 0;
var circleCount = 0;
var endSize = 0;
var endOffset = 0;
var drawMode = 1;

function setup() {
  createCanvas(600, 600);
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  ellipseMode(CENTER);
  frameRate(12);
}

function draw() {
  clear();

  switch (drawMode) {
  case 1:
    noFill();
    stroke(0, 128);
    strokeWeight(1);
    break;
  case 2:
    fill(20, 10);
    strokeWeight(0);
    break;
  }

  if (!isRandom) {
    randomSeed(activeRandomSeed);
  }

  translate(tileWidth / 2, tileHeight / 2);
  // cast to int makes size of additional circles discreet rather than fluid
  circleCount = int(mouseX / 30 + 1);
  // tileWidth > 0 causes map to map to invert result (larger mouseX -> smaller endSize)
  endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0);
  endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileHeight - endSize) / 2);

  for (var gridX = 0; gridX < tileCount; gridX++) {
    for (var gridY = 0; gridY < tileCount; gridY++) {
      // store the translate of the larger grid
      push();
      // translate to put the origin on a grid cell
      translate(tileWidth * gridX, tileHeight * gridY);
      // Scale so the circle fits exactly into a grid cell
      scale(1, tileHeight / tileWidth);

      // rotate the whole grid randomly
      var toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      // then draw the circle stack
      for (var i = 0; i < circleCount; i += 1) {
        // tileWidth > endSize causes map to invert result (largest diameter rendered first)
        var diameter = map(i, 0, circleCount, tileWidth, endSize);
        var offset = map(i, 0, circleCount, 0, endOffset);
        ellipse(offset, 0, diameter);
      }

      // pop origin from grid cell back to larger grid.
      pop();
    }
  }
}

function mousePressed() {
  isRandom = !isRandom;
  activeRandomSeed = random(100000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}
