function Camera(){
  this.position = new THREE.Vector3(0,0,0);
  
  this.Update = function(){
    this.position.x = game.glados.players[0].position.x;
    this.position.z = game.glados.players[0].position.z;
    this.position.y = 10;
  }
}