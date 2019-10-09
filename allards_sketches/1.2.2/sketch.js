/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1-7                 : load different images
 * q                   : no color sorting
 * w                   : sort colors on hue
 * e                   : sort colors on saturation
 * r                   : sort colors on brightness
 * t                   : sort colors on greyscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */
'use strict';

var colors;
var currentImage = 0;
var img;
var imagesLoaded = [];
var sortMode = null;

var imagesPath = [
  'data/pic1.jpg',
  'data/pic2.jpg',
  'data/pic3.jpg',
  'data/pic4.jpg',
  'data/pic4_alt.jpg',
  'data/pic5.jpg',
  'data/torstein-horgmo.jpg'
];

function preload() {
  for (var i = 0; i < imagesPath.length; i++) {
    imagesLoaded.push(loadImage(imagesPath[i]));
  }
}

function setup() {
  createCanvas(600, 600);
  noCursor();
  noStroke();

  img = imagesLoaded[currentImage];
}

function draw() {
  document.getElementById('js-imagePath').innerHTML = imagesPath[currentImage];
  document.getElementById('js-sortMode').innerHTML = sortMode ? sortMode : 'null';

  var tileCount = floor(width / max(mouseX / 3, 3));
  var rectSize = width / tileCount;

  // Get all the colors from the image.
  img = imagesLoaded[currentImage];
  img.loadPixels();
  colors = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);
      var i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      colors.push(c);
    }
  }

  gd.sortColors(colors, sortMode);

  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++;
    }
  }
}

function keyReleased() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') currentImage = 0;
  if (key == '2') currentImage = 1;
  if (key == '3') currentImage = 2;
  if (key == '4') currentImage = 3;
  if (key == '5') currentImage = 4;
  if (key == '6') currentImage = 5;
  if (key == '7') currentImage = 6;

  if (key == 'q') sortMode = null;
  if (key == 'w') sortMode = gd.HUE;
  if (key == 'e') sortMode = gd.SATURATION;
  if (key == 'r') sortMode = gd.BRIGHTNESS;
  if (key == 't') sortMode = gd.GRAYSCALE;
}
