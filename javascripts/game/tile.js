function Tile() {

  this.size = 2;
  this.modelIndex;
  
  this.model = new THREE.Object3D();
  
  this.type;
  this.index;
  
  this.hasPlayer = new Array();
  
  this.environment;
  
	this.Setup = function(ParentEnvironment, index){
    this.environment = ParentEnvironment;
    this.index = index;    
    this.modelIndex = 2*this.index + game.env.modelIndex;
  }
  
  this.loader = new THREE.ColladaLoader();
  this.loader.load("./assets/objects/env/tiles/tile.dae", this.SetModel = function(collada){
    this.model = collada.scene;  
    this.model.rotation.x = -90 * Math.PI/180;
    game.three.scene.add(this.model);
  });
	
	this.Update = function(){
    this.model = game.three.scene.__objects[this.modelIndex];
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
