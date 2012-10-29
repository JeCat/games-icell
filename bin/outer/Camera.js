yc.outer.Camera = function()
{
	var canvas = $('#gameCanvas')[0] ;
	var camera = this ;

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
		var halfGameSceneWidth = ( scene.rgt - scene.lft ) / 2 ;
		if( halfWidth > halfGameSceneWidth ){
			x = ( leftBorder + rightBorder ) / 2 ;
		}else if (x - halfWidth < leftBorder ){
			x = leftBorder + halfWidth ;
		}else if( x + halfWidth > rightBorder ){
			x = rightBorder - halfWidth ;
		}
		
		var halfHeight = this.height/ 2 /scale ;
		var topBorder = scene.top + 10;
		var bottomBorder = scene.btm - 10;
		var halfGameSceneHeight = ( scene.top - scene.btm ) / 2 ;
		if( halfHeight > halfGameSceneHeight ){
			y = ( topBorder + bottomBorder ) / 2 ;
		}else if( y + halfHeight > topBorder ){
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

	// --------------------------
	// for zooming
	this.maxZoom = yc.settings.camera.defautlMaxZoom ;
	this.minZoom = yc.settings.camera.defautlMinZoom ;

	onScrollFunc = function(e){

		var scene = cc.Director.getInstance().getRunningScene() ;
		if( !('layerGame' in scene) )
		{
			log(scene.constructor.className) ;
			return ;
		}
		var layer = scene.layerGame ;


		e=e || window.event; 
		 
		if(e.wheelDelta){//IE/Opera/Chrome 
			var value=e.wheelDelta; 
		}else if(e.detail){//Firefox 
			var value=e.detail; 
		}
		
		if(layer.actScale)
		{
			layer.stopAction(layer.actScale)
		}
		var scale = 1+value/120*0.3 ;
		if(navigator.platform.indexOf('Mac') !== -1)
			scale = 1-value/120*0.3 ;

		// 一次缩放的速度，不超过3倍
		if(scale<0.33)
		{
			scale = 0.33 ;
		}
		else if(scale>3)
		{
			scale = 3 ;
		}

		var oriScale = layer.getScale() ;
		var newScale = scale * oriScale ;
		if( newScale<camera.minZoom )
		{
			scale = camera.minZoom/oriScale ;
		}
		else if( newScale>camera.maxZoom )
		{
			scale = camera.maxZoom/oriScale ;
		}

		layer.actScale = cc.ScaleBy.create(0.3,scale) ;
		layer.runAction(layer.actScale) ;
	}

	/*注册事件*/ 
	if( document && document.addEventListener )
	{ 
		document.addEventListener('DOMMouseScroll',onScrollFunc,false); 
	}//W3C 
	window.onmousewheel=document.onmousewheel = onScrollFunc;//IE/Opera/Chrome 
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

yc.outer.Camera.worldPos2ScreenPos = function( p ){
	var camera = ins(yc.outer.Camera) ;
	var scale = ins(yc.GameLayer).getScale() ;
	return {
		x: camera.offsetX - (camera.x - p.x) * scale ,
		y: camera.offsetY - (camera.y - p.y) * scale 
	};
}
yc.outer.Camera.screenPos2WorldPos = function(p){
	var camera = ins(yc.outer.Camera) ;
	var scale = ins(yc.GameLayer).getScale() ;
	return {
		x: camera.x + (p.x - camera.offsetX) / scale ,
		y: camera.y + (p.y - camera.offsetY) / scale 
	};
}

yc.outer.Camera.singleton = true ;

