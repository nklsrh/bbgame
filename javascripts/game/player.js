function Player(){
  this.position = new THREE.Vector3(0,0,0);
  this.acceleration;
  this.velocity;
  
  this.Setup = function(){
    this.Reset();
  }
  this.Update = function(){
  }
  
  this.Reset = function(){
    this.position = new THREE.Vector3(0,0,0);
    this.acceleration = new THREE.Vector3(0,0,0);
    this.velocity = new THREE.Vector3(0,0,0);
  }
}
