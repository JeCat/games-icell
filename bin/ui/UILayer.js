yc.ui.UILayer = cc.Layer.extend({
    
    ctor: function(){
    	this._super() ;
        
    	// 层：仪表盘
    	this.dashboard = ins(yc.ui.dashboard.Dashboard) ;
    	this.addChild(this.dashboard) ;
		
    	
    }
    
    , draw: function(ctx){
    	this._super() ;
    }
    
}) ;


