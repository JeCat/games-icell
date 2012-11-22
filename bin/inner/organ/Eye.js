yc.inner.organ.Eye = yc.inner.organ.Organ.extend({
	ctor: function(){
		this._super() ;
		this.range = 10 ;

		//开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame("towers.daodan")) ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.daodan') ));
        
	}
});
