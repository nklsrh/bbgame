function Glados() {
	this.players = new Array();
  this.playerCount = NUMBER_OF_TEAMS;
  
	this.Setup = function(){
    for(x = 0; x < this.playerCount; x++){      
      this.players[x] = new Player();
      this.players[x].Setup(x);
      if(x > 0){
        this.players[x].isAI = true;
      }
    }  
	}

	this.Update = function(){   
    for(x = 0; x < this.playerCount; x++){
      this.players[x].Update();
    }  
	}

	this.Draw = function(){		
    //CTX.fillStyle = COLOUR_DARK_ORANGE;
    for(x = 0; x < this.playerCount; x++){
      this.players[x].Draw();
    }  
	}
}
