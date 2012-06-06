function Blast(){
  this.position = new THREE.Vector3();
  this.velocity = new THREE.Vector3();
  this.acceleration = new THREE.Vector3();
  
  this.strength = 0;
  this.speed = 0;
  this.radius = 0;
  this.decay = 0.1;
  this.isEnabled = false;
  
  this.Setup = function(){
    this.Initialize();  
  }
  
  this.Initialize = function(){
    this.decay = 1;
    this.isEnabled = true;
  }
  
  this.Update = function(){
    this.Physics();
    this.Decay();
    this.Collision();
  }
  
  this.Physics = function(){
    this.position.x += this.velocity.x * GAME_SPEED;
    this.position.y += this.velocity.y * GAME_SPEED;
  }
  
  this.Decay = function(){
    this.strength = 0.01 * this.decay;
    this.decay -= 0.05;
    if(this.decay <= 0){
      this.isEnabled = false;
      this.velocity = new THREE.Vector3(0,0,0);
      this.strength = 0;
      this.decay = 0;
    }
  }
  
  this.Collision = function(){
    for(i = 0; i < NUMBER_OF_TEAMS; i++){
      if(this.position.distanceTo(game.glados.players[i].position) < this.radius){
        game.glados.players[i].acceleration.x += (this.velocity.x - game.glados.players[i].acceleration.x) * 0.05;
        game.glados.players[i].acceleration.y += (this.velocity.y - game.glados.players[i].acceleration.y) * 0.05;
        game.glados.players[i].velocity.x += this.velocity.x * this.strength * 0.04;
        game.glados.players[i].velocity.y += this.velocity.y * this.strength * 0.04;
      }
    }  
  }
}