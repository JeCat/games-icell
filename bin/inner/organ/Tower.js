yc.inner.organ.Tower = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.ShootVirusCluster
		);
		
		this.initWithFile('res/organ/Tower.png');
	}
});
