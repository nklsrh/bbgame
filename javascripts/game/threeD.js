function ThreeDee(){
  this.canvas;
  this.camera;
  this.scene;
  this.renderer;
  this.pointLight;
  this.ambientLight;
  
  this.fov = 45;
  this.aspect = 1024/600;
  this.near = 1;
  this.far = 2000;
  
  this.time = 0;
  
  this.Setup = function(){
    this.canvas = document.getElementById('gameCanvas');
    this.scene = new THREE.Scene();

    this.AddCamera(this.fov, this.aspect, this.near, this.far);
    this.SetCameraPosition(10,10,10);
    this.SetCameraLookAt(0,0,0);
    // Grid
    this.AddLinesOnGround();

    this.SetAmbientLight(0xC7C5C3);

    this.SetPointLight(0xC7C5C3, 1000, 10000, 700, 3);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(canvasWidth, canvasHeight);

    this.canvas.appendChild(this.renderer.domElement);
  }
    
  this.Draw = function(){
    this.time++;
    this.SetCameraPosition(Math.sin(this.time * 0.01) * 10, Math.sin(this.time * 0.01) * 10, -Math.cos(this.time * 0.01) * 10);
    this.SetCameraLookAt(0,0,0);
    this.renderer.render(this.scene, this.camera);
  }
  
  this.AddCamera = function(fov, aspect, near, far){
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.scene.add(this.camera);
  }
  this.SetCameraPosition = function(x, y, z){
    this.camera.position.set(x,y,z);
  }
  this.SetCameraLookAt = function(x, y, z){  
    this.camera.lookAt(new THREE.Vector3(x,y,z));
  }
  this.AddLinesOnGround = function(){
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
    this.scene.add( line );
  }
  this.SetAmbientLight = function(hexColour){
    this.ambientLight = new THREE.AmbientLight(hexColour);
    this.scene.add(this.ambientLight);
  }
  this.SetPointLight = function(hexColour, x, y, z, intensity){
    this.pointLight = new THREE.PointLight(hexColour);
    this.pointLight.position.x = x;
    this.pointLight.position.y = y;
    this.pointLight.position.z = z;
    this.pointLight.intensity = intensity;
    this.scene.add(this.pointLight);
  }  
}