function Blast(){
  this.position = new THREE.Vector3();
  this.velocity = new THREE.Vector3();
  this.acceleration = new THREE.Vector3();
  
  this.strength = 0;
  this.speed = 0;
  this.radius = 5;
  this.decay = 0.1;
  this.isEnabled = false;
  
  this.index;
  
  this.Setup = function(){
    this.Initialize();  
  }
  
  this.Initialize = function(index){
    this.decay = 1;
    this.index = index;
  }
  
  this.Update = function(){
    if(this.isEnabled){
      this.Physics();
      this.Decay();
      this.Collision();
      if(this.index)
      this.Draw();
    }
  }
  
  this.Physics = function(){
    this.position.x += this.velocity.x * GAME_SPEED;
    this.position.z += this.velocity.z * GAME_SPEED;
    this.velocity.x += (0 - this.velocity.x)/15;
    this.velocity.z += (0 - this.velocity.z)/15;
    this.position.y = FLOOR;
  }
  
  this.Decay = function(){
    this.strength = 0.001 * this.decay;
    this.radius = PLAYER_SIZE * 5;  
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
      if(i != this.index && Math.sqrt((game.glados.players[i].position.x - this.position.x)^2 + (game.glados.players[i].position.z - this.position.z)^2) < this.radius){
        game.glados.players[i].acceleration.x += (this.velocity.x - game.glados.players[i].acceleration.x);
        game.glados.players[i].acceleration.z += (this.velocity.z - game.glados.players[i].acceleration.z);
        game.glados.players[i].velocity.x += this.velocity.x * this.strength;
        game.glados.players[i].velocity.z += this.velocity.z * this.strength;
      }
    }  
  }
  
  this.Draw = function(){
    game.three.scene.__objects[1 + this.index + NUMBER_OF_TILES + NUMBER_OF_ARENA_OBJECTS].position = this.position;
    game.three.scene.__objects[1 + this.index + NUMBER_OF_TILES + NUMBER_OF_ARENA_OBJECTS].radius = this.radius;
  }
}