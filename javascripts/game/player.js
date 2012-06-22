function Player(){
  this.acceleration = new THREE.Vector3(0,0,0); 
  this.velocity = new THREE.Vector3(0,0,0);
  this.position = new THREE.Vector3(0,0,0);
  this.hasReset = false;
  this.hasModelLoaded = false;
  
  this.size = PLAYER_SIZE;
  
  this.team;
  this.index;
  
  this.agility;
  this.speed;
  this.strength;
  
  this.isAI = false;
  this.currentTile;
  
  this.blast = new Blast();
  this.maxBlastPower = 0.09;
  
  this.material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  
  this.Setup = function(index){
    NUMBER_OF_OBJECTS++;
    this.LoadNew(index);
  }
  
  this.LoadNew = function(index){
    this.index = index;
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
    }    
  }
  
  this.UpdatePlayer = function(){
    if(movementInputX > 0){      
      this.Right(Math.abs(movementInputX));
    } 
    if(movementInputX < 0){      
      this.Left(Math.abs(movementInputX));
    } 
    if(movementInputY > 0){      
      this.Down(Math.abs(movementInputY));
    }  
    if(movementInputY < 0){      
      this.Up(Math.abs(movementInputY));
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
    this.directionToGoal.z = (this.targetPosition.z - this.position.z) * 0.65;
    
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
    if (this.chosenTarget < 0 && !this.blast.isEnabled){
      for (i = 0; i < NUMBER_OF_TEAMS; i++){
        if (i != this.index){
          var distance = Math.sqrt((game.glados.players[i].position.x - this.position.x)^2 + (game.glados.players[i].position.z - this.position.z)^2);
          if (distance < PLAYER_SIZE * 2){
            this.chosenTarget = i;
          } else {
            this.isApprehending = false;
          }
        }
      }
    } else {
      if(this.chosenTarget >= 0){
        this.AttackTarget(this.chosenTarget);
      }
    }            
  }
  
  this.blastDirection = new THREE.Vector3();
  this.blastStrength = 0;
  
  this.AttackTarget = function(target){
    this.blastDirection.x = game.glados.players[target].position.x - this.position.x;
    this.blastDirection.z = game.glados.players[target].position.z - this.position.z;
    this.blastDirection.normalize();
    this.PrepBlast();
    
    //if(this.blastStrength >= this.aggression / 10){
      //this.PerformBlast();
      this.chosenTarget = -1;
    //}
    
    this.isApprehending = true;
  }
  
  this.isPreppingBlast = false;
  
  this.PrepBlast = function(){
    //if(this.blastStrength < this.maxBlastPower){
      this.blastStrength += 0.01;   
      //this.PerformBlast();
    //}  
    this.isPreppingBlast = true;
  }
  
  this.PerformBlast = function(){
    if(!this.blast.isEnabled && this.isPreppingBlast){
      this.blast.Initialize(this.index);
      
      this.blast.strength = this.blastStrength;
      this.blast.speed = 0.01;
      this.blast.velocity = this.blastDirection;
      this.blast.position = this.position;
      this.blast.isEnabled = true;
      this.isPreppingBlast = false;
      this.blastStrength = 0;

      this.BlastRecoil();
    }
  }
  
  this.BlastRecoil = function(){
    this.velocity.x = -this.blast.velocity.x * 0.2;
    this.velocity.z = -this.blast.velocity.z * 0.2;
  }
  
  this.Up = function(weight){
    this.acceleration.z -= TILT_ACCELERATION * weight * GAME_SPEED * VIEWPORT_SCALE; 
  }
  
  this.Down = function(weight){
    this.acceleration.z += TILT_ACCELERATION * weight * GAME_SPEED * VIEWPORT_SCALE; 
  }
  
  this.Left = function(weight){
    this.acceleration.x -= TILT_ACCELERATION * weight * GAME_SPEED * VIEWPORT_SCALE; 
  }
  
  this.Right = function(weight){
    this.acceleration.x += TILT_ACCELERATION * weight * GAME_SPEED * VIEWPORT_SCALE; 
  }
  
  
  this.Physics = function(){
    if(this.IsOnArena){
      this.position.y = PLAYER_GROUND_LEVEL; 
    } else {
      this.acceleration.y -= 0.028;
    }
    
    this.acceleration.x *= 0.2;
    this.acceleration.z *= 0.2;
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.z += this.acceleration.z;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
    //this.position = this.position.addSelf(this.velocity);
    
    this.velocity.x += (0 - this.velocity.x) / 15;
    this.velocity.z += (0 - this.velocity.z) / 15;
    
    this.Fall();
  }
  
  this.IsOnArena = true;
  this.Fall = function(){
    //LEFT
    if(this.position.x < game.env.tiles[0].position.x - TILE_SIZE * MARGIN_OF_ERROR){
      //this.Reset();
      this.IsOnArena = false;
    }
    //RIGHT
    if(this.position.x > game.env.tiles[game.env.tiles.length-1].position.x + TILE_SIZE * MARGIN_OF_ERROR){
      //this.Reset();
      this.IsOnArena = false;
    }
    //BOTTOM
    if(this.position.z < game.env.tiles[game.env.tiles.length-1].position.z - TILE_SIZE * MARGIN_OF_ERROR){
      //this.Reset();
      this.IsOnArena = false;
    }
    //TOP
    if(this.position.z > game.env.tiles[0].position.z + TILE_SIZE * MARGIN_OF_ERROR){
      //this.Reset();
      this.IsOnArena = false;
    }
    
    if(!this.IsOnArena && this.position.y < -200){
      this.Reset();
    }
  }
  
  this.Draw = function(){
    CTX.fillStyle = '#ff4000';
    CTX.beginPath();
    CTX.arc(this.position.x, this.position.z, this.size, 0, Math.PI * 2, true);    
    CTX.fill();
    
    // ALIASED
    //CTX.drawImage(game.assets.hydrogen, Math.floor(this.position.x - this.size), Math.floor(this.position.z - this.size), Math.floor(this.size * 2), Math.floor(this.size * 2));
    // ANTI-ALIASED
    //CTX.drawImage(game.assets.hydrogen, this.position.x - this.size, this.position.z - this.size, (this.size * 2), (this.size * 2));
  }
  
  this.Reset = function(){
    this.position = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(0,0,0);
    this.position.x = (this.index % (NUMBER_OF_TEAMS/2)) * (NUMBER_OF_ROWS) * TILE_SIZE;
    this.position.z = Math.floor(this.index % NUMBER_OF_TEAMS/2) * (NUMBER_OF_ROWS) * TILE_SIZE;
    this.position.y = PLAYER_GROUND_LEVEL;
    this.IsOnArena = true;
    
    this.hasReset = true;
  }
}
