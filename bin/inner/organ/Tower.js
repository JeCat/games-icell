yc.inner.organ.Tower = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.OutsideShooter
		);
		
		this.initWithFile('res/organ/Tower.png');
	}
	,draw: function(ctx){
		var texture = yc.util.ccShareTexture('res/organ/Tower.png') ;
		ctx.drawImage(texture,-17,-17) ;
	}
});
