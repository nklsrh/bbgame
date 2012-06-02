////////////////////////////////////////////////////////////////////////////// SETUP
var canvasElement = document.getElementById("canvas3D");

var GLGE_doc = new GLGE.Document();
GLGE_doc.load("./glge/scene_arena.xml");

var GLGE_renderer = new GLGE.Renderer(canvasElement);
var GLGE_scene = new GLGE.Scene();
var GLGE_camera = GLGE_scene.camera;

var Arena; 
var GLGE_Tiles = new Array;
var GLGE_Player;
var GLGE_Bots = new Array;
var GLGE_BombotSpawn = new Array;
var GLGE_BombotBlast = new Array;

var GLGE_HasLoaded = false;
////////////////////////////////////////////////////////////////////////////// LOAD
GLGE_doc.onLoad = function GLGE_LoadScene(){	  
	GLGE_scene = GLGE_doc.getElement("mainscene");
	GLGE_camera = GLGE_doc.getElement("maincamera");
	GLGE_scene.setBackgroundColor('#000');
	GLGE_renderer.setScene(GLGE_scene);
	GLGE_LoadCamera();	
	
	GLGE_HasLoaded = true;
}

///////////////////////////////////////////////////////////////////////////// RENDER
function GLGE_Render(){	
	GLGE_renderer.render();	
}
///////////////////////////////////////////////////////////////////////////// UPDATE
function GLGE_Update(){	
  GLGE_UpdateCamera();
}

function GLGE_ScaleObject(object, x, y, z){	
	object.setScaleX(x);
	object.setScaleY(y);
	object.setScaleZ(z);
}

function GLGE_LoadCamera(){
	GLGE_camera.setFovY(30);
}







////////////////////////////////////////////////////////////////////////////// CAMERAWORK

var cameraMode = 3;
var cameraTime = 0;

function GLGE_UpdateCamera(){
  switch(cameraMode){
		case 0:
			GLGE_camera.setRotOrder(1);
			
			GLGE_camera.setFovY(70);
			GLGE_camera.setLocX(parseEaseIn(GLGE_camera.getLocX(), (0 + 250) /25, 25));
			GLGE_camera.setLocY(parseEaseIn(GLGE_camera.getLocY(), (0 - 0/1.5)/ 25, 25));
			GLGE_camera.setLocZ(parseEaseIn(GLGE_camera.getLocZ(), 17, 25));
			
			GLGE_camera.setRotX(parseEaseIn(GLGE_camera.getRotX(), 0, 25));
			GLGE_camera.setRotY(parseEaseIn(GLGE_camera.getRotY(), 60 * Math.PI / 180, 25));
			GLGE_camera.setRotZ(parseEaseIn(GLGE_camera.getRotZ(), 90 * Math.PI / 180, 25));
		break;
		case 3:
			cameraTime+=0.2;
			if(cameraTime>360)
			cameraTime = 0;
			
      GLGE_camera.setRotOrder(2);
			GLGE_camera.setFovY(70);
      
			GLGE_camera.setLocX(parseEaseIn(GLGE_camera.getLocX(), -Math.cos(cameraTime*0.1) * 30, 25));
			GLGE_camera.setLocY(parseEaseIn(GLGE_camera.getLocY(), 10, 25));
			GLGE_camera.setLocZ(parseEaseIn(GLGE_camera.getLocZ(), Math.sin(cameraTime*0.1) * 30, 25));
			
			GLGE_camera.setRotX(parseEaseIn(GLGE_camera.getRotX(), -40 * Math.PI / 180, 25));
			GLGE_camera.setRotY(parseEaseIn(GLGE_camera.getRotY(), -cameraTime  * Math.PI / 180, 25));
			GLGE_camera.setRotZ(parseEaseIn(GLGE_camera.getRotZ(), 0 * Math.PI / 180, 25));
		break;
	}
}


////////////////////////////////////////////////////////////////////////////// HELPER FUNCTIONS

function EaseIn(property, result, time){
	property += (result - property)/time;
	return property;
}

function reParse(property){
	property = parseFloat(property);
	return property;
}

function parseEaseIn(property, result, time){
	preProperty = parseFloat(property);
	preProperty += (result - preProperty)/time;
	return preProperty;
}