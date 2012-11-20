yc.inner.organ.Tower = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		
		this.addSkill(
			new yc.inner.skill.OutsideShooter
		);
		

		// 开始动画
        this.initWithSpriteFrameName("artillery_lvl4_tesla_0049.png") ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.factory_arcane_tower') ));
		
	}
});
