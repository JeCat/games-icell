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
    	this.stay = null
    }
    
    , enterCell: function(stay){
    	
    	//log(['virus cluster enter cell on: ',stay]) ;
        
        this.stay = stay ;
        
        this.setPosition(cc.p(stay.center[0],stay.center[1])) ;
        
        var layer  = ins(yc.inner.monster.VirusLayer) ;
        layer.addChild(this) ;
       
        this.release() ; // 立即执行第一次

        if(this.num>1)
        {
            this.actRelease = yc.actions.Timer.create(yc.settings.inner.virus.defaultReleaseDt,this.num-1,this,this.release) ; 
            this.runAction(this.actRelease) ;
        }
    }

    , release: function(){
    	
    	//log(['release virus on ',this.stay]) ;
    	
        var virus = this._parent.createVirusSprite() ;
        virus.init(this.virusPrototype) ;
        
        var shakeRange = yc.settings.inner.hexgonSideLength/4 ;
        var shakeX = shakeRange - shakeRange*2*Math.random() ;
        var shakeY = shakeRange - shakeRange*2*Math.random() ;
        //log(['shake',shakeX,shakeY]) ;
        virus.setPosition(cc.p(this.stay.center[0]+shakeX,this.stay.center[1]+shakeY)) ;

        virus.run() ;
        
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
