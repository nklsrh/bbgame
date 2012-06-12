function Game(){

  this.three = new ThreeDee();
  this.assets = new Assets();
  this.glados = new Glados();
  this.env = new Environment();
  
  this.lights = new Lights();
  
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
    stats.begin();
    game.DrawGame();    
    stats.end();
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
    this.lights.Draw();
  }
}
