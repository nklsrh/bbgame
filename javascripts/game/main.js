//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;
var SCALING = 1;
var CANVAS_WIDTH = 1024 * SCALING;
var CANVAS_HEIGHT = 600 * SCALING;

var NUMBER_OF_ROWS = 7;
var NUMBER_OF_TILES = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
var TILE_SIZE = 2;

var PLAYER_SIZE = 1.3;

var FLOOR = TILE_SIZE;
var PLAYER_GROUND_LEVEL = FLOOR + PLAYER_SIZE;
var FRICTION = 0.7;

var NUMBER_OF_OBJECTS = 0;
var NUMBER_OF_TEAMS = 4;

var ARENA_LOADED = false;
var TILES_LOADED = false;
var PLAYERS_LOADED = false;