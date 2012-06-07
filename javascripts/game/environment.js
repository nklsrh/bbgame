function Environment() {
	
  this.TileTypes = {
	}
  
  this.tiles = new Array();
  this.tileCount = NUMBER_OF_TILES;
  
  this.position = new THREE.Vector3(0,0,0);  
  this.modelIndex;
  this.hasModelLoaded = false;
  
	this.TileTypes = {
		NORMAL : "NORMAL",
		HOLE : "HOLE",
		SAND : "SAND",
		GLASS : "GLASS",
		WALL :"WALL",
		GOAL :"GOAL",
		SPAWN: "SPAWN"
	}
  
	this.Setup = function(){
    this.modelIndex = NUMBER_OF_ARENA_OBJECTS - 2;
    this.goalTile = (NUMBER_OF_TILES - 1)/2;
    for(x = 0; x < this.tileCount; x++){    
      this.tiles[x] = new Tile();        
      this.tiles[x].Setup(this, x);
    }  
	}
  

	this.Update = function(){    
    if(ARENA_LOADED){
      this.position.x = Math.floor(NUMBER_OF_ROWS/2) * TILE_SIZE;
      this.position.y = Math.floor(NUMBER_OF_ROWS/2) * TILE_SIZE;
      game.three.scene.__objects[this.modelIndex].position = this.position;      
           
      game.three.focusPoint = this.position;
    }
    if(TILES_LOADED){
      for(x = 0; x < this.tileCount; x++){
        this.tiles[x].Update();
      }
    } 
	}
  
  this.ModelLoaded = function(){
    var result = false;
    if(game.three.scene.__objects.length >= NUMBER_OF_OBJECTS * 2){
      result = true;
    }
    return result;  
  }
}