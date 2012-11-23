yc.inner.building.PlastosomePower = yc.inner.building.Building.extend({

	ctor: function(){

		this._super() ;

		this.increase = 1.2 ;

		// 开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame("towers.shooter") ); //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.shooter') ));

       	this.setAnchorPoint(cc.p(0.5,0.2)) ;
	}

	, put: function(hexgon){
		
		this._super(hexgon)
		
		yc.event.register( ins(yc.outer.Cell), "calculatePower", this.calculatePower, this ) ;
		ins(yc.outer.Cell).calculatePower() ;
	}

	, calculatePower: function(cell){
		cell.power*= this.increase ;
	}

}) ;