var IsMouseDown = false, IsRightMouseDown = false, pMouseDown = false, pRMouseDown = false, mouseX = 1, mouseY = 1, rawX = 1, rawY = 1, pmouseX, pmouseY;

var useMouse = true;  //by default use mouse, check for playbook, then use accelerometer
var MOUSE_SENSITIVITY = 0.008;
var ACCELEROMETER_SENSITIVITY = 8.0;
var DECELERATION = 2;

function setupMouse(){
  var browser = navigator.userAgent;
  // Are we running in a PlayBook browser?
  if (browser.indexOf("PlayBook") > -1) {
    // Are we running in WebWorks
    if (typeof blackberry != 'undefined') {
      useMouse = false;
      blackberry.custom.accelerometer.startAccelerometer();
    }
  }
  if(useMouse){
    window.addEventListener('mousemove', MouseMove, false);
    window.addEventListener('mousedown', MouseDown, false);
    window.addEventListener('mouseup', MouseUp, false);
  }
}


function MouseDown(e) {  
  IsMouseDown = true;	
  pMouseDown = false;
}  
function MouseUp(e) {
  pMouseDown = true;
  IsMouseDown = false;	
}  
  
  var timeMouseNotMoved = 0;
  
function MouseMove(e) {
  if (useMouse) {
    PlayerMouseMovement(e);
  } else {
    PlayerAccelerometerMovement();
  }
}

function PlayerAccelerometerMovement(){
  mouseX = clamp(ACCELEROMETER_SENSITIVITY * blackberry.custom.accelerometer.getAccelX(), -1, 1);
  mouseY = clamp(ACCELEROMETER_SENSITIVITY * blackberry.custom.accelerometer.getAccelY(), -1, 1);
}

function PlayerMouseMovement(e){
  pmouseX = mouseX;
  pmouseY = mouseY;

  rawX = e.clientX;
  rawY = e.clientY;

  mouseX = ( e.clientX / window.innerWidth) * 2 - 1;
  mouseY = ( e.clientY / window.innerHeight) * 2 - 1;

  if(mouseX != pmouseX && pmouseY != mouseY){
	  document.body.style.cursor = 'crosshair';
  }
}