yc.inner.building.Rocket = yc.inner.building.Building.extend({

	ctor: function(){
		this._super() ;

		this.layer = "shell" ;

		this.effct = 5 ;
		this.persisting = 5 ;
		this.working = false ;

		// 开始动画
        this.initWithSpriteFrame( yc.animations.firstFrame('towers.tuijinqi') ) ; //第一帧
        // this.initWithSpriteFrameName("reinforce_C0_0001.png") ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.tuijinqi') )) ;

        // 冒烟动作
		this.actionSmoke = yc.actions.Timer.create(0.2,-1,this,function(){
			var cell = ins(yc.outer.Cell) ;

			var smoke = yc.util.ObjectPool.ins(yc.inner.building._RocketSmoke).ob() ;
			//var pos = this.worldAxes() ;

			var mypos = yc.util.clientToWindow( ins(yc.inner.InnerLayer).buildings, this.hexgon.center[0], this.hexgon.center[1], ins(yc.outer.PlayerLayer) ) ;
			smoke.init(mypos[0],mypos[1]) ;
			ins(yc.outer.PlayerLayer).addChild(smoke) ;
		}) ;
	}

	, put: function(hexgon){

		// 注册效果
		yc.event.register( ins(yc.outer.Cell), "calculatePower", this.calculatePower, this ) ;

		// 技能
		this.skill = new yc.inner.skill.SkillBase ;
		this.skill.setCoolingTime(5) ;
		this.skill.setName( 'rocket' );
		this.skill.setIcon( 'res/skill/rocket.png' );
		this.addSkill(this.skill) ;
		this.skill.start = this.fire ;
		this.skill.target = this ;

		// 
		this._super(hexgon) ;
	}

	, fire: function(){

		this.working = true ;
		
		// 开始冒烟
		this.runAction(this.actionSmoke) ;

		// 增加效果
		ins(yc.outer.Cell).calculatePower() ;

		// 停止
		this.runAction(
			yc.actions.Timer.create(this.persisting,1,this,function(){
				this.working = false ;

				// 停止冒烟
				this.stopAction(this.actionSmoke) ;

				// 移除效果
				ins(yc.outer.Cell).calculatePower() ;
			}) 
		) ;
		this.skill.fillCoolingTime();

	}

	, calculatePower: function(cell){

		if(!this.working)
		{
			return ;
		}

		cell.power*= this.effct ;
	}
}) ;

yc.inner.building._RocketSmoke = cc.Sprite.extend({

	ctor: function(){
		this.x = 0 ;
		this.y = 0 ;

		// 开始动画
        this.initWithSpriteFrame( yc.animations.firstFrame('tower.smoke_d') ) ; //第一帧
        this.actionAnimation = cc.Sequence.create([
			yc.animations.createAction('tower.smoke_d')
			, cc.CallFunc.create(this.free,this)
		]) ;
	}
	, init: function(x,y){
		this.x = x ;
		this.y = y ;
		this.setPosition(cc.p(x,y)) ;

		this.runAction( this.actionAnimation ) ;
	}

	, free: function(){
		this.removeFromParent(true) ;
		yc.util.ObjectPool.ins(yc.inner.building._RocketSmoke).free(this) ;
	}

	//, transform: yc.outer.Camera.transformSprite
}) ;