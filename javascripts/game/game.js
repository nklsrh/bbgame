function Game(){

  this.assets = new Assets();
  this.glados = new Glados();
  this.env = new Environment();
  
  this.rules = new Rules();
  //this.lights = new Lights();
  //this.camera = new Camera();
  
  this.Setup = function(){
    this.assets.Setup();
    this.env.Setup();
    this.glados.Setup();
    this.rules.Setup();
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
    //this.camera.Update();
    this.env.Update();
    this.glados.Update();
    this.rules.Update();    
  }
  this.DrawGame = function(){
    CANVAS.width = CANVAS.width;
    //this.lights.Draw();
    this.env.Draw();
    this.glados.Draw();
    //this.camera.Draw();
  }
}
