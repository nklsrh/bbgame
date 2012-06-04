function Player(){
  this.acceleration = new THREE.Vector3(0,0,0); 
  this.velocity = new THREE.Vector3(0,0,0);
  this.position = new THREE.Vector3(0,0,0);
  this.modelIndex;
  this.hasReset = false;
  this.hasModelLoaded = false;
  
  this.team;
  this.index;
  
  this.agility;
  this.speed;
  this.strength;
  
  this.isAI = false;
  this.currentTile;
  
  this.Setup = function(index){
    NUMBER_OF_OBJECTS++;
    this.index = index;
    this.modelIndex = ((2*NUMBER_OF_TILES) + game.env.modelIndex + 2) + (index*2) + 1;
    this.position.z = PLAYER_GROUND_LEVEL;  
    this.targetPosition.x = game.env.tiles[game.env.goalTile].position.x;
    this.targetPosition.y = game.env.tiles[game.env.goalTile].position.z;
    
    this.aggression = 0.5;
    this.agility = 1 - (this.aggression * 0.1);
  }
  
  this.Update = function(){
    if(PLAYERS_LOADED){
      if(!this.hasReset){
        this.Reset();
      }  
      
      this.UpdateIntelligence();
      this.Physics();
      this.position.z = PLAYER_GROUND_LEVEL;
      //this.position.z = Math.abs(Math.sin(game.three.time * 0.01) * 5) + PLAYER_SIZE + FLOOR;      
      game.three.scene.__objects[this.modelIndex].position = this.position;      
    }
  }
  
  this.UpdateIntelligence = function(){
    if(this.isAI){
      this.UpdateBot();
    } else {
      //this.UpdatePlayer();
    }
  }
  
  this.UpdateBot = function(){
    this.Tracking();
    this.Apprehension();
  }
  
  this.directionToGoal = new THREE.Vector3(0,0,0);
  this.targetPosition = new THREE.Vector3(0,0,0);
  this.isApprehending = false;
  this.aggression;
  this.chosenTarget;
  
  this.Tracking = function(){  
    this.targetPosition.x = game.env.tiles[game.env.goalTile].position.z;
    this.targetPosition.y = -game.env.tiles[game.env.goalTile].position.x;
    this.targetPosition.z = PLAYER_GROUND_LEVEL;
    
    this.directionToGoal.x = (this.targetPosition.x - this.position.x) * 0.65;
    this.directionToGoal.y = (this.targetPosition.y - this.position.y) * 0.65;
    this.directionToGoal.normalize();

    if (!this.isApprehending && this.position.distanceTo(this.targetPosition) > TILE_SIZE * this.aggression + this.agility){
      if (this.directionToGoal.x > 0){
        this.Right(1);
      }
      if (this.directionToGoal.x < 0){
        this.Left(1);
      }
      if (this.directionToGoal.y > 0){
        this.Up(1);
      }
      if (this.directionToGoal.y < 0){
        this.Down(1);
      }
    }  
  } 
  
  this.Apprehension = function(){
    if (this.chosenTarget < 0){
      for (i = 0; i < NUMBER_OF_TEAMS; i++){
        if (i != this.index){
          var distance = this.position.distanceTo(game.glados.players[i].position);
          if (distance < PLAYER_SIZE * this.aggression * TILE_SIZE){
            this.chosenTarget = i;
          } else {
            this.isApprehending = false;
          }
        }
      }
    } else {
      //AttackTarget(game, chosenTarget);
    }            
  }
  
  this.Up = function(weight){
    this.acceleration.y += 0.005 * weight; 
  }
  
  this.Down = function(weight){
    this.acceleration.y -= 0.005 * weight; 
  }
  
  this.Left = function(weight){
    this.acceleration.x -= 0.005 * weight; 
  }
  
  this.Right = function(weight){
    this.acceleration.x += 0.005 * weight; 
  }
  
  
  this.Physics = function(){
    this.acceleration.x *= this.agility;
    this.acceleration.y *= this.agility;
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //this.position = this.position.addSelf(this.velocity);
    this.position.z = PLAYER_GROUND_LEVEL; 
    
    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;
    //this.acceleration = this.acceleration.multiplySelf(0.9);
  }
  
  this.Reset = function(){
    this.position = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(0,0,0);
    this.position.x = (this.index % (NUMBER_OF_TEAMS/2)) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
    this.position.y = -Math.floor(this.index % NUMBER_OF_TEAMS/2) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
    
    this.hasReset = true;
  }
}
