'use strict';

var actStrokeCap;
var drawLeft = true;
var drawRight = true;
var tileCount = 20;
var tileWidth;
var tileHeight;
var strokeDenominator = 20;
var strokeCaps;

function setup() {
  createCanvas(600, 600);
  strokeCaps = [
    ROUND,
    SQUARE,
    PROJECT
  ];
  actStrokeCap = strokeCaps[0];
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  frameRate(5);
}

function draw() {
  clear();
  strokeCap(actStrokeCap);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      var randomNum = random();

      if (randomNum < .5) { // it's left
        if (drawLeft) {
          strokeWeight(mouseY / strokeDenominator);
          line(posX, posY, posX + tileWidth, posY + tileHeight);
        }
      } else { // it's right
        if (drawRight) {
          strokeWeight(mouseX / strokeDenominator);
          line(posX, posY + tileHeight, posX + tileWidth, posY);
        }
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'q') drawLeft = !drawLeft;
  if (key == 'w') drawRight = !drawRight;

  if (key == '1') actStrokeCap = strokeCaps[0];
  if (key == '2') actStrokeCap = strokeCaps[1];
  if (key == '3') actStrokeCap = strokeCaps[2];
}
