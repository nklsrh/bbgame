function Assets(){
  
  this.hydrogen = new Image();
  this.tile_white = new Image();
  
  this.Setup = function(){
    this.hydrogen.src = "./assets/objects/chars/player/player/hydrogen.png";
    this.tile_white.src = "./assets/objects/env/tiles/tile_white_128.png";
  }
}