//COPYRIGHT 2012 NIKHIL SURESH
function main(){

	game = new Game();
	game.Setup();
	
	setInterval(game.Update, 960/FPS);
	game.Draw();
}

var FPS = 60;
var SCALING = 0.6;
var CANVAS_WIDTH = 1024 * SCALING;
var CANVAS_HEIGHT = 600 * SCALING;

var NUMBER_OF_TILES = 100;

var gameCanvas, ctx;
gameCanvas = document.getElementById("canvas3D");
gameCanvas.width = CANVAS_WIDTH;
gameCanvas.height = CANVAS_HEIGHT;