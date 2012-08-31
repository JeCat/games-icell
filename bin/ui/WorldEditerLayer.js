yc.ui.WorldEditerLayer = cc.Layer.extend({

	
	
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
		this.touchCallback(touches,event) ;
	}
	
	
}) ;