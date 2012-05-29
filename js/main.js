var FPS = 60;
var width = 512,
    height = 384;

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

function main(){
  canvas.width = width;
  canvas.width = height;
  
  game = new Game();
  game.Setup();
  setInterval(game.Update, 960/FPS);
  game.Draw();
}