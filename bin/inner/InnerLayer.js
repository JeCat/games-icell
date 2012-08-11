yc.inner.InnerLayer = cc.Layer.extend({
    
    ctor: function(){
        
        this._super() ;
        
        //this.setAnchorPoint(cc.p(0,0)) ;

        this.spriteCellInner = yc.inner.CellInner.ins() ;
        this.addChild(this.spriteCellInner) ;
    }
    
    
    , _transform: cc.Layer.prototype.transform
    , transform: function(){
        this._transform() ;
    }
    //, transform: function(){}
}) ;


yc.inner.InnerLayer._ins = null ;
yc.inner.InnerLayer.ins = function(){
    if(!yc.inner.InnerLayer._ins){
        yc.inner.InnerLayer._ins = new yc.inner.InnerLayer() ;
    }
    return yc.inner.InnerLayer._ins ;
}
