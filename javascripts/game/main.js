//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;
var scaling = 0.4;
var canvasWidth = 1024 * scaling;
var canvasHeight = 600 * scaling;

var NUMBER_OF_ROWS = 7;
var NUMBER_OF_TILES = NUMBER_OF_ROWS * NUMBER_OF_ROWS;
var TILE_SIZE = 2;