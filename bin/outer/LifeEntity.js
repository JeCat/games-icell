yc.outer.LifeEntity = cc.Sprite.extend({
	
	x: 0
	, y: 0
	
	, homeX: null
	, homeY: null
	
	, accel: -0.1
	, maxSpeed: 0.5
	, speed: 0.3
	, angle: 1
	, turnRate: 0.2
	
	, initWithPosition: function(x,y){
		this.x = this.homeX = x ;
		this.y = this.homeY = y ;
	}

	
	// 阻尼，1表示无阻挡全速状态
	, runDamping: 1
	
	, incAngle: function(sign) {
		
		this.angle = this.angle + sign*this.turnRate ;
		if(this.angle<0)
		{
			this.angle+= 2 * Math.PI ;
		}
		else
		{
			this.angle = this.angle % (2 * Math.PI);
		}
	}
	
	, randomTurn: function(){
		this.incAngle( Math.random()>0.5? -1: 1 ) ;
	}
	
	, mosey: function(speed){
		
		this.speed = typeof(speed)=='undefined'? 0.5: speed ;
		
		// 返回原始点
		if(this.homeX!==null && this.homeY!==null && Math.random()<0.05)
		{
			var rHome = yc.util.radianBetweenPoints(this.x,this.y,this.homeX,this.homeY) ;
			if( this.angle > rHome )
			{
				this.incAngle( this.angle-rHome>Math.PI?1: -1 ) ;
			}
			else
			{
				this.incAngle( rHome-this.angle>Math.PI?-1: 1 ) ;
			}
		}
		
		// 随机方向
		if( Math.random()<0.1 )
		{
			this.randomTurn() ;
		}
		
		// 移动
		this.moving() ;
	}
	
	, accelerating: function(){
		
		var accel = this.accel>0?
				this.accel*this.runDamping:
				this.accel ;
		
		if(accel)
		{
			var maxSpeed = this.maxSpeed*this.runDamping ;
			
			if (this.speed > maxSpeed)
			{
				this.speed-= 0.5
			}
			else
			{
				this.speed += accel ;
				
				if(this.speed > maxSpeed)
				{
					this.speed = maxSpeed ;
				}
				else if(this.speed<0)
				{
					this.speed = 0;
				}
			}
		}
	}
	
	
	, run: function(accel){
		this.accel = typeof(accel)=='undefined'? 0.3: accel ;
	}
	, stopRun: function(){
		this.accel = -0.1 ;
	}
	
	, setWorldPosition: function(x,y){
		this.x = x ;
		this.y = y ;
	}
	
	, moving: function(){

		var x = this.x + this.speed * Math.sin(this.angle);
		var y = this.y + this.speed * Math.cos(this.angle);
		
		// 检查世界边界
		var pos = cc.Director.getInstance().getRunningScene().testWorldBoard(x,y) ;
		
		
		this.x = pos[0] ;
		this.y = pos[1] ;
	}

	, transform: yc.outer.Camera.transformSprite
}) ;