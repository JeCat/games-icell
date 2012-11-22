yc.inner.organ.Bottles = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.Bottles
		);
		
		// this.initWithFile('res/organ/MoShuiPing.png');
		// 开始动画
        this.initWithSpriteFrameName("ping_0001.png") ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.ping') ));
	}
});
