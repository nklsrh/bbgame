//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
  document.body.appendChild( stats.domElement );
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;

var SCALING = 1;
var CANVAS = document.getElementById('gameCanvas');
var CTX = CANVAS.getContext('2d');
var CANVAS_WIDTH = 768 * SCALING;
var CANVAS_HEIGHT = 512 * SCALING;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;

var NUMBER_OF_ROWS = 7;
var NUMBER_OF_TILES = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
var TILE_SIZE = 510/NUMBER_OF_ROWS  * SCALING;

var PLAYER_SIZE = TILE_SIZE / 6;

var FLOOR = TILE_SIZE;
var PLAYER_GROUND_LEVEL = FLOOR + TILE_SIZE/2;
var VIEWPORT_SCALE = TILE_SIZE / 2;

var NUMBER_OF_OBJECTS = 0;
var NUMBER_OF_TEAMS = 3;
var NUMBER_OF_ARENA_OBJECTS = 0;

var ARENA_LOADED = true;
var TILES_LOADED = true;
var PLAYERS_LOADED = true;

var FRICTION = 0.7;
var GAME_SPEED = 1;
var MARGIN_OF_ERROR = 0.65;