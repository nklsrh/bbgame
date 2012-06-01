function Tile() {

	this.Setup = function(ParentEnvironment, index){
	}
	
	this.RandomizeType = function(){
	}

	this.Update = function(){
	}
	
	this.Timer = function(){
	}

	this.TimerBlink = function(){
	}
	
	this.ImpactPlayer = function(){
	}
	
	this.ImpactBots = function(){
	}
	
	this.ImpactBall = function(){
	}
	
	this.KillPlayer = function(){
	}
	
	this.Draw = function(ctx){
	}

	this.DrawTimer = function(ctx){
	}
	
	this.ApplyColour = function(ctx){
		//ctx.globalAlpha = this.Alpha;
	}
	
	// SWEET LITTLE FUNCTIONS	//	
	this.SetAsCurrentTile = function(){
		this.HasPlayer = true;
	}
	this.RemoveAsCurrentTile = function(){
		this.HasPlayer = false;
	}
	
	//equivalent functions for bots
	this.SetAsCurrentBotTile = function(i){
		this.HasBot[i - 1] = true;
	}
	
	this.RemoveAsCurrentBotTile = function(i){
		this.HasBot[i - 1] = false;
	}
	
	//equivalent functions for the ball
	this.SetAsCurrentBallTile = function(i){
		this.HasBall = true;
	}
	
	this.RemoveAsCurrentBallTile = function(i){
		this.HasBall = false;
	}
}
