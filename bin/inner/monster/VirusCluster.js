yc.inner.monster.VirusCluster = cc.Sprite.extend({
    
    totalNum: 10
    , num: 10
    
    , stay: null
    , lv: 1
    , releasing: false
    
    , virusPrototype: {}
        
    , ctor: function(){
        this._super() ;
        this.initWithFile('res/virus24.png') ;
    }
    
    , init: function(){
    	this.num = this.totalNum ;
    	this.releasing = true ;
    	this.actRelease = null ;
    }
    
    , enterCell: function(stay){
        
        this.stay = stay ;
        
        this.setPosition(cc.p(stay.center[0],stay.center[1])) ;
        
        var layer  = ins(yc.inner.monster.VirusLayer) ;
        layer.addChild(this) ;

        this.actRelease = yc.actions.Timer.create(yc.settings.inner.virus.defaultReleaseDt,this.num-1,this,this.release) ;        
        this.release() ; // 立即执行第一次
        this.runAction(this.actRelease) ;
        
    }

    , release: function(){
    	
        var virus = this._parent.createVirusSprite() ;
        virus.init(this.virusPrototype) ;
        virus.setPosition(cc.p(this.stay.center[0]+10-20*Math.random(),this.stay.center[1]+10-20*Math.random())) ;
        virus.run(this.stay) ;
        
        this.num -- ;
        
        if(this.num<=0)
        {
            this.releaseOver() ;
        }
    }
    
    , releaseOver: function(){
    	this.releasing = false ;
    	if(this.actRelease)
    	{
            this.stopAction(this.actRelease) ;
            this.actRelease = null ;
    	}
        ins(yc.inner.monster.VirusLayer).removeChild(this) ;
        yc.op.ins(yc.inner.monster.VirusCluster).free(this) ;
    }
    
    , onExit: function(){
    	if(this.releasing)
    	{
    		this.releaseOver() ;
    	}
    }
});

yc.inner.monster.VirusCluster.className = 'yc.inner.monster.VirusCluster' ;

yc.inner.monster.VirusCluster.create = function(enterHexgon,totalNum){
    var cluster = yc.op.ins(yc.inner.monster.VirusCluster).ob() ;
    cluster.totalNum = typeof(totalNum)=='undefined'? 10: totalNum ;
    cluster.init() ;
    return cluster ;
}
