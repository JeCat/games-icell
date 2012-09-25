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

		this._ptDragging = null ;
		this._dragingScale = 1 ;
		
		log('create WorldEditerLayer') ;
	}
	
	, onTouchesBegan: function(touches, event){
		if(!this.touchCallback)
		{
			this._ptDragging = touches[0]._point ;
		}
	}
	, onTouchesMoved: function(touches, event) {
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
			return this.touchCallback(touches,event) ;
		}
		else
		{
			this._ptDragging = null ;
		}
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