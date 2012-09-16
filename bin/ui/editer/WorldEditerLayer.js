yc.ui.editer.WorldEditerLayer = cc.Layer.extend({

	
	
	ctor: function(){
		this._super() ;
        this.setTouchEnabled(true);
        
        
		this.worldMinX = null ;
		this.worldMaxX = null ;
		this.worldMinY = null ;
		this.worldMaxY = null ;
		
		this.touchCallback = null ;

		this.touchingX = null ;
		this.touchingY = null ;
		
		log('create WorldEditerLayer') ;
	}
	
	, onTouchesBegan: function(touches, event){}
	, onTouchesMoved: function(touches, event) {
		this.touchingX= touches[0]._point.x ;
		this.touchingY = touches[0]._point.y ;
		ins(yc.util.DbgPannel).output['touch'] = this.touchingX.toFixed(1)+', '+this.touchingY.toFixed(1) ;

	}
	, onTouchesEnded:function (touches, event) {
		if( !this.touchCallback )
		{
			return ;
		}
		return this.touchCallback(touches,event) ;
	}
	
	, draw: function(ctx){
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
	
}) ;


// wx = 0 ;
// wy = 0 ;