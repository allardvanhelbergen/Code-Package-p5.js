// P_1_0_01

/**
 * changing colors and size by moving the mouse
 *
 * MOUSE
 * position x          : size
 * position y          : color
 *
 * KEYS
 * s                   : save png
 */
'use strict';

function setup() {
  createCanvas(720, 720);
  noCursor();

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(mouseY / 2, 100, 100);

  // Fill is opposite colour of background.
  fill(360 - mouseY / 2, 100, 100);
  strokeWeight(mouseY % 10 * 2);
  stroke(360 - mouseX / 2, 100, 100);
  rect(360, 360, mouseX + 1, mouseX + 1);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
