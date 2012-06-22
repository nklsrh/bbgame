var CAMERA_ZOOM = 1.7;

function Camera(){
  this.position = new THREE.Vector3(0,0,0);
  
  this.Update = function(){
    this.position.x = game.glados.players[0].position.x;
    this.position.z = game.glados.players[0].position.z;
    this.position.y = CAMERA_ZOOM;
  }
  
  this.Draw = function(){
    //CANVAS.width = C_CANVAS.width;
    //CTX.drawImage(CANVAS, -this.position.x + CANVAS_WIDTH/2/CAMERA_ZOOM, -this.position.z + CANVAS_HEIGHT/2/CAMERA_ZOOM, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}