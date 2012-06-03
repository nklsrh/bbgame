var IsMouseDown = false, IsRightMouseDown = false, pMouseDown = false, pRMouseDown = false, mouseX = 1, mouseY = 1, rawX = 1, rawY = 1, pmouseX, pmouseY;

function setupMouse(){
  window.addEventListener('mousemove', MouseMove, false);
  window.addEventListener('mousedown', MouseDown, false);
  window.addEventListener('mouseup', MouseUp, false);
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
  
