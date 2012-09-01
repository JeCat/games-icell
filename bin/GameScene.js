yc.GameScene = cc.Scene.extend({
	
	ctor: function(){
		// 场景的世界边界， null 表示不限
		this.minX = null ;
		this.maxX = null ;
		this.minY = null ;
		this.maxY = null ;
	}

	, testWorldBoard: function(x,y) {
        if( this.minX!==null && x<this.minX )
        {
        	x = this.minX ;
        }
        if( this.maxX!==null && x>this.maxX )
        {
        	x = this.maxX ;
        }
        if( this.minY!==null && y<this.minY )
        {
        	y = this.minY ;
        }
        if( this.maxY!==null && y>this.maxY )
        {
        	y = this.maxY ;
        }
        return [x,y] ;
	}
	
    , onEnter:function () {
        this._super();
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        // 层：显示玩家
        this.layerPlayer = new yc.outer.PlayerLayer();
        this.addChild(this.layerPlayer);
        
        
        // 层：显示其他角色
        this.layerRoles = new cc.Layer() ;
        this.layerRoles.setAnchorPoint(cc.p(0,0)) ;
        this.addChild(this.layerRoles) ;
        
        this.layerStains = new cc.Layer() ;
        this.layerStains.setAnchorPoint(cc.p(0,0)) ;
        this.addChild(this.layerStains) ;
        
        // 层：细胞内部场景
        this.layerInner = yc.inner.InnerLayer.ins() ;
        this.addChild(this.layerInner) ;
        
        // 层：ui
        this.layerUi = ins(yc.ui.UILayer) ;
        this.addChild(this.layerUi) ;
        
    }
    
    , onTouchesBegan: function(touches, event){
        log('onTouchesBegan') ;
    }
    , onTouchesMoved: function(touches, event){
    }
    , onTouchesEnded:function (touches, event) {
    }
    
    , transform: yc.cocos2d.patchs.Node.transform
    
    , randomCreateEntities: function(entityClass,num,layer){

        var range = {
            left: this.minX
            , right: this.maxX
            , top: this.maxY
            , bottom: this.minY
        } ;
        range.width = Math.abs(range.right - range.left) ;
        range.height = Math.abs(range.top - range.bottom) ;
        
    	for(var i=0;i<num;i++)
    	{
    	    var x = range.left+(0|(Math.random()*range.width)) ;
    	    var y = range.bottom+(0|(Math.random()*range.height)) ;
    	    
    		var aRole = new entityClass ;
    		aRole.initWithPosition(x,y) ;
    		aRole.initRandom() ;
    		
    		layer.addChild(aRole) ;
    	}
    }
});