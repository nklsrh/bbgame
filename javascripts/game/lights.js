function Lights(){

  this.canvas = document.getElementById("backgroundCanvas");
  this.ctx = this.canvas.getContext('2d');
  this.canvas.width = CANVAS_WIDTH;
  this.canvas.height = CANVAS_HEIGHT;
  
  this.r = 31;
  this.g = 0;
  this.b = 100;
  this.I, this.J, this.K;
  
  this.Draw = function(){
    this.I = Math.sin(game.rules.time * 0.02);
    this.J = Math.cos(game.rules.time * 0.02);
    this.K = Math.cos(game.rules.time * 0.02);
    
    this.r = Math.floor(Math.abs(this.I + this.K) * 150);
    this.g = Math.ceil(Math.abs(this.J + this.I) * 00);
    this.b = Math.floor(Math.abs(this.K + this.J) * 100);
    
    this.ctx.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";    
    this.ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    //this.ctx.fillStyle = "rgb(" + this.r/3 + "," + this.g/3 + "," + this.b/3 + ")";
    //this.ctx.fillRect(0,0, CANVAS_WIDTH/4, CANVAS_HEIGHT/4);
  }
}