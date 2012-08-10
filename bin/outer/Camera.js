yc.outer.Camera = function(canvas)
{
	this.width = canvas.width ;
	this.height = canvas.height ;
	
	this.focusPosX = Math.ceil(this.width/2) ;
	this.focusPosY = Math.ceil(this.height/2) ;
	
	this.x = -this.focusPosX ;
	this.y = -this.focusPosY ;
	
	this.move = function(x,y)
	{
		this.x = x ;
		this.y = y ;
	}
	
	this.moveByFocus = function(x,y)
	{
		this.x = x - this.focusPosX ;
		this.y = y - this.focusPosY ;
	}
	
	this.transformSprite = function(context,sprite){
		//context.save() ;
		context.translate( 0|(sprite.x-this.x), -(0 |(sprite.y-this.y)) );
		//context.restore() ;
	}
}

yc.outer.Camera._ins = null ;
yc.outer.Camera.ins = function(){
	if(!yc.outer.Camera._ins)
	{
		yc.outer.Camera._ins = new yc.outer.Camera($('#gameCanvas')[0]) ;
	}
	return yc.outer.Camera._ins ;
}


