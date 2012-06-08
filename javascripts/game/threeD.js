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
  
  this.focusPoint = new THREE.Vector3(0,0,0);
  
  this.Setup = function(){
    this.canvas = document.getElementById('gameCanvas');
    this.scene = new THREE.Scene();

    this.AddCamera(this.fov, this.aspect, this.near, this.far);
    this.SetCameraPosition(10,10,10);
    this.SetCameraLookAt(0,0,0);
    // Grid
    //this.AddLinesOnGround();

    this.SetAmbientLight(0x222222);

    this.SetPointLight(0xFFFFFF, 100, 190, 70, 0.2);
    this.SetSpotLight(0xFFFFFF, 100, 40, 70, 0.5);
    this.SetSpotLight(0xFFFFFF, -100, 40, 70, 0.5);
    this.SetSpotLight(0xFFFFFF, 100, 40, -70, 0.5);
    this.SetSpotLight(0xFFFFFF, -100, 40, -70, 0.5);
    //this.SetSpotLight(0xFFFFFF, 0, 10, -60, 0.6);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

    this.canvas.appendChild(this.renderer.domElement);
    if(DEVICE == "PC"){
      this.renderer.shadowMapEnabled = true;
    }  
    //this.loader.load("./assets/objects/env/arena/arena.dae", game.three.ArenaModel);
    game.three.TileCubes();
  }
    
  this.loader = new THREE.ColladaLoader();
  
  this.arenaModel;  
  this.ArenaModel = function(collada){
    this.arenaModel = new THREE.Object3D();
    this.arenaModel = collada.scene;  
    this.arenaModel.rotation.x = -90 * Math.PI/180;
    this.arenaModel.updateMatrix();
    this.arenaModel.name = "arena";
    game.three.scene.add(this.arenaModel);         
    ARENA_LOADED = true;
    game.three.TileCubes();
    //this.loader = new THREE.ColladaLoader();
    //this.loader.load("./assets/objects/env/tiles/tile.dae", game.three.TileModel);    
  }
  
  this.TileCubes = function(){
    this.tilesModel = [];
    this.tileMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    for(i = 0; i < NUMBER_OF_TILES; i++){
      this.tilesModel[i] = new THREE.Mesh(new THREE.CubeGeometry(1.95, 1.95, 1.95), this.tileMat);
      this.tilesModel[i].name = "tile" + i;
      if(DEVICE == "PC"){
        this.tilesModel[i].receiveShadow = true;
      }      
      game.three.scene.add(this.tilesModel[i]);
    }
    TILES_LOADED = true;
    game.three.PlayerSpheres();
  }
  
  this.tilesModel = [];
  this.TileModel = function(collada){
    this.tilesModel = [];
    this.tilesModel[0] = new THREE.Object3D();
    this.tilesModel[0] = collada.scene;  
    this.tilesModel[0].rotation.x = -90 * Math.PI/180;
    this.tilesModel[0].name = "tile" + 0;
    game.three.scene.add(this.tilesModel[0]);
    for(i = 1; i < NUMBER_OF_TILES; i++){
      this.tilesModel[i] = THREE.SceneUtils.cloneObject(this.tilesModel[i-1]);
      this.tilesModel[i].name = "tile" + i;      
      game.three.scene.add(this.tilesModel[i]);
    }
    TILES_LOADED = true;
    //this.loader = new THREE.ColladaLoader();
    //this.loader.load("./assets/objects/chars/player/player.dae", game.three.PlayerModel);
  }
  
  this.PlayerSpheres = function(){
    this.playersModel = [];
    this.playersMat = new THREE.MeshLambertMaterial({color:0xFFFFFF});
    //this.playersMat = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture( './assets/objects/chars/player/player/player_texture.png')});
    for(i = 0; i < NUMBER_OF_TEAMS; i++){
      this.playersModel[i] = new THREE.Mesh(new THREE.SphereGeometry(PLAYER_SIZE/2, 8, 8), this.playersMat);
      this.playersModel[i].name = "players" + i;
      if(DEVICE == "PC"){
        this.playersModel[i].castShadow = true;
      }   
      game.three.scene.add(this.playersModel[i]);
    }
    PLAYERS_LOADED = true;
  }
  
  this.playersModel = [];
  this.PlayerModel = function(collada){
    this.playersModel = [];
    this.playersModel[0] = new THREE.Object3D();
    this.playersModel[0] = collada.scene;  
    this.playersModel[0].rotation.x = -90 * Math.PI/180;
    this.playersModel[0].name = "player" + 0;
    game.three.scene.add(this.playersModel[0]);
    for(i = 1; i < NUMBER_OF_TEAMS; i++){
      this.playersModel[i] = THREE.SceneUtils.cloneObject(this.playersModel[i-1]);
      this.playersModel[i].name = "player" + i;
      game.three.scene.add(this.playersModel[i]);
    }
    PLAYERS_LOADED = true;
  }
  
  this.Draw = function(){
    this.time++;
    this.SetCameraAngle(this.cameraAngle);
    this.camera.lookAt(this.focusPoint);
    this.canvas.width = this.canvas.width;
    this.renderer.render(this.scene, this.camera);
  }
  
  this.cameraAngle = 1;
  this.SetCameraAngle = function(angle){
    switch(angle){
      case 0:
        this.SetCameraPosition(this.focusPoint.x, this.focusPoint.y + 12, this.focusPoint.z + 6);
      break;
      case 1:
        this.SetCameraPosition(Math.sin(this.time * 0.01) * 20, 20 + 20 * Math.sin(this.time * 0.005), -Math.cos(this.time * 0.01) * 20);
      break;
    }
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
  this.SetSpotLight = function(hexColour, x, y, z, intensity){
    this.spotLight = new THREE.SpotLight(hexColour);
    this.spotLight.position.set(x, y, z);
    this.spotLight.intensity = intensity;
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  }  
}