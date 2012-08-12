yc.inner.InnerLayer = cc.LayerColor.extend({
    
    ctor: function(){
        
        this._super() ;
        
        this.setAnchorPoint(cc.p(0,0)) ;
        this.initWithColor(new cc.Color4B(255,255,255,10),game.settings.inner.width,game.settings.inner.height) ;
        
        var wSize = cc.Director.getInstance().getWinSize() ;
        this.setPosition(cc.p(wSize.width-game.settings.inner.width-10,wSize.height-game.settings.inner.height-10)) ;
        
        
        // 细胞
        this.cell = yc.inner.Cell.ins() ;
        
        // 层：细胞地图
        this.map = yc.inner.CellInnerMap.ins() ;
        this.addChild(this.map) ;
        
        // 层：病毒
        this.layerVirus = yc.inner.VirusLayer.ins() ;
        this.addChild(this.layerVirus) ;
    }
    
    , transform: yc.cocos2d.patchs.Node.transform
}) ;


yc.inner.InnerLayer._ins = null ;
yc.inner.InnerLayer.ins = function(){
    if(!yc.inner.InnerLayer._ins){
        yc.inner.InnerLayer._ins = new yc.inner.InnerLayer() ;
    }
    return yc.inner.InnerLayer._ins ;
}
