yc.inner.monster.Virus = cc.Sprite.extend({  

	radius: 10
	
	, hpFull: 30
	, hpRate: 1 	// 所剩 hp 的百分比， 用来绘制血槽
	, hp: 0
	
	, speed: 15
	, normalSpeed: 30
	
	, runningFrom: null
	, runningTarget: null
	, actRunning: null
	
	, cluster: null
	, hurt: 1
	
	, spriter: 'res/virus16.png'

	, ctor: function(){

		// 创建动画
        this.initWithSpriteFrameName("golemHead_0001.png") ; //第一帧
		this.animationAction = cc.RepeatForever.create( yc.animations.createAction("role.virus_a") ) ;



       	this.setAnchorPoint(cc.p(0.5,0.2)) ;
	}
	
	, initWithScript: function(script){
		//log('virus ('+this.__ObjectPoolId__+') init') ;

		this._script = script ;
	
		this.alive = true ;
		// this.lv = script.lv ;
		this.spriter = script.spriter ;
		this.speed = script.speed ;
		this.hpFull = script.hp ;
		this.hurt = 1 ;


		// this.attack = yc.inner.monster.Virus.script.attack ;
		// this.bekill = yc.inner.monster.Virus.script.bekill ;

		// for(var key in prototype)
		// {
		// 	this[key] = prototype[key] ;
		// }
		this.init() ;
	}

	, init: function(){
		// this.initWithFile(this.spriter) ;
   
		this.hpRate = 1 ;
		this.hp = this.hpFull ;
		this.normalSpeed = this.speed ;
		
		this.runningFrom = null ;
		this.runningTarget = null ;
		this.actRunning = null ;
		this.cluster = null ;

		// 开始动画
		this.runAction(this.animationAction) ;
	}
	
	, run: function() {

		var p = this.getPosition() ;
		var cell = ins(yc.inner.Cell) ;
		if( !(this.runningFrom=cell.aAxes.hexgonByPoint(p.x,p.y)) )
		{
			throw new Error("病毒所在坐标无效："+p.x+','+p.y) ;
			// something wrong!
			return ;
		}

		//log(['virus ('+this.__ObjectPoolId__+') run from ',this.runningFrom]) ;
		
		this.runningTarget = cell.pathMap().next(this.runningFrom) ;
		
		// 到达
		if(!this.runningTarget)
		{
			if(this.runningTarget!=cell.nuclues)
			{
				throw new Error("病毒所在坐标无效：hexgon "+this.runningTarget.x+','+this.runningTarget.y+"; position "+p.x+','+p.y) ;
			}
			else
			{
				this.attack() ;
				
				// 
				if(this.cluster)
				{
					this.cluster.virusArrived(this) ;
				}
		
				this.destroy() ;
				
				return false ;
			}
		}
		
		this.actRunning = this.createRunAction(this.runningTarget,this.speed) ;
		this.runAction(this.actRunning) ;
		
		return true ;
	}
	
	, stopRun: function(){
		
		if(this.actRunning)
		{
			this.stopAction(this.actRunning) ;
			delete this.actRunning ;
			this.actRunning = null ;
			this.runningTarget = null ;
			this.runningFrom = null ;
		}
	}
	
	, createRunAction: function(target,speed){
		var destination = [
			target.center[0]+10-20*Math.random()
			, target.center[1]+10-20*Math.random()
		]
		return yc.actions.DynamicMove.create(speed,[this.getPositionX(), this.getPositionY()],destination,{
			object: this
			, func: this.run
		}) ;
	}
	
	, attack: function(){
		ins(yc.inner.Cell).getHurt() ;
	}
	
	, setPos: function(x,y){
		var hexgon = cell.aAxes.hexgon(x,y) ;
		this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
	}
	
	, draw: function(ctx){


		//ctx.rotate( yc.util.correctRotation(this) ) ;
		ctx.rotate( -ins(yc.outer.Cell).rotationTarget ) ;

		this._super(ctx) ;
		
//		ctx.fillStyle = 'red' ;
//		ctx.font="normal 3px san-serif";
//		ctx.fillText(this.__ObjectPoolId__,0,-18);
		
		// 画血槽
		if(this.hpRate<1)
		{
			var len = Math.round(this.hpRate * 10) ;
			yc.util.drawRect([-5,this.radius+5],[-5+len,this.radius+3],ctx,null,'rgb(199,0,50)') ;
		}
	}
	
	/**
	 * 命中
	 */
	, hit: function(strong){
		
		this.hp-= strong ;
		
		if(this.hp<0)
		{
			this.bekill() ;
			this.destroy() ;
			return ;
		}
		
		this.hpRate = this.hp/this.hpFull ;
	}

	// 被击杀
	, bekill: function(){
		//log('virus ('+this.__ObjectPoolId__+') be kill') ;
		// 在细胞内掉落一个氨基酸，持续若干秒钟，等待线粒体回收
		if(this._script.flopNum)
		{
			var aminoacid = yc.inner.monster.FlopAminoAcid.ob() ;
			aminoacid.init(this,this._script.flop,this._script.flopNum) ;
		}

		// 
		if(this.cluster)
		{
			this.cluster.virusBekill(this) ;
		}
	}
	
	, destroy: function(){
		log('virus ('+this.__ObjectPoolId__+') destroy') ;
		this.alive = false ;
		this.stopRun() ;
		this.stopAllActions() ;
		ins(yc.inner.monster.VirusLayer).removeVirusSprite(this) ;

		// 停止动画
		this.stopAction(this.animationAction) ;
	}
	
	, onExit: function(){
		if(this.alive)
		{
			this.destroy() ;
		}
	}
	
}) ;


