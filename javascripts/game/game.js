function Game(){

  this.player = new Player();
  
  this.Setup = function(){
    SetupThree();
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
    this.plyer.Setup();
  }
  this.UpdateGame = function(){
    this.player.Update();
  }
  this.DrawGame = function(){
  }
}
