yc.GameScene = cc.Scene.extend({
	
	
    onEnter:function () {
        this._super();
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        // 内部场景层
        this.layerInner = yc.inner.InnerLayer.ins() ;
        this.addChild(this.layerInner) ;
        
                
        // 显示玩家角色层
        this.layerPlayer = new yc.outer.PlayerLayer();
        this.addChild(this.layerPlayer);
        
       
        
        // 显示其他角色
        this.layerRoles = new yc.outer.RolesLayer() ;
        this.addChild(this.layerRoles) ;
        
        
    }
    
    
    , _transform: yc.cocos2d.patchs.Node.transform
    , transform: function(){
        this._transform() ;
    }
    //, transform: function(){}
    
});