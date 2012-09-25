yc.outer.Camera = function()
{
	var canvas = $('#gameCanvas')[0] ;
	this.width = canvas.width ;
	this.height = canvas.height ;
	
	this.focusX = 0 ;
	this.focusY = 0 ;
	this.x = 0 ;
	this.y = 0 ;
	
	// 偏移
	this.offsetX = Math.ceil(this.width/2) ;
	this.offsetY = Math.ceil(this.height/2) ;
	
//	// 偏移
//	this.offsetX = 0 ;
//	this.offsetY = 0 ;
	
//	// 左下角对齐
//	this.x = -this.focusX ;
//	this.y = -this.focusY ;
//	
//	
//	this.move = function(x,y)
//	{
//		// 检查世界边界
//		var pos = cc.Director.getInstance()._runningScene.testWorldBoard(x,y) ;
//		this.offsetX = pos[0]-x ;
//		this.offsetY = pos[1]-y ;
//
//		var rgt = x + this.width ;
//		var top = y + this.height ;
//		pos = cc.Director.getInstance()._runningScene.testWorldBoard(rgt,top) ;
//		if(pos[0]!=rgt)
//		{
//			 this.offsetX = pos[0]-rgt ;
//		}
//		if(pos[1]!=top)
//		{
//			 this.offsetY = pos[1]-top ;
//		}
//		
//		// 
//		this.x = x + this.offsetX ;
//		this.y = y + this.offsetY ;
//	}
	
	this.moveByFocus = function(x,y)
	{
		this.x = this.focusX = x ;
		this.y = this.focusY = y ;

		ins(yc.util.DbgPannel).output['camera'] = this.x.toFixed(1)+', '+this.y.toFixed(1) ;
	}
	
//	this.setFocus = function(offsetX,offsetY)
//	{
//		var moveX = offsetX - this.focusX ;
//		var moveY = offsetY - this.focusY ;
//		
//		this.focusX = offsetX ;
//		this.focusY = offsetY ;
//		
//		this.x-= moveX ;
//		this.y-= moveY ;
//	}

	this.focus = function(){
		return [this.focusX,this.focusY] ;
	}
	
//	this.offsetFocus = function(){
//		return [this.focusX-this.offsetX,this.focusY-this.offsetY] ;
//	}
}

yc.outer.Camera.transformPosition = function(entity){
	var camera = ins(yc.outer.Camera) ;
	return {
		x:0|(entity.x-camera.focusX)
		, y: (0 |(entity.y-camera.focusY))
	} ;
}

yc.outer.Camera.transformSprite = function(context){

	var transform = yc.outer.Camera.transformPosition(this) ;

	//context.save() ;
	this.transformX = transform.x ;
	this.transformY = -transform.y ;
	context.translate( this.transformX, this.transformY );
	//context.restore() ;
}
