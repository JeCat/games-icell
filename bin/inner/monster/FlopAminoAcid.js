yc.inner.monster.FlopAminoAcid = cc.Sprite.extend({  

	init: function(virus,type,num){
		var aminoacid = this ;
		this.beWatched = null ;
		this.beCatched = null ;
		this.actFade = null ;
		this.type = type ;
		this.num = num ;
		
		virus._parent.addChild(this) ;
		var p = virus.getPosition() ;
		p1 = cc.p(p.x,p.y) ;
		p2 = cc.p( p.x+(5-Math.random()*10), p.y+(5-Math.random()*10) ) ;
		this.setPosition(p1) ;
		
		// 掉落后弹动
		this.runAction(cc.JumpTo.create(1,p2,5,3)) ;
		
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