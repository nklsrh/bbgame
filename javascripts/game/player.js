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
  
  this.blast = new Blast();
  this.maxBlastPower = 0.09;
  
  this.Setup = function(index){
    NUMBER_OF_OBJECTS++;
    this.LoadNew(index);
  }
  
  this.LoadNew = function(index){
    this.index = index;
    this.modelIndex = NUMBER_OF_TILES + NUMBER_OF_ARENA_OBJECTS + index;
    this.position.y = PLAYER_GROUND_LEVEL;  
    this.targetPosition.x = game.env.tiles[game.env.goalTile].position.x;
    this.targetPosition.z = game.env.tiles[game.env.goalTile].position.z;
    
    this.aggression = 0.5;
    this.agility = 1 - (this.aggression * 0.05);    
    
    this.blast.Setup();
    this.blast.isEnabled = false;
  }
  
  this.Update = function(){
    if(PLAYERS_LOADED){
      if(!this.hasReset){
        this.Reset();
      }  
      
      this.UpdateIntelligence();
      this.Physics();
      this.UpdateBlast();
      
      
      this.position.y = PLAYER_GROUND_LEVEL;
      //this.position.y = Math.abs(Math.sin(game.three.time * 0.01) * 5) + PLAYER_SIZE + FLOOR;      
      game.three.scene.__objects[this.modelIndex].position = this.position;      
    }
  }
  
  this.UpdateBlast = function(){
    this.blast.Update();
  }
  
  this.UpdateIntelligence = function(){
    if(this.isAI){
      this.UpdateBot();
    } else {
      this.UpdatePlayer();
      game.three.focusPoint = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
    }    
  }
  
  this.UpdatePlayer = function(){
    if(mouseX > 0){      
      this.Right(Math.abs(mouseX));
    } 
    if(mouseX < 0){      
      this.Left(Math.abs(mouseX));
    } 
    if(mouseY > 0){      
      this.Down(Math.abs(mouseY));
    }  
    if(mouseY < 0){      
      this.Up(Math.abs(mouseY));
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
  
  this.Tracking = function(){  
    this.targetPosition.z = game.env.tiles[game.env.goalTile].position.z;
    this.targetPosition.x = game.env.tiles[game.env.goalTile].position.x;
    this.targetPosition.y = PLAYER_GROUND_LEVEL;
    
    this.directionToGoal.x = (this.targetPosition.x - this.position.x) * 0.65;
    this.directionToGoal.y = (this.targetPosition.y - this.position.y) * 0.65;
    this.directionToGoal.z = (this.targetPosition.z - this.position.z) * 0.65;
    //this.directionToGoal.x -= this.position.x;
    //this.directionToGoal.y -= this.position.y;
    
    this.directionToGoal.normalize();

    if (!this.isApprehending){
      if (this.directionToGoal.x > 0){
        this.Right(this.aggression);
      }
      if (this.directionToGoal.x < 0){
        this.Left(this.aggression);
      }
      if (this.directionToGoal.z < 0){
        this.Up(this.aggression);
      }
      if (this.directionToGoal.z > 0){
        this.Down(this.aggression);
      }
    }  
  } 
  
  this.chosenTarget = -1;
  this.Apprehension = function(){
    if (this.chosenTarget < 0){
      for (i = 0; i < NUMBER_OF_TEAMS; i++){
        if (i != this.index){
          var distance = Math.sqrt((game.glados.players[i].position.x - this.position.x)^2 + (game.glados.players[i].position.z - this.position.z)^2)
          if (distance < PLAYER_SIZE){
            this.chosenTarget = i;
          } else {
            this.isApprehending = false;
          }
        }
      }
    } else {
      //this.AttackTarget(this.chosenTarget);
    }            
  }
  
  this.blastDirection = new THREE.Vector3();
  this.blastStrength = 0;
  
  this.AttackTarget = function(target){
    this.blastDirection.x = game.glados.players[target].position.x - this.position.x;
    this.blastDirection.z = game.glados.players[target].position.z - this.position.z;
    this.blastDirection.normalize();
    this.PrepBlast();
    
    if(this.blastStrength >= this.aggression * this.maxBlastPower){
      this.PerformBlast();
      chosenTarget = -1;
    }
    
    this.isApprehending = true;
  }
  
  this.isPreppingBlast = false;
  
  this.PrepBlast = function(){
    if(this.blastStrength < this.maxBlastPower){
      this.blastStrength += 0.01;    
    }  
    this.isPreppingBlast = true;
  }
  
  this.PerformBlast = function(){
    if(!this.blast.isEnabled && this.isPreppingBlast){
      this.blast.Initialize();
      
      this.blast.strength = this.blastStrength;
      this.blast.speed = 0.01;
      this.blast.velocity = this.blastDirection;
      this.blast.position = this.position;
      this.isPreppingBlast = false;
      this.blastStrength = 0;

      this.BlastRecoil();
    }
  }
  
  this.BlastRecoil = function(){
    this.velocity.x = -this.blast.velocity.x * 0.2 * this.blast.strength;
    this.velocity.z = -this.blast.velocity.z * 0.2 * this.blast.strength;
  }
  
  this.Up = function(weight){
    this.acceleration.z -= TILT_ACCELERATION * weight * GAME_SPEED; 
  }
  
  this.Down = function(weight){
    this.acceleration.z += TILT_ACCELERATION * weight * GAME_SPEED; 
  }
  
  this.Left = function(weight){
    this.acceleration.x -= TILT_ACCELERATION * weight * GAME_SPEED; 
  }
  
  this.Right = function(weight){
    this.acceleration.x += TILT_ACCELERATION * weight * GAME_SPEED; 
  }
  
  
  this.Physics = function(){
    this.acceleration.x *= 0.2;
    this.acceleration.z *= 0.2;
    this.velocity.x += this.acceleration.x;
    this.velocity.z += this.acceleration.z;
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    //this.position = this.position.addSelf(this.velocity);
    this.position.y = PLAYER_GROUND_LEVEL; 
    
    this.velocity.x += (0 - this.velocity.x) / 15;
    this.velocity.z += (0 - this.velocity.z) / 15;
    
    game.three.scene.__objects[this.modelIndex].rotation.z += this.velocity.x * GAME_SPEED * 3;
    game.three.scene.__objects[this.modelIndex].rotation.x += this.velocity.z * GAME_SPEED * 3;
    //this.acceleration = this.acceleration.multiplySelf(0.9);
    this.Fall();
  }
  
  this.Fall = function(){
    //LEFT
    if(this.position.x < game.env.tiles[0].position.x - TILE_SIZE * MARGIN_OF_ERROR){
      this.Reset();
    }
    //RIGHT
    if(this.position.x > game.env.tiles[game.env.tiles.length-1].position.x + TILE_SIZE * MARGIN_OF_ERROR){
      this.Reset();
    }
    //BOTTOM
    if(this.position.z < game.env.tiles[game.env.tiles.length-1].position.z - TILE_SIZE * MARGIN_OF_ERROR){
      this.Reset();
    }
    //TOP
    if(this.position.z > game.env.tiles[0].position.z + TILE_SIZE * MARGIN_OF_ERROR){
      this.Reset();
    }
  }
  
  this.Reset = function(){
    this.position = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(0,0,0);
    this.position.x = (this.index % (NUMBER_OF_TEAMS/2)) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
    this.position.z = Math.floor(this.index % NUMBER_OF_TEAMS/2) * (NUMBER_OF_ROWS-1) * TILE_SIZE;
    
    game.three.cameraAngle = 0;
    this.hasReset = true;
  }
}
