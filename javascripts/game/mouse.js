var IsMouseDown = false, IsRightMouseDown = false, pMouseDown = false, pRMouseDown = false, mouseX = 1, mouseY = 1, rawX = 1, rawY = 1, pmouseX, pmouseY;

var useMouse = true;  //by default use mouse, check for playbook, then use accelerometer

function setupMouse(){
  if (DEVICE == "PB"){
    window.addEventListener("devicemotion", setupAccelerometer, false);
  }  
  if(DEVICE == "PC"){
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
  
var mouseEvents;
function MouseMove(e) {
  mouseEvents = e;
}