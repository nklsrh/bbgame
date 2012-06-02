function Tile() {

  this.loader = new THREE.ColladaLoader();
  this.model = new THREE.Object3D();
  this.size = 2;
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
    this.model = game.three.scene.__objects[2*this.index+1];
    this.model.position.z = ("0"+this.index.toString())[("0"+this.index.toString()).length - 1] * this.size;
    this.model.position.x = ("0"+this.index.toString())[("0"+this.index.toString()).length - 2] * this.size;
  }
	
	// SWEET LITTLE FUNCTIONS	//	
	this.SetAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = true;
	}
	this.RemoveAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = false;
	}
}
