function Tile() {

  this.loader = new THREE.ColladaLoader();
  this.model = new THREE.Object3D();
  this.size;
  this.modelIndex;
  
  this.type;
  this.index;
  this.rotation;
  
  this.hasPlayer = new Array();
  
  this.environment;
  
	this.Setup = function(ParentEnvironment, index){
    this.environment = ParentEnvironment;
    this.index = index;    
  }
  
  this.loader.load("./assets/objects/env/tiles/tile.dae", this.SetTileModel = function(collada){
    this.model = collada.scene;  
    this.model.updateMatrix();
    this.modelIndex = this.model.id;
    game.three.scene.add(this.model);
  });
	
	this.Update = function(){
    this.model.position.x += 0.1;
	}
	
	// SWEET LITTLE FUNCTIONS	//	
	this.SetAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = true;
	}
	this.RemoveAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = false;
	}
}
