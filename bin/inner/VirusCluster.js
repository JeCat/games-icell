yc.inner.VirusCluster = cc.Sprite.extend({
    
    nums: 10
    
    , stay: null
    
    , ctor: function(){
        this._super() ;
        this.initWithFile('res/cocos20.png') ;
    }
    
    , init: function(){
        this.nums = 10 ;
    }
    
    , enterCell: function(stay){
        
        var cluster = this ;
        this.stay = stay ;
        
        this.setPosition(cc.p(stay.center[0],stay.center[1])) ;
        
        var layer  = yc.inner.VirusLayer.ins() ;
        layer.addChild(this) ;
        
        var release = function(){
            
            var virus = layer.createVirusSprite() ;
            virus.run(stay) ;
            
            cluster.nums -- ;
            
            if(cluster.nums>0)
            {
                window.setTimeout(release,1000) ;
            }
            else
            {
                cluster.releaseOver() ;
            }
        }
        release() ;
    }
    
    , releaseOver: function(){
        yc.inner.VirusLayer.ins().removeChild(this) ;
        yc.op.ins(yc.inner.VirusCluster).free(this) ;
    }
});

yc.inner.VirusCluster.className = 'yc.inner.VirusCluster' ;

yc.inner.VirusCluster.create = function(enterHexgon){
    var cluster = yc.op.ins(yc.inner.VirusCluster).ob() ;
    cluster.init() ;
    cluster.enterCell(enterHexgon) ;
}
