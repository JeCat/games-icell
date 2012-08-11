yc.outer.SceneOuter = cc.Scene.extend({
	
	
    onEnter:function () {
        this._super();
                
        // 显示玩家角色层
        this.layerPlayer = new yc.outer.PlayerLayer();
        this.addChild(this.layerPlayer);
        this.layerPlayer.init();
        
        // 显示其他角色
        this.layerRoles = new yc.outer.RolesLayer() ;
        this.addChild(this.layerRoles) ;
        this.layerRoles.init() ;
        
        
    }
    
    , transform: function(){}
    
});