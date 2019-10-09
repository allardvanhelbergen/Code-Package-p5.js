'use strict';

var currentStrokeColor;
var strokeColors;

function setup() {
  createCanvas(550, 550);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  background(255);
  strokeWeight(2);
  strokeColors = [
    color(0, 10),
    color(192, 100, 64, 10),
    color(52, 100, 71, 10)
  ];
  currentStrokeColor = strokeColors[0];
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    translate(width / 2, height / 2);

    // Amount of vertexes calculated from MouseY
    var circleResolution = int(map(mouseY, 0, height, 2, 10));
    // Radius defined from the center
    var radius = mouseX - width / 2;
    // Angle of single vertex = total angles (tau is 2*pi) / amount of vertexes.
    var angle = TAU / circleResolution;

    stroke(currentStrokeColor);

    // make shape form vertexes
    beginShape();
    // for each vertex, calculate x and y and * by radius
    for (var i = 0; i <= circleResolution; i++) {
      var x = cos(angle * i) * radius;
      var y = sin(angle * i) * radius;
      vertex(x, y);
    }
    // draw shape to canvas
    endShape();
  }
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 100);
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') currentStrokeColor = strokeColors[0];
  if (key == '2') currentStrokeColor = strokeColors[1];
  if (key == '3') currentStrokeColor = strokeColors[2];
}
