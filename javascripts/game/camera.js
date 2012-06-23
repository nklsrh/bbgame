var CAMERA_ZOOM = 1;
var ASPECT_RATIO = window.innerWidth/window.innerHeight;

function Camera(){
  this.position = new THREE.Vector3(0,0,0);
  this.offset = new THREE.Vector3(0,0,0);
  
  this.Update = function(){
    this.position.x = game.glados.players[0].position.x;
    this.position.z = game.glados.players[0].position.z;
    this.position.y = CAMERA_ZOOM;
    
    //CAMERA_ZOOM = 1 + Math.abs(0.5 * Math.sin(game.rules.globalTime * 0.01));
    
    this.offset.x = (-this.position.x + CANVAS_WIDTH/2);
    this.offset.z = (-this.position.z + CANVAS_HEIGHT/2);
  }
  
  this.Draw = function(){
    //C_CANVAS.width = C_CANVAS.width;
    //C_CTX.clearRect(0,0, C_CANVAS.width, C_CANVAS.height);
    //C_CTX.drawImage(CANVAS, -this.position.x + CANVAS_WIDTH/2*ASPECT_RATIO/CAMERA_ZOOM, -this.position.z + CANVAS_HEIGHT/2/CAMERA_ZOOM, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}