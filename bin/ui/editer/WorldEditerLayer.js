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
	, onTouchesMoved: function(touches, event){}
	, onTouchesEnded:function (touches, event) {
		if( !this.touchCallback )
		{
			return ;
		}

		var camera = ins(yc.outer.Camera) ;
		for ( var t = 0; t < touches.length; t++) {
			touches[t]._point.wx = camera.x+touches[t]._point.x ;
			touches[t]._point.wy = camera.y+touches[t]._point.y ;
		}
		
		this.touchCallback(touches,event) ;
	}
	
	
}) ;