yc.outer.Camera = function(canvas)
{
	this.width = canvas.width ;
	this.height = canvas.height ;
	
	this.focusOffsetX = Math.ceil(this.width/2) ;
	this.focusOffsetY = Math.ceil(this.height/2) ;
	
	this.x = -this.focusOffsetX ;
	this.y = -this.focusOffsetY ;
	
	this.move = function(x,y)
	{
		this.x = x ;
		this.y = y ;
	}
	
	this.moveByFocus = function(x,y)
	{
		this.x = x - this.focusOffsetX ;
		this.y = y - this.focusOffsetY ;
	}
	
	this.setFocus = function(offsetX,offsetY)
	{
	    var moveX = offsetX - this.focusOffsetX ;
	    var moveY = offsetY - this.focusOffsetY ;
	    
	    this.focusOffsetX = offsetX ;
	    this.focusOffsetY = offsetY ;
	    
	    this.x-= moveX ;
	    this.y-= moveY ;
	}
	
	this.focusOffset = function(){
	    return [this.focusOffsetX,this.focusOffsetY] ;
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


yc.outer.Camera.transformSprite = function(context){
    var camera = yc.outer.Camera.ins() ;
    //context.save() ;
    this.transformX = 0|(this.x-camera.x) ;
    this.transformY = -(0 |(this.y-camera.y)) ;
    context.translate( this.transformX, this.transformY );
    //context.restore() ;
}
