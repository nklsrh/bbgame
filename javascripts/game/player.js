function Player(){
  this.x = 0;
  this.y = 0;
  this.z = 0;
  
  this.speed = 0;
  
  this.Setup = function(){
	  this.x = 0;
	  this.z = 0;
  }
  this.Update = function(){
    this.x += this.speed;    
    
    if(this.speed < 0.1){
      this.speed += 0.002;
    }
  }
}
