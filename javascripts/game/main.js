//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;
var SCALING = 0.7;
var CANVAS_WIDTH = 1024 * SCALING;
var CANVAS_HEIGHT = 600 * SCALING;

var NUMBER_OF_ROWS = 5;
var NUMBER_OF_TILES = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
var TILE_SIZE = 2;

var PLAYER_SIZE = 0.25;

var MARGIN_OF_ERROR = 0.65;
var FLOOR = TILE_SIZE;
var PLAYER_GROUND_LEVEL = FLOOR + TILE_SIZE/2;
var FRICTION = 0.7;

var NUMBER_OF_OBJECTS = 0;
var NUMBER_OF_TEAMS = 3;
var NUMBER_OF_ARENA_OBJECTS = 0;

var ARENA_LOADED = false;
var TILES_LOADED = false;
var PLAYERS_LOADED = false;

var TILT_ACCELERATION = 0.03;

var LOD = 0.2; //LEVEL OF DETAIL, 0 to 1

var DEVICE = "PC";
var browser = navigator.userAgent;
// Are we running in a PlayBook browser?
if (browser.indexOf("PlayBook") > -1 || browser.indexOf("Blackberry") > -1) {
  // Are we running in WebWorks
  LOD = 0.2;
  if (typeof blackberry != 'undefined') {
    DEVICE = "PB";    
  } else {
    DEVICE = "PB-Browser";
  }
} else {
  DEVICE = "PC";
  LOD = 0.5;
}

var GAME_SPEED = 1;