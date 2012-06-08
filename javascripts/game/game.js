function Game(){

  this.three = new ThreeDee();
  this.assets = new Assets();
  this.glados = new Glados();
  this.env = new Environment();
  
  this.Setup = function(){
    //SetupThree();
    this.three.Setup();
    this.env.Setup();
    this.glados.Setup();
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
    setupKeyboard();
  }
  this.UpdateGame = function(){
    HandleInput();
    this.env.Update();
    this.glados.Update();
  }
  this.DrawGame = function(){
    this.three.Draw();
  }
}
