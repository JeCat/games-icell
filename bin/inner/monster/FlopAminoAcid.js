yc.inner.monster.FlopAminoAcid = cc.Sprite.extend({  

	init: function(virus,type,num){
		var aminoacid = this ;
		this.beWatched = null ;
		this.beCatched = null ;
		this.actFade = null ;
		this.type = type ;
		this.num = num ;
		
		// virus._parent.addChild(this) ;
		
		var layer = new cc.Sprite();
		layer._content='elephant add';
		layer.addChild(this);
		virus._parent.addChild(layer);
		
		if( undefined == layer._ordraw ){
			layer._ordraw = layer.draw;
			layer.draw = function(ctx){
				ctx.rotate( this.getRotation() ) ;
				// yc.util.drawLine([0,100],[0,0],ctx,"green",true) ;
				// yc.util.drawLine([1,100],[0,0],ctx,"red",true) ;
				this._ordraw(ctx);
			}
		}
		
		var p0 = cc.p(0,0);
		var p = virus.getPosition() ;
		p0 = cc.p(0,0);
		p1 = cc.p(p.x,p.y) ;
		p2 = cc.p( p.x+(5-Math.random()*10), p.y+(5-Math.random()*10) ) ;
		p3 = cc.p( p2.x-p.x , p2.y-p.y );
		layer.setPosition( p2 );
		this.setPosition( p0 );
		
		// 掉落后弹动
		this.runAction(cc.JumpTo.create(1,p3,5,3)) ;
		
		// 消失
		this.actFade = cc.FadeOut.create(8) ;
		this.actFade._stop = this.actFade.stop ;
		this.actFade.stop = function(){
			aminoacid.destroy() ;
		}
		this.runAction(this.actFade) ;
	}
	
	, draw: function(ctx){

		ctx.globalAlpha = this._opacity/255;
		ctx.fillStyle = this.type ;
		ctx.beginPath();
		ctx.arc(0, 0, 2, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	, destroy: function(){
		this.removeFromParentAndCleanup() ;
		yc.op.ins(yc.inner.monster.FlopAminoAcid).free(this) ;
	}
	
}) ;

yc.inner.monster.FlopAminoAcid.ob = function(){
	return yc.op.ins(yc.inner.monster.FlopAminoAcid).ob() ;
}
