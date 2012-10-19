yc.inner.monster.VirusCluster = cc.Sprite.extend({
	
	stay: null
	, actRelease: null
	, releasing: false
	, outer: {}
		
	, ctor: function(){
		this._super() ;
	}

	, draw: function(ctx){

		// ctx.rotate( yc.util.correctRotation(this) ) ;
		ctx.rotate( this.getRotation() ) ;

		this._super(ctx) ;
	}
	

	, initWithScript: function(script){
		this._script = script ;
		this.initWithFile(script.spriter) ;
	}

	, init: function(){
		this.releasing = true ;
		this.actRelease = null ;
		this.stay = null ;
		this.releaseIndex = 0 ;
		this.outer = null ;
	}
	
	, enterCell: function(stay){

		var layer  = ins(yc.inner.monster.VirusLayer) ;
		layer.addChild(this) ;
		
		this.stay = stay ;
		this.setPosition(cc.p(stay.center[0],stay.center[1])) ;

		this.release() ; // 立即执行第一次
	}

	, release: function(){
		if(!this._script.viruses){
			return;
		}

		if( this.releaseIndex>=this._script.viruses.length )
		{
			// 结束
			this.releaseOver() ;
			return ;
		}

		else
		{
			var virusScript = this._script.viruses[ this.releaseIndex++ ] ;
			this.actRelease = yc.actions.Timer.create( virusScript.wait, 1, this, function(){

				var virus = this._parent.createVirusSprite() ;
				virus.initWithScript(virusScript) ;
				virus.cluster = this.outer ;
				
				var shakeRange = yc.settings.inner.hexgonSideLength/4 ;
				var shakeX = shakeRange - shakeRange*2*Math.random() ;
				var shakeY = shakeRange - shakeRange*2*Math.random() ;
				// virus.setPosition(cc.p(this.stay.center[0]+shakeX,this.stay.center[1]+shakeY)) ;

				virus.setPosition(cc.p(this.stay.center[0]+shakeX,this.stay.center[1]+shakeY)) ;

				virus.run() ;

				// next
				this.release() ;

			} ) ; 
			this.runAction(this.actRelease) ;
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
