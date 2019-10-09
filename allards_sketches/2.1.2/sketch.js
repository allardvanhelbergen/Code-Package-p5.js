/**
 * changing size and position of circles in a grid
 *
 * MOUSE
 * position x          : circle position
 * position y          : circle size
 * left click          : toggle randomness
 *
 * KEYS
 * s                   : save png
 * q                   : draw foreground
 * up / down           : size of foreground
 * 1-3                 : toggle stroke, solid, and alpha modes
 */
'use strict';

var STROKE = 'stroke';
var SOLID = 'solid';
var ALPHA = 'alpha';

var tileCount = 20;
var tileWidth;
var tileHeight;
var isRandom = false;
var activeRandomSeed = 0;
var isDrawForeground = false;
var colorBackground;
var colorForeground;
var strokeColor;
var strokeForeground;
var alphaForeground = 100;
var radiusForeground = 11;
var displayMode = STROKE;

function setup() {
  createCanvas(600, 600);
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  strokeWeight(2);
  frameRate(12);
}

function draw() {
  clear();
  setColors(displayMode);
  translate(tileWidth / 2, tileHeight / 2);

  if (!isRandom) {
    randomSeed(activeRandomSeed);
  }

  // console.log('colorForeground, colorBackground :', colorForeground, colorBackground);

  for (var gridX = 0; gridX < tileCount; gridX++) {
    for (var gridY = 0; gridY < tileCount; gridY++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      var shiftX = random(-mouseX, mouseX) / 20;
      var shiftY = random(-mouseX, mouseX) / 20;

      fill(colorBackground);
      stroke(strokeColor);
      ellipse(posX + shiftX, posY + shiftY, max(mouseY / 15, 12));

      if (isDrawForeground) {
        fill(colorForeground);
        stroke(strokeColor);
        ellipse(posX, posY, radiusForeground);
      }
    }
  }
}

function setColors(thisDisplayMode) {
  if (thisDisplayMode === STROKE) {
    colorBackground = color(0, 0);
    strokeColor = color(0, 255);
    colorForeground = color(0, 0);
  } else if (thisDisplayMode === SOLID) {
    colorBackground = color(0, 255);
    strokeColor = color(0, 0);
    colorForeground = color(255, 255);
  } else if (thisDisplayMode === ALPHA) {
    colorBackground = color(150, 200);
    strokeColor = color(0, 0);
    colorForeground = color(100, 200);
  }
  console.log('colorBackground :', colorBackground);
}

function mousePressed() {
  isRandom = !isRandom;
  activeRandomSeed = random(100000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'q' || key == 'Q') isDrawForeground = !isDrawForeground;

  if (key == '1') displayMode = STROKE;
  if (key == '2') displayMode = SOLID;
  if (key == '3') displayMode = ALPHA;

  if (keyCode == UP_ARROW) radiusForeground += 2;
  if (keyCode == DOWN_ARROW) radiusForeground = max(radiusForeground - 2, 5);
}
