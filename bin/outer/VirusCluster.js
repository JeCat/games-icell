yc.outer.VirusCluster = yc.outer.PhysicalEntity.extend({
	
	size: 6 
	
	, lv: 1
	, moseySpeed: 0.1
	, normalSpeed: 4
	
	, ctor: function(){
		this._super() ;
		this.id = yc.outer.VirusCluster.assigned ++ ;
		
		yc.outer.VirusCluster.instances[this.id] = this ;
	}
		
	, initRandom: function(){
		// 根据离Boss的距离确定病毒群的等级
		var compass = yc.outer.BossCompass.ins() ;
		if(compass.nearestBoss)
		{
			var dis = yc.util.pointsDis(this.x,this.y,compass.nearestBoss.x,compass.nearestBoss.y) ;
			this.lv = compass.nearestBoss.lv - Math.round(dis/1000) ;
			if(this.lv<1)
			{
				this.lv = 1 ;
			}
		}
		
		this.initWithCircle(6,this.x,this.y) ;
	}

	, draw: function(ctx){
		

		ctx.beginPath() ;
		ctx.strokeStyle='rgb(30,30,30)' ;
		ctx.moveTo(this.size,0);
		ctx.arc(0,0, this.size, 0, 2*Math.PI, false);
		ctx.stroke() ;
		ctx.closePath() ;
		
		ctx.fillStyle = 'red' ;
		ctx.font="normal 12px san-serif";
		
		ctx.fillText('Lv '+this.lv,5,-8);

		if(yc.settings.outer.virus.dbg.showId)
		{
			ctx.fillText('id:'+this.id,40,-8);
			
			// 到 home 的连线
			if( this.homeX!==null && this.homeY!==null )
			{
				ctx.beginPath() ;
				ctx.moveTo(0,0) ;
				ctx.strokeStyle='white' ; 
				ctx.lineTo(this.homeX-this.x,-(this.homeY-this.y)) ;
				ctx.stroke() ;
				ctx.closePath() ;
			}
			
			// 画方向
			ctx.beginPath() ;
			ctx.strokeStyle='green' ; 
			var speed = this.b2Body.GetLinearVelocity() ;
			ctx.moveTo(0,0) ;
			ctx.lineTo(speed.x*PTM_RATIO,-speed.y*PTM_RATIO) ;
			ctx.stroke() ;
			ctx.closePath() ;
		}

	}
	
	, vigilanceRange: function(){
		return 200 ;
	}
	
	, update: function(dt){

		this._super(dt) ;
		
		if(!this.b2Body)
		{
			return ;
		}

		var cell = ins(yc.outer.Cell) ;
		var dis = yc.util.pointsDis(this.x,this.y,cell.x,cell.y) ;
		if(!this.autoWakeup(dis))
		{
			return ;
		}
		
		// 警示范围
		if( !yc.settings.player.stealth && this.vigilanceRange()>dis )
		{
	        this.setSpeed(this.normalSpeed) ;
			
			// 调整角度
			var targetAngle = yc.util.radianBetweenPoints(this.x,this.y,cell.x,cell.y) ;
			this.drive(targetAngle) ;
			
			// 切换到追击速度
			//this.maxSpeed = 3.5 ;
			
			//this.run(0.2) ;
			
			// 遇到污渍减速
			// yc.outer.Stain.downSpeed(this) ;
		
			//this.accelerating() ;
			
			//this.moving() ;
		}
		
		// 漫步
		else
		{
	        this.setSpeed(this.moseySpeed) ;
	        
			this.mosey() ;
		}
		
	}
	
	, touchingHexgon: function(cell) {
			
		// 计算病毒群到细胞圆心的绝对弧度
		var radian = yc.util.radianBetweenPoints(cell.x,cell.y,this.x,this.y) ;
		
		// 计算病毒群相对细胞的弧度
		radian = radian - cell.angle ;
		if(radian<0)
		{
			radian = 2*Math.PI + radian ;
		}

		return yc.inner.InnerLayer.ins().touchVirusCluster(radian) ;
	}
	
	, createInnerSprite: function(hexgon){
		
		var innerCluster = yc.inner.monster.VirusCluster.create(hexgon) ;
		
		// 根据等级设置能力
		innerCluster.virusPrototype = {
			lv: this.lv
			, file: 'res/virus16.png'
			, speed: 15 + (this.lv-1)
			, hpFull: 10 + (this.lv-1)*10
		}
		
		innerCluster.enterCell(hexgon) ;
	}
		
	, touchingCell: function(cell){
		this._parent.removeChild(this) ;
		
		// 接触位置
		var hexgon = this.touchingHexgon(cell) ;
		
		// 创建内部场景种的病毒群 
		this.createInnerSprite(hexgon) ;
	}
	  
}) ;

yc.outer.VirusCluster.instances = {} ;
yc.outer.VirusCluster.assigned = 0 ;
