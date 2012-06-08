//  Input helper functions //
var movementInputX, movementInputY;
var blastInputX, blastInputY;

var accelerometerEvents;
function setupAccelerometer(event){
  accelerometerEvents = event;
}

function PlayerAccelerometerInput(){
  movementInputX = clamp(ACCELEROMETER_SENSITIVITY * accelerometerEvents.accelerationIncludingGravity.x, -1, 1);
  movementInputY = clamp(ACCELEROMETER_SENSITIVITY * accelerometerEvents.accelerationIncludingGravity.y, -1, 1);
}

function PlayerMouseInput(e){
  blastInputX = ( e.clientX / window.innerWidth) * 2 - 1;
  blastInputY = ( e.clientY / window.innerHeight) * 2 - 1;
}

function PlayerKeyboardInput(){
  if (Key.isDown(Key.W)) 
  {movementInputY = -1;}
  else if (Key.isDown(Key.S)) 
  {movementInputY = 1;}
  else {movementInputY = 0;}
  
  if (Key.isDown(Key.A)) 
  {movementInputX = -1;}
  else if (Key.isDown(Key.D)) 
  {movementInputX = 1;}
  else {movementInputX = 0;}
}

function HandleInput(){
  if(DEVICE == "PB"){
    PlayerAccelerometerInput();
  }
  
  if(DEVICE == "PC" || DEVICE == "PB-Browser"){
    if(mouseEvents){
      PlayerMouseInput(mouseEvents);
    }
    PlayerKeyboardInput();
  }
}