var container, stats;

var camera, scene, renderer, objects;
var particleLight, pointLight;
var env = new Array();
var env_skin = new Array();
var player, player_skin;

var loader = new THREE.ColladaLoader();

loader.options.convertUpAxis = true;
loader.load( './models/env/cityblock.dae', function colladaReady( collada ) {

env[0] = collada.scene;
env_skin[0] = collada.skins[ 0 ];
env[0].dynamic = true;
env[0].position.x = -175;
env[0].scale.x = env[0].scale.y = env[0].scale.z = 1;
env[0].updateMatrix();


} );

loader.load( './models/player/player.dae', function colladasReady( asd ) {

player = asd.scene;
player_skin = asd.skins[ 0 ];
player.dynamic = true;
player.scale.x = player.scale.y = player.scale.z = 1;
player.updateMatrix();

} );

function SetupThree(){
init();
animate();
}

function init() {

container = document.getElementById ('gameCanvas');

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 45, 600/240, 1, 2000 );
camera.position.set( 2, 2, 3 );
scene.add( camera );

// Grid

var line_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ),
	geometry = new THREE.Geometry(),
	floor = -0.04, step = 1, size = 14;

for ( var i = 0; i <= size / step * 2; i ++ ) {

	geometry.vertices.push( new THREE.Vector3( - size, floor, i * step - size ) );
	geometry.vertices.push( new THREE.Vector3(   size, floor, i * step - size ) );

	geometry.vertices.push( new THREE.Vector3( i * step - size, floor, -size ) );
	geometry.vertices.push( new THREE.Vector3( i * step - size, floor,  size ) );

}

var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
scene.add( line );

// Add the COLLADA

scene.add( env[0] );
scene.add( player );

var ambient = new THREE.AmbientLight( 0xC7C5C3);
scene.add( ambient );

var pointLight = new THREE.PointLight ( 0xC7C5C3 );
pointLight.position.x = 1000;
pointLight.position.y = 1000;
pointLight.position.z = 7000;
pointLight.intensity = 2;
scene.add (pointLight);

var pointLight2 = new THREE.PointLight ( 0xC7C5C3 );
pointLight2.position.x = -5000;
pointLight2.position.y = 100000;
pointLight2.position.z = -1100;
scene.add (pointLight2);

particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
scene.add( particleLight );

renderer = new THREE.WebGLRenderer();
renderer.setSize( 600, 240 );

container.appendChild( renderer.domElement );
}

//

var t = 0;
function animate() {

requestAnimationFrame( animate );

render();

}

function render() {

var timer = Date.now() * 0.0005;

camera.position.x = 20;//= Math.cos( timer ) * 50;
camera.position.y = 3;
camera.position.z = 0;

camera.lookAt( new THREE.Vector3( camera.position.x - 100, camera.position.y - 20, camera.position.z ) );

particleLight.position.x = Math.sin( timer * 4 ) * 3009;
particleLight.position.y = Math.cos( timer * 5 ) * 4000;
particleLight.position.z = Math.cos( timer * 4 ) * 3009;

renderer.render( scene, camera );

}
