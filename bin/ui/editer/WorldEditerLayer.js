yc.ui.editer.WorldEditerLayer = cc.Layer.extend({

	
	
	ctor: function(editor){
		this._super() ;

		this.worldMinX = null ;
		this.worldMaxX = null ;
		this.worldMinY = null ;
		this.worldMaxY = null ;

		this.touchCallback = null ;
		this.touchBeginCallback = null ;
		this.touchMovedCallback = null ;

		this.touchingX = null ;
		this.touchingY = null ;

		this._ptDragging = null ;
		this._dragingScale = 1 ;

		this.editor = editor ;


		// 点击事件
		this.setTouchEnabled(true);
	}

	, onEnter: function(){

		this._super() ;

        // resize
		var ws = cc.Director.getInstance().getWinSize() ;
		this.onResize(ws.width,ws.height) ;

		yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;
	}
	, onExit: function(){
		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;
	}

	, _screenToWorld: function(touches) {

		var cam = ins(yc.outer.Camera) ; 

		for(var i=0;i<touches.length;i++)
		{
			var p = yc.util.windowToClient(ins(yc.GameLayer),touches[i]._point.x,touches[i]._point.y) ;
			touches[i]._point.wx = cam.x + p[0] ;
			touches[i]._point.wy = cam.y + p[1] ;
		}
	}

	, onTouchesBegan: function(touches, event){
		if( this.touchBeginCallback )
		{
			this._screenToWorld(touches) ;

			return this.touchBeginCallback(touches,event) ;
		}
		if(!this.touchCallback)
		{
			this._ptDragging = touches[0]._point ;
		}
	}
	, onTouchesMoved: function(touches, event) {
 
		if( this.touchMovedCallback || this._ptDragging )
		{
			this._screenToWorld(touches) ;
		}
			
		if( this.touchMovedCallback )
		{
			return this.touchMovedCallback(touches,event) ;
		}

		this.touchingX= touches[0]._point.x ;
		this.touchingY = touches[0]._point.y ;
		ins(yc.util.DbgPannel).output['touch'] = this.touchingX.toFixed(1)+', '+this.touchingY.toFixed(1) ;

		if(this._ptDragging)
		{
			var cam = ins(yc.outer.Camera) ;

			var x = cam.x - (touches[0]._point.x-this._ptDragging.x)*this._dragingScale / ins(yc.GameLayer).getScale() ;
			var y = cam.y - (touches[0]._point.y-this._ptDragging.y)*this._dragingScale / ins(yc.GameLayer).getScale() ;

			// log([this._ptDragging.x,this._ptDragging.y,' > ',touches[0]._point.x,touches[0]._point.y, '; scale:', this._dragingScale, '; from' ,cam.x,cam.y, ' > move to ', x,y])

			cam.moveByFocus(x,y) ;

			this._ptDragging = touches[0]._point ;
		}
	}

	, onTouchesEnded:function (touches, event) {
		if( this.touchCallback )
		{
			this._screenToWorld(touches) ;

			return this.touchCallback(touches,event) ;
		}
		else
		{
			this._ptDragging = null ;
		}
	}
	
	, draw: function(ctx){

		var c = "rgb(122,200,214)" ;
		var cam = ins(yc.outer.Camera) ;

		yc.util.drawCircle(ctx,0,0,3,3,c,null) ;
		yc.util.drawLine([-10,0],[-1,0],ctx,c) ;
		yc.util.drawLine([10,0],[1,0],ctx,c) ;
		yc.util.drawLine([0,10],[0,1],ctx,c) ;
		yc.util.drawLine([0,-10],[0,-1],ctx,c) ;

		c = "rgba(122,200,214,0.3)" ;
		yc.util.drawLine([-cam.offsetX,0],[cam.offsetX,0],ctx,c) ;
		yc.util.drawLine([0,-cam.offsetY],[0,cam.offsetY],ctx,c) ;

		yc.util.text(ctx, "x:"+cam.x.toFixed(1)+", y:"+cam.y.toFixed(1) ,-30,25, "rgb(191,219,129)") ;


		// 光标
		if(this.touchCallback)
		{
			ctx.save() ;

			var wsize = cc.Director.getInstance().getWinSize() ;
			ctx.translate( this.touchingX-wsize.width/2, wsize.height-this.touchingY-wsize.height/2 ) ;

			yc.util.drawLine([-10,0],[-1,0],ctx,'white') ;
			yc.util.drawLine([10,0],[1,0],ctx,'white') ;
			yc.util.drawLine([0,10],[0,1],ctx,'white') ;
			yc.util.drawLine([0,-10],[0,-1],ctx,'white') ;

			ctx.restore() ;
		}

		// 画选中的污渍 ---------
		if( yc.settings.outer.stain.dbg && this.editor.stain.selectedStain )
		{
			ctx.save() ;

			// 转换到屏幕左下角
			var wsize = cc.Director.getInstance().getWinSize() ;
			ctx.translate( -wsize.width/2, wsize.height/2 ) ;

			// 转换到 game layer 坐标系
			cc.Director.getInstance().getRunningScene().layerGame.transform(ctx) ;

			// 转换到 stain 的坐标系
			this.editor.stain.selectedStain.transform(ctx) ;

			// 开始绘制污渍的形状
			var shapes = this.editor.stain.selectedStain._script.shapes ;
			for(var i=0;i<shapes.length;i++)
			{
				// 多边形
				if( shapes[i].type=='polygon' )
				{
					var fillStyle = this.editor.stain.selectedStainShape===shapes[i]? "rgba(255,0,0,0.2)": null ;
					yc.util.drawPolygon(shapes[i].points,ctx,"red",fillStyle,true) ;
				}
				// 圆
				else if(shapes[i].type=='circle')
				{
					// todo ...
				}

			}

			ctx.restore() ;
		}
	}
	



	// 让用户在场景中划出一个区域，返回区域的起始点
	, lineOutRect: function(callback){

		// 按下点
		var pressPt = null ;
		editer.layer.touchBeginCallback = function(touches,event){
			editer.layer.touchBeginCallback = null ;
			pressPt = touches[0]._point ;
			return false ;
		}

		// 释放点
		editer.layer.touchCallback = function(touches,event){
			editer.layer.touchCallback = null ;

			if(!pressPt)
			{
				return false ;
			}

			return callback(pressPt,touches[0]._point) ;
		}
	}

	, onResize: function (w,h){
		this.setPosition( cc.p( w/2, h/2 ) ) ;
	}

}) ;


// wx = 0 ;
// wy = 0 ;