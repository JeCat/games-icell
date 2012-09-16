yc.ui.editer.WorldEditerLayer = cc.Layer.extend({

	
	
	ctor: function(){
		this._super() ;
        this.setTouchEnabled(true);
        
        
		this.worldMinX = null ;
		this.worldMaxX = null ;
		this.worldMinY = null ;
		this.worldMaxY = null ;
		
		this.touchCallback = null ;
		
	}
	
	, onTouchesBegan: function(touches, event){}
	, onTouchesMoved: function(touches, event) {

		wx = touches[0]._point.x ;
		wy = touches[0]._point.y ;

	}
	, onTouchesEnded:function (touches, event) {
		if( !this.touchCallback )
		{
			return ;
		}
		return this.touchCallback(touches,event) ;
	}
	
	
}) ;


wx = 0 ;
wy = 0 ;