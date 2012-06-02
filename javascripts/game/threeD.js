// THREE DEE

  var THREE_canvas;
  var THREE_camera;
  var THREE_scene = new THREE.Scene();
  var THREE_renderer = new THREE.WebGLRenderer();
  var THREE_pointLight;
  var THREE_ambientLight;
  var THREE_colladaLoader = new THREE.ColladaLoader();
  
  var THREE_fov = 45;
  var THREE_aspect = 1024/600;
  var THREE_near = 1;
  var THREE_far = 2000;
  
  var THREE_time = 0;
  
  var THREE_HasLoaded = false;
  
  var THREE_Arena = new THREE.Object3D();  
  THREE_colladaLoader.load( './glge/arena.dae', function colladaReady( collada ) {
    THREE_Arena = collada.scene;
    THREE_Arena.dynamic = true;
    THREE_Arena.scale.x = THREE_Arena.scale.y = THREE_Arena.scale.z = 1;
    THREE_Arena.updateMatrix();
  } );
  
  function THREE_Setup(){
    THREE_canvas = document.getElementById('canvas3D');    

    THREE_AddCamera(THREE_fov, THREE_aspect, THREE_near, THREE_far);
    THREE_SetCameraPosition(10,10,10);
    THREE_SetCameraLookAt(0,0,0);
    // Grid
    THREE_AddLinesOnGround();

    THREE_SetAmbientLight(0xC7C5C3);

    THREE_SetPointLight(0xC7C5C3, 1000, 10000, 700, 3);
    
    THREE_renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

    THREE_canvas.appendChild(THREE_renderer.domElement);    
    
    THREE_scene.add(THREE_Arena);
    THREE_HasLoaded = true;
  }
  
  function THREE_Update(){
  }
  
  function THREE_Draw(){
    THREE_time++;
    THREE_SetCameraPosition(Math.sin(  THREE_time * 0.01) * 10, Math.sin(  THREE_time * 0.01) * 10, -Math.cos(  THREE_time * 0.01) * 10);
    THREE_SetCameraLookAt(0,0,0);
    THREE_renderer.render(THREE_scene, THREE_camera);
  }

  function THREE_AddCamera(fov, aspect, near, far){
    THREE_camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    THREE_scene.add(THREE_camera);
  }
  
  function THREE_SetCameraPosition(x, y, z){
    THREE_camera.position.set(x,y,z);
  }
  
  function THREE_SetCameraLookAt(x, y, z){  
    THREE_camera.lookAt(new THREE.Vector3(x,y,z));
  }
  
  function THREE_AddLinesOnGround(){
    line_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ),
    geometry = new THREE.Geometry(),
    floor = -0.04, step = 1, size = 14;
    for (   i = 0; i <= size / step * 2; i ++ ) {
    geometry.vertices.push( new THREE.Vector3( - size, floor, i * step - size ) );
    geometry.vertices.push( new THREE.Vector3(   size, floor, i * step - size ) );

    geometry.vertices.push( new THREE.Vector3( i * step - size, floor, -size ) );
    geometry.vertices.push( new THREE.Vector3( i * step - size, floor,  size ) );
    }
    line = new THREE.Line( geometry, line_material, THREE.LinePieces );
    THREE_scene.add( line );
  }
  
  function THREE_SetAmbientLight(hexColour){
    THREE_ambientLight = new THREE.AmbientLight(hexColour);
    THREE_scene.add(  THREE_ambientLight);
  }
  
  function THREE_SetPointLight(hexColour, x, y, z, intensity){
    THREE_pointLight = new THREE.PointLight(hexColour);
    THREE_pointLight.position.x = x;
    THREE_pointLight.position.y = y;
    THREE_pointLight.position.z = z;
    THREE_pointLight.intensity = intensity;
    THREE_scene.add(  THREE_pointLight);
  } 