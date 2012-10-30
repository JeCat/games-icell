yc.inner.organ.Bottles = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.Bottles
		);
		
		this.initWithFile('res/organ/Bullet.png');
	}
});
