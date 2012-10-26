yc.outer.Camera = function()
{
	var canvas = $('#gameCanvas')[0] ;

	this.focusX = 0 ;
	this.focusY = 0 ;
	this.x = 0 ;
	this.y = 0 ;

	this.update = function(){
		this.width = canvas.width ;
		this.height = canvas.height ;
		
		// 偏移
		this.offsetX = Math.ceil(this.width/2) ;
		this.offsetY = Math.ceil(this.height/2) ;

		// 触发事件
		yc.event.trigger(this,"resize",[this.width,this.height]) ;
	}

	this.update() ;
	
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
		var scale = ins(yc.GameLayer).getScale() ;
		
		var halfWidth = this.width / 2 / scale;
		var rightBorder = scene.rgt +10;
		var leftBorder = scene.lft -10;
		if (x - halfWidth < leftBorder ){
			x = leftBorder + halfWidth ;
		}else if( x + halfWidth > rightBorder ){
			x = rightBorder - halfWidth ;
		}
		
		var halfHeight = this.height/ 2 /scale ;
		var topBorder = scene.top + 10;
		var bottomBorder = scene.btm - 10;
		if( y + halfHeight > topBorder ){
			y = topBorder - halfHeight ;
		}else if( y - halfHeight < bottomBorder ){
			y = bottomBorder + halfHeight ;
		}
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
	var parallax = entity.parallax || 1 ; // 视差
	return {
		x: 0|((entity.x-camera.focusX)*parallax)
		, y: 0 |((entity.y-camera.focusY)*parallax)
	} ;
}

yc.outer.Camera.transformSprite = function(context){

	var transform = yc.outer.Camera.transformPosition(this) ;

	this.transformX = transform.x ;
	this.transformY = -transform.y ;
	context.translate( this.transformX, this.transformY );

	if (this._rotation != 0)
	    context.rotate(this._rotationRadians);

	if ((this._scaleX != 1) || (this._scaleY != 1))
	    context.scale(this._scaleX, this._scaleY);
}

yc.outer.Camera.worldPosX2ScreenPosX = function(x){
	var camera = ins(yc.outer.Camera) ;
	return camera.offsetX - (camera.x - x) ;
}
yc.outer.Camera.worldPosY2ScreenPosY = function(y){
	var camera = ins(yc.outer.Camera) ;
	return camera.offsetY - (camera.y - y) ;
}

yc.outer.Camera.screenPosX2WorldPosX = function(x){
	var camera = ins(yc.outer.Camera) ;
	return camera.x + (x - camera.offsetX) ;
}
yc.outer.Camera.screenPosY2WorldPosY = function(y){
	var camera = ins(yc.outer.Camera) ;
	return camera.y + (y - camera.offsetY) ;
}

yc.outer.Camera.singleton = true ;

