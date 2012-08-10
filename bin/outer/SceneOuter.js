yc.outer.SceneOuter = cc.Scene.extend({
	
	init: function() {
		this.setIsKeypadEnabled(true);  
        this.setIsTouchEnabled(true); 
	}
	
    , onEnter:function () {
        this._super();
                
        // 层
        this.layerPlayer = new yc.outer.PlayerLayer();
        this.addChild(this.layerPlayer);
        this.layerPlayer.init();
    }
    
    , transform: function(){}
    
});