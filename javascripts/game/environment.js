function Environment() {
	
  this.TileTypes = {
	}
  
  this.tiles = new Array();
  this.tileCount = NUMBER_OF_TILES;
  
  this.model = new THREE.Object3D();  
  this.modelIndex;
  
	this.Setup = function(){
    this.modelIndex = 0;
    for(x = 0; x < this.tileCount; x++){      
      this.tiles[x] = new Tile();
      this.tiles[x].Setup(this, x);
    }
	}
  
  this.loader = new THREE.ColladaLoader();
  this.loader.load("./assets/objects/env/arena/arena.dae", this.SetModel = function(collada){
    this.model = collada.scene;  
    this.model.rotation.x = -90 * Math.PI/180;
    this.model.updateMatrix();
    game.three.scene.add(this.model);          
  });
  
	this.Update = function(){
    if(this.ModelLoaded){
      this.model = game.three.scene.__objects[this.modelIndex];
      
      for(x = 0; x < this.tileCount; x++){
        this.tiles[x].Update();
      }
    }
	}
  
  this.ModelLoaded = function(){
    var result = false;
    if(game.three.scene.__objects.length > 100){
      result = true;
    }
    return result;  
  }
}
