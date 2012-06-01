var collada;

function Tile() {

  this.position = new THREE.Vector3();
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
    this.position.x = index * 0.05;
  } 

	this.Update = function(){
	}
	
	// SWEET LITTLE FUNCTIONS	//	
	this.SetAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = true;
	}
	this.RemoveAsCurrentTile = function(playerIndex){
		this.hasPlayer[playerIndex] = false;
	}
}
