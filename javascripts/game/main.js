//COPYRIGHT 2012 NIKHIL SURESH
var gameCanvas, ctx;

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

var NUMBER_OF_TILES = 3;