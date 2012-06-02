function Environment() {
	
  this.TileTypes = {
	}
  
  this.tiles = new Array();
  this.tileCount = NUMBER_OF_TILES;
  
  this.stadiumModel;
  this.stadiumPosition;
  
  this.tileModelsLoaded = false;
  
	this.Setup = function(){
    
	}
  
  this.SetupTiles = function(){   
    if(!this.tileModelsLoaded){ 
      for(x = 0; x < this.tileCount; x++){
        this.tiles[x] = new Tile();
        this.tiles[x].Setup(this, x);
      }
      this.tileModelsLoaded = true;
    }
  }

	this.Update = function(){     
    if(this.tileModelsLoaded){
      for(x = 0; x < this.tileCount; x++){
        this.tiles[x].Update();
      }
    }
    if(THREE_HasLoaded){
      this.SetupTiles();
    }
	}
}
