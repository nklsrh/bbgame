  var colloader = new THREE.ColladaLoader();
  
  var tileModels = new Array(NUMBER_OF_TILES);
  var tileColladaLoaded = false;
  
  for(i = 0; i < NUMBER_OF_TILES; i++){
    colloader.load("./assets/objects/env/tiles/tile.dae", function(collada){
      tileModels[i] = new THREE.Object3D();
      tileModels[i] = collada.scene;
      game.three.scene.add(tileModels[i]); 
    });
    
    if(i == NUMBER_OF_TILES - 1){
      tileColladaLoaded = true;
    }
  } 