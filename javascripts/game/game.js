function Game(){

  this.three = new ThreeDee();
  this.player = new Player();
  this.env = new Environment();
  
  this.Setup = function(){
    this.three.Setup();
    this.env.Setup();
    game.StartNewGame();
  }
  this.Update = function(){
    game.UpdateGame();   
  }
  this.Draw = function(){	
    game.DrawGame();
    requestAnimationFrame(game.Draw);		
  }

  this.StartNewGame = function(){
    setupMouse();
  }
  this.UpdateGame = function(){
    this.env.Update();
  }
  this.DrawGame = function(){
    this.three.Draw();
  }
}
