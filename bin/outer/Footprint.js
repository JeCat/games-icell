yc.outer.Footprint = cc.Sprite.extend({

	ctor: function(x,y){

		this.setOpacity(0.25) ;
		this.actDisappear = cc.Sequence.create([
			cc.FadeOut.create(0.5)
 			, cc.CallFunc.create(this,this.free)
 		]) ;
	}

	, init: function(x,y){
		this.x = x ;
		this.y = y ;

		this.runAction(this.actDisappear) ;
	}

	, free: function(){
		this.removeFromParent() ;
		yc.util.ObjectPool.ins(yc.outer.Footprint).free(this) ;
	}

	, draw: function(ctx){
		yc.util.drawCircle(ctx,0,0,50,50,"rgb(255,255,255)") ;
	}

	, transform: yc.outer.Camera.transformSprite

}) ;