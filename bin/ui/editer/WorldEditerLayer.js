yc.ui.editer.WorldEditerLayer = cc.Layer.extend({

	
	
	ctor: function(){
		this._super() ;
		this.setTouchEnabled(true);
		
		
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
		
		log('create WorldEditerLayer') ;
	}

	, _screenToWorld: function(touches) {

		for(var i=0;i<touches.length;i++)
		{
			var p = yc.util.windowToClient(ins(yc.GameLayer),touches[i]._point.x,touches[i]._point.y) ;
			touches[i]._point.wx = p[0] ;
			touches[i]._point.wy = p[1] ;
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

			var x = cam.x - (touches[0]._point.x-this._ptDragging.x)*this._dragingScale ;
			var y = cam.y - (touches[0]._point.y-this._ptDragging.y)*this._dragingScale ;


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



		yc.util.text(ctx, "x:"+cam.x+", y:"+cam.y ,-30,25, "rgb(191,219,129)") ;

		if(this.touchCallback)
		{
			var wsize = cc.Director.getInstance().getWinSize() ;
			ctx.translate( this.touchingX-wsize.width/2, wsize.height-this.touchingY-wsize.height/2 ) ;

			yc.util.drawLine([-10,0],[-1,0],ctx,'white') ;
			yc.util.drawLine([10,0],[1,0],ctx,'white') ;
			yc.util.drawLine([0,10],[0,1],ctx,'white') ;
			yc.util.drawLine([0,-10],[0,-1],ctx,'white') ;
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

}) ;


// wx = 0 ;
// wy = 0 ;