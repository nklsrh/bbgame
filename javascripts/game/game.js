function Game(){

  this.three = new ThreeDee();
  this.player = new Player();
  
  this.Setup = function(){
    //SetupThree();
    this.three.Setup();
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
    this.player.Setup();
  }
  this.UpdateGame = function(){
    this.player.Update();
  }
  this.DrawGame = function(){
    this.three.Draw();
  }
}
