//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
  document.body.appendChild( stats.domElement );
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60; //unfortunately the PlayBook isn't powerful enough

var SCALING = 1;
var CANVAS = document.getElementById('gameCanvas');
var CTX = CANVAS.getContext('2d');
var CANVAS_WIDTH = 512 * SCALING;
var CANVAS_HEIGHT = 512 * SCALING;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

var NUMBER_OF_ROWS = 11;
var NUMBER_OF_TILES = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
var TILE_SIZE = 506/NUMBER_OF_ROWS  * SCALING;

var PLAYER_SIZE = TILE_SIZE / 8;

var MARGIN_OF_ERROR = 0.65;
var FLOOR = TILE_SIZE;
var PLAYER_GROUND_LEVEL = FLOOR + TILE_SIZE/2;
var FRICTION = 0.7;
var VIEWPORT_SCALE = TILE_SIZE / 2;

var NUMBER_OF_OBJECTS = 0;
var NUMBER_OF_TEAMS = 3;
var NUMBER_OF_ARENA_OBJECTS = 0;

var ARENA_LOADED = true;
var TILES_LOADED = true;
var PLAYERS_LOADED = true;

var TILT_ACCELERATION = 0.03;

var LOD = 0.4; //LEVEL OF DETAIL, 0 to 1

var DEVICE = "PC";
var browser = navigator.userAgent;
// Are we running in a PlayBook browser?
if (browser.indexOf("PlayBook") > -1 || browser.indexOf("Blackberry") > -1) {
  // Are we running in WebWorks
  LOD = 0.4;
  SCALING = 0.6;
  if (typeof blackberry != 'undefined') {
    DEVICE = "PB";    
  } else {
    DEVICE = "PB-Browser";
  }
} else {
  DEVICE = "PC";
  LOD = 0.8;
  SCALING = 0.9;
}

var GAME_SPEED = 1;


var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = '100';