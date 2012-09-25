yc.inner.monster.Virus = cc.Sprite.extend({  

	radius: 10
	
	, hpFull: 30
	, hpRate: 1
	, hp: 0
	
	, speed: 15
	, normalSpeed: 30
	
	, runningFrom: null
	, runningTarget: null
	, actRunning: null
	
	, lv: 1
	
	, file: 'res/virus16.png'
	
	, init: function(prototype){
		//log('virus ('+this.__ObjectPoolId__+') init') ;
	
		this.alive = true ;
		this.lv = yc.inner.monster.Virus.prototype.lv ;
		this.file = yc.inner.monster.Virus.prototype.file ;
		this.speed = yc.inner.monster.Virus.prototype.speed ;
		this.hpFull = yc.inner.monster.Virus.prototype.hpFull ;
		this.attack = yc.inner.monster.Virus.prototype.attack ;
		this.bekill = yc.inner.monster.Virus.prototype.bekill ;

		for(var key in prototype)
		{
			this[key] = prototype[key] ;
		}

		this.initWithFile(this.file) ;
   
		this.hpRate = 1 ;
		this.hp = this.hpFull ;
		this.normalSpeed = this.speed ;
		
		this.runningFrom = null ;
		this.runningTarget = null ;
		this.actRunning = null ;
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
		// 一定几率在细胞内掉落一个氨基酸，持续若干秒钟，等待线粒体回收
		if(Math.random()>0.5)
		{
			var aminoacid = yc.inner.monster.FlopAminoAcid.ob() ;
			aminoacid.init(this) ;
		}
		
	}
	
	, destroy: function(){
		//log('virus ('+this.__ObjectPoolId__+') destroy') ;
		this.alive = false ;
		this.stopRun() ;
		this.stopAllActions() ;
		ins(yc.inner.monster.VirusLayer).removeVirusSprite(this) ;
	}
	
	, onExit: function(){
		if(this.alive)
		{
			this.destroy() ;
		}
	}
	
}) ;


