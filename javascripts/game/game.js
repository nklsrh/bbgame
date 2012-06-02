function Game(){

  this.player = new Player();
  this.env = new Environment();
  
  this.Setup = function(){
    this.env.Setup();
    THREE_Setup();
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
    THREE_Update();
  }
  this.DrawGame = function(){
    if(THREE_HasLoaded){
      THREE_Draw();    
    }
  }
}
