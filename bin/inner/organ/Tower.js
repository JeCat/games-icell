yc.inner.organ.Tower = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.OutsideShooter
		);

		//开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame("towers.daodan")) ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.daodan') ));
	}
});
