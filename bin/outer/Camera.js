yc.outer.Camera = function()
{
	var camera = this ;

	this.x = 0 ;
	this.y = 0 ;

	this.bBoundaryOverflow = false ;

	this.update = function(){
		var wsize = cc.Director.getInstance().getWinSize() ;

		// 触发事件
		yc.event.trigger(this,"resize",[wsize.width,wsize.height]) ;
	}

	this.update() ;
	
	this.moveByFocus = function(x,y)
	{

		var scene = cc.Director.getInstance().getRunningScene() ;
		if( typeof scene.layerGame!="undefined" )
		{
			var wsize = cc.Director.getInstance().getWinSize() ;
			wsize.hw = (wsize.width/2)/scene.layerGame.getScale() ;
			wsize.hh = (wsize.height/2)/scene.layerGame.getScale() ;

			// 不超出世界边界
			if( !this.bBoundaryOverflow )
			{
				// 高度
				if(scene.top!==null)
				{
					if( y+wsize.hh > scene.top )
					{
						y = scene.top - wsize.hh ;
					}
				}
				if(scene.btm!==null)
				{
					if( y-wsize.hh < scene.btm )
					{
						y = scene.btm + wsize.hh ;
					}
				}

				// 宽度
				if(scene.rgt!==null)
				{
					if( x+wsize.hw > scene.rgt )
					{
						x = scene.rgt - wsize.hw ;
					}
				}
				if(scene.lft!==null)
				{
					if( x-wsize.hw < scene.lft )
					{
						x = scene.lft + wsize.hw ;
					}
				}
			}

			// camera's position
			this.x = x ; 
			this.y = y ;

			// 设置层偏移
			var layers = scene.layerGame.getChildren() ;
			for(var i=0; i<layers.length; i++)
			{
				// layers[i].setPosition(cc.p(x,y)) ;

				if( 'parallax' in layers[i] )
				{
					layers[i].setPosition( cc.p( -x*layers[i].parallax, -y*layers[i].parallax ) ) ;
				}
				else
				{
					layers[i].setPosition(cc.p(-x,-y)) ;
				}
			}

		}

		return ;
	}

	this.focus = function(){
		return [this.focusX,this.focusY] ;
	}

	// --------------------------
	// for zooming
	
	

	this.maxZoom = yc.settings.camera.defautlMaxZoom ;
	this.minZoom = yc.settings.camera.defautlMinZoom ;
	

	if( g_architecture=='html5' )
	{
		onScrollFunc = function(e){

			var scene = cc.Director.getInstance().getRunningScene() ;
			if( !scene || !('layerGame' in scene) )
			{
				// log(scene.constructor.className) ;
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
			
			
			if( typeof(yc.GameScene.camera)=="object" && yc.GameScene.camera.maxZoom !=undefined && yc.GameScene.camera.minZoom != undefined ){
				camera = yc.GameScene.camera;
			}
			
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
}

yc.outer.Camera.transformPosition = function(entity){
	var camera = ins(yc.outer.Camera) ;
	var parallax = entity.parallax || 1 ; // 视差
	return {
		x: 0|((entity.x-camera.focusX)*parallax)
		, y: 0 |((entity.y-camera.focusY)*parallax)
	} ;
}

// yc.outer.Camera.transformSprite = function(ctx){

// 	this._super(ctx) ;
// 	return ;

// 	var transform = yc.outer.Camera.transformPosition(this) ;

// 	this.transformX = transform.x ;
// 	this.transformY = -transform.y ;
// 	ctx.translate( this.transformX, this.transformY );

// 	// 透明度
// 	ctx.globalAlpha = ctx.globalAlpha * (this.getOpacity()/255) ;

// 	// 角度
// 	if (this.getRotation() != 0)
// 	{
// 		ctx.rotate(this._rotationRadians) ;
// 	}

// 	// 缩放
// 	ctx.scale(this.getScaleX(),this.getScaleY()) ;
// }

yc.outer.Camera.prototype.__defineGetter__("width",function(){
	cc.Director.getInstance().getWinSize().width ;
	here() ;
}) ;
yc.outer.Camera.prototype.__defineGetter__("height",function(){
	cc.Director.getInstance().getWinSize().height ;
	here() ;
}) ;


yc.outer.Camera.singleton = true ;

