function Tile() {

  this.size = TILE_SIZE;
  this.modelIndex;
  
  this.position = new THREE.Vector3(0,0,0);
  this.rotation = new THREE.Vector3(0,0,0);
  this.targetRotation = 0;
  
  this.hasModelLoaded = false;
  this.type = game.env.TileTypes.NORMAL;
  this.index;
  
  this.hasPlayer = new Array();
  
  this.environment;
  
	this.Setup = function(ParentEnvironment, index){
    NUMBER_OF_OBJECTS++;
    this.environment = ParentEnvironment;
    this.index = index;    
    this.modelIndex = (this.index) + NUMBER_OF_ARENA_OBJECTS;    
    this.rotation.x = -90 * Math.PI/180;
    
    if(this.index == game.env.goalTile){
      this.type = game.env.TileTypes.GOAL;
    }
  }

	this.Update = function(){
    if(TILES_LOADED){
      this.TypeRotate();
      this.AlignToGrid();
      this.AlignHole();  
    }
  }
  
  this.AlignToGrid = function(){
    this.position.x = (((this.index-(this.index % NUMBER_OF_ROWS))/(NUMBER_OF_ROWS)) * this.size) + this.size/2;
    this.position.z = ((NUMBER_OF_ROWS - (this.index % NUMBER_OF_ROWS)) * this.size) - this.size/2;
  }
  
  this.TypeRotate = function(){
    switch(this.type){
      case game.env.TileTypes.NORMAL:
        this.targetRotation = 0;
      break;
      case game.env.TileTypes.SAND:
        this.targetRotation = 270 * Math.PI / 180;
      break;
      case game.env.TileTypes.GLASS:
        this.targetRotation = Math.PI;
      break;
      case game.env.TileTypes.HOLE:
        this.targetRotation = 90 * Math.PI / 180;
      break;
      case game.env.TileTypes.GOAL:
        this.targetRotation = 90 * Math.PI / 180;
        this.GoalBlink();
      break;
    }  
    this.rotation.y += (this.targetRotation - this.rotation.y)/5;
  }
  
  this.AlignHole = function(){
    if(this.type == game.env.TileTypes.HOLE){
      this.position.y += (-TILE_SIZE - this.position.y)/2;
    } else {
      this.position.y += (FLOOR - this.position.y)/1.5;
    }
  }  
  
  this.GoalBlink = function(){
    this.blinkValue = Math.abs(Math.cos(game.rules.time * 0.2));
  }
	
  this.Draw = function(){
    CTX.fillStyle = '#111';
    CTX.fillRect((this.position.x - this.size/2), (this.position.z - this.size/2), this.size, this.size);
    CTX.fillStyle = '#fff';
    CTX.fillRect((this.position.x - this.size/2) + this.size * 0.1, (this.position.z - this.size/2) + this.size * 0.1, this.size * 0.9, this.size * 0.9);    
  }
	// SWEET LITTLE FUNCTIONS	//	
	this.SetAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = true;
	}
	this.RemoveAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = false;
	}
}
