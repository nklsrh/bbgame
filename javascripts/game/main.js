//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;
var scaling = 0.3;
var canvasWidth = 1024 * scaling;
var canvasHeight = 600 * scaling;

var NUMBER_OF_TILES = 100;
var TILE_SIZE = 2;