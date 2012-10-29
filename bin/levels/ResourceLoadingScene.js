yc.levels.ResourceLoadingScene = cc.Scene.extend({


	ctor: function(loader){
		this._super() ;

		this.loader = loader ;
	}
	
	, draw: function(ctx){
		log("yc.levels.ResourceLoadingScene ") ;

		var percent = ( (this.loader.loadedResourceCount/this.loader.resourceCount) * 100 ).toFixed(2) ;

		yc.util.text(ctx,"hi, game is loading ……"+percent+"%",200,-200,"red","red") ;
		yc.util.text(ctx,this.loader.loadedResourceCount+", "+this.loader.resourceCount,200,-180,"red","red") ;
	}

}) ;

