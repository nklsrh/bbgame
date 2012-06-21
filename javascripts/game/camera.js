var CAMERA_ZOOM = 1;

function Camera(){
  this.position = new THREE.Vector3(0,0,0);
  
  this.Update = function(){
    this.position.x = game.glados.players[0].position.x;
    this.position.z = game.glados.players[0].position.z;
    this.position.y = CAMERA_ZOOM;
  }
  
  this.Draw = function(){
    C_CANVAS.width = C_CANVAS.width;
    C_CTX.drawImage(CANVAS, -this.position.x + CANVAS_WIDTH/2/CAMERA_ZOOM, -this.position.z + CANVAS_HEIGHT/2/CAMERA_ZOOM, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

var C_CANVAS = document.getElementById('cameraCanvas');
var C_CTX = C_CANVAS.getContext('2d');
C_CANVAS.width = CANVAS_WIDTH / CAMERA_ZOOM;
C_CANVAS.height = CANVAS_HEIGHT / CAMERA_ZOOM;