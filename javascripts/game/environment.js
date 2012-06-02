function Environment() {
	
  this.TileTypes = {
	}
  
  this.tiles = new Array();
  this.tileCount = NUMBER_OF_TILES;
  
  this.stadiumModel;
  this.stadiumPosition;
  
	this.Setup = function(){
    for(x = 0; x < this.tileCount; x++){
      this.tiles[x] = new Tile();
      this.tiles[x].Setup(this, x);
    }
	}

	this.Update = function(){     
    for(x = 0; x < this.tileCount; x++){
      this.tiles[x].Update();
    }
	}
}
