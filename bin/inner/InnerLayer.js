yc.inner.InnerLayer = cc.LayerColor.extend({
    
    ctor: function(){
        
        this._super() ;
        
        this.setAnchorPoint(cc.p(0,0)) ;
        this.initWithColor(new cc.Color4B(255,255,255,10),game.settings.inner.width,game.settings.inner.height) ;
        
        this.setScale(1) ;
        
        // 细胞
        this.cell = yc.inner.Cell.ins() ;
        
        // 层：细胞地图
        this.map = yc.inner.CellInnerMap.ins() ;
        this.addChild(this.map) ;
        
        // 层：建筑
        this.buildings = new yc.inner.BuildingLayer() ;
        this.addChild(this.buildings) ;
        
        // 层：病毒
        this.layerVirus = yc.inner.VirusLayer.ins() ;
        this.addChild(this.layerVirus) ;
    }
    
    
    , touchVirusCluster: function(radian){
        // 计算病毒群接触到的六边形格子
        // 比较出最接近 接触点弧度的 细胞膜
        var minRd = 10 ;
        var touchingHexgon = null ;
        for(var i=0;i<this.cell.membranes.length;i++)
        {
            var r = Math.abs(this.cell.membranes[i].radianToNucleus() - radian) ;
            
            if(r<minRd)
            {
                minRd = r ;
                touchingHexgon = this.cell.membranes[i] ;
            }
        }
        
        // 创建并释放病毒 
        var virus = this.layerVirus.createVirusSprite() ;
        virus.run(touchingHexgon.x,touchingHexgon.y) ;
    }
    
    , _setScale: cc.Layer.prototype.setScale
    , setScale: function(scale,scaleY)
    {
        this._setScale(scale,scaleY) ;
        this.locate() ;        
    }
    
    , locate: function(){
        
        var size = this.getContentSize() ;
        
        var dplW = 0|(size.width * this._scaleX) ;
        var dplH = 0|(size.height * this._scaleY) ;
        
        var wSize = cc.Director.getInstance().getWinSize() ;
        
        this.setPosition(cc.p(wSize.width-dplW-10,wSize.height-dplH-10));
        //this.setPosition(cc.p(0,0)) ;   
         
        // 横向屏幕
        if(wSize.height<wSize.width)
        {
            yc.outer.Camera.ins().setFocus( 0|((wSize.width-dplW-10)/2), 0|(wSize.height/2) ) ;
        }
        // 纵向屏幕
        else
        {
            yc.outer.Camera.ins().setFocus( 0|(wSize.width/2), 0|((wSize.height-dplH-10)/2) ) ;
        }
        
    }
    
    , transform: yc.cocos2d.patchs.Node.transform
    
    , windowToClient: function(x,y){
        var p = this.getPosition() ;
        x = x-p.x ;
        y = y-p.y ;
        
        var s = this.getContentSize() ;
        
        if( x<0 || y<0 || x>s.width || y>s.height )
        {
            return null ;
        }
        
        x = Math.round(this._scaleX * x);
        y = Math.round(this._scaleY * y);
        
        return [x,y] ;
    }
    
}) ;


yc.inner.InnerLayer._ins = null ;
yc.inner.InnerLayer.ins = function(){
    if(!yc.inner.InnerLayer._ins){
        yc.inner.InnerLayer._ins = new yc.inner.InnerLayer() ;
    }
    return yc.inner.InnerLayer._ins ;
}
