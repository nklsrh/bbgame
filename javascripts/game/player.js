function Player(){
  this.acceleration;
  this.velocity;
  this.position = new THREE.Vector3(0,0,0);
  this.modelIndex;
  this.hasReset = false;
  this.hasModelLoaded = false;
  
  this.team;
  this.index;
  
  this.isAI = false;
  
  this.Setup = function(index){
    NUMBER_OF_OBJECTS++;
    this.index = index;
    this.modelIndex = ((2*NUMBER_OF_TILES) + game.env.modelIndex + 2) + (index*2) + 1;
  }
  
  this.Update = function(){
    if(PLAYERS_LOADED){
      if(!this.hasReset){
        this.Reset();
      }  
      this.position.x = (this.index % (NUMBER_OF_TEAMS/2)) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
      this.position.y = -Math.floor(this.index % NUMBER_OF_TEAMS/2) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
      this.position.z = Math.abs(Math.sin(game.three.time * 0.01) * 5) + PLAYER_SIZE + FLOOR;      
      game.three.scene.__objects[this.modelIndex].position = this.position;      
    }
  }
  
  this.Reset = function(){
    this.position = new THREE.Vector3((this.index % 2),0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(0,0,0);
    this.hasReset = true;
  }
}
