yc.outer.VirusCluster = yc.outer.PhysicalEntity.extend({
	
	ctor: function(){
		this._super() ;
		
		this.turnRate = yc.settings.outer.virus.turnRate ;
		this.moseySpeed = yc.settings.outer.virus.moseySpeed ;
		this.normalSpeed = yc.settings.outer.virus.normalSpeed ;
		this.size = yc.settings.outer.virus.defaultSize ;
		this.vigilanceRange = yc.settings.outer.virus.defaultVigilanceRange ;

		this.id = yc.outer.VirusCluster.assigned ++ ;
		yc.outer.VirusCluster.instances[this.id] = this ;

		this.failViruses = 0 ;
		this.successViruses = 0 ;

		this.animationAction = null ;
	}
		
	, initRandom: function(range){
		this.initWithScript({
			x: range.left+(0|(Math.random()*range.width))
			, y: range.bottom+(0|(Math.random()*range.height))
			, lv: 1					// 病毒等级
			, turnRate: 0.04		// 转向灵敏度
			, moseySpeed: 2			// 漫步速度
			, normalSpeed: 5		// 正常速度
			, vigilanceRange: 200	// 警视范围
		}) ;
	}

	, init: function(){
		// // 根据离Boss的距离确定病毒群的等级
		// var compass = ins(yc.outer.BossCompass) ;
		// if(compass.nearestBoss)
		// {
		// 	var dis = yc.util.pointsDis(this.x,this.y,compass.nearestBoss.x,compass.nearestBoss.y) ;
		// 	this.lv = compass.nearestBoss.lv - Math.round(dis/1000) ;
		// 	if(this.lv<1)
		// 	{
		// 		this.lv = 1 ;
		// 	}
		// }

		this.failViruses = 0 ;
		this.successViruses = 0 ;

		// 执行动画
		if(this.animationAction)
		{
			this.runAction(this.animationAction) ;
		}

		
		this.initWithCircle(this.size,this.x,this.y,yc.settings.outer.virus.density) ;
	}

	, initWithScript: function(script){

		this._script = script ;

		this.turnRate = script.turnRate ;					// 转向灵敏度
		this.moseySpeed = script.moseySpeed ;				// 漫步速度
		this.normalSpeed = script.normalSpeed ;				// 正常速度
		this.vigilanceRange = script.vigilanceRange ;		// 警视范围
		// this.spriter = script.spriter ;
		this.size = script.size ;

		// 创建动画
		if( script.spriter && (script.spriter in yc.animations.frames) )
		{
			if(this.animationAction)
			{
				this.stopAction(this.animationAction) ;
			}

			//第一帧
			this.initWithSpriteFrame( yc.animations.frames[script.spriter].getFrames()[0].getSpriteFrame() ) ;
			this.animationAction = cc.RepeatForever.create( yc.animations.createAction(script.spriter) ) ;
		}

		this.initWithPosition(script.x,script.y) ;
		this.init() ;
	}
	
	, draw: function(ctx){
		
		this._super(ctx,true) ;

		if(yc.settings.outer.virus.dbgInfo)
		{
			// 
			ctx.beginPath() ;
			ctx.strokeStyle='rgb(30,30,30)' ;
			ctx.moveTo(this.size,0);
			ctx.arc(0,0, this.size, 0, 2*Math.PI, false);
			ctx.stroke() ;
			ctx.closePath() ;
			
			ctx.fillStyle = 'red' ;
			ctx.font="normal 12px san-serif";

			this.drawDbgInfo(ctx) ;
		}
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
		if( !yc.settings.player.stealth && this.vigilanceRange>dis )
		{
			this.speed = this.normalSpeed ;
			
			// 调整方向
			this.turnTarget(cell.x,cell.y) ;
			
			this.updateVelocity() ;
		}
		
		// 漫步
		else
		{
			this.mosey(this.moseySpeed) ;
		}
		
	}
	
	, touchingHexgon: function(cell) {
			
		// 计算病毒群到细胞圆心的绝对弧度
		var radian = yc.util.radianBetweenPoints(cell.x,cell.y,this.x,this.y) ;
		
		// 计算病毒群相对细胞的弧度
		radian = radian - cell.direction ;
		if(radian<0)
		{
			radian = 2*Math.PI + radian ;
		}

		return ins(yc.inner.InnerLayer).touchVirusCluster(radian) ;
	}
		
	, touchingCell: function(cell,hexgon){
		
		// 回收
		this.destroy() ;
		
		// 创建内部场景种的病毒群 
		var innerCluster = yc.inner.monster.VirusCluster.create(hexgon) ;
		innerCluster.initWithScript( this._script ) ;
		innerCluster.outer = this ;
		
		innerCluster.enterCell(hexgon) ;
	}

	, virusArrived: function(virus){
		this.successViruses ++ ;

		this.finish() ;
	}
	, virusBekill: function(virus){
		this.failViruses ++ ;

		this.finish() ;
	}

	, finish: function(){
		if( this.successViruses + this.failViruses < this._script.viruses.length )
		{
			// 尚未结束
			return ;
		}

		// 完全击杀！
		if( this.successViruses==0 )
		{
			log('perfect') ;

			// 掉落 dna
			// todo ...
			
			var dna = this._script.dna;
			if( typeof(dna) == "object"){

	        	var items = [];
	        	var _script = this._script;

				for(var i =0;i<dna.length;i++){
					var action = function(){
						var uc = ins(yc.user.Character);
						uc.dna.obtainGene(yc.dna.genes[this.id]);
						
						if( typeof(uc.levels[yc.GameScene._level]) != "object"){
							uc.levels[yc.GameScene._level] = {unlock:true , gene:this.id};
						}else{
							uc.levels[yc.GameScene._level].unlock = true;
							uc.levels[yc.GameScene._level].gene = this.id;
						}

						if( typeof(uc.levels[_script.unlockLevel]) != "object"){
							uc.levels[_script.unlockLevel] = {unlock:true , gene:null};
						}else{
							uc.levels[_script.unlockLevel].unlock = true;
							uc.levels[_script.unlockLevel].gene = null;
						}
						uc.save();
					}
					
					var title = yc.dna.genes[dna[i]].title;
					items.push({title:title,action:action,id:dna[i]});
				}
				
				var menu = ins( yc.ui.menu.Menu );
				menu.setTitle("选择DNA");
				menu.setTitleHeight(40);
				menu.setItems(items);
				menu.run();
			}
		}

		// 解锁关卡，启动传送门
		if( this._script.unlockLevel )
		{
			var portal = new yc.outer.Portal() ;
			portal.initWithScript({
				x: this._script.x
				, y: this._script.y
				, level: this._script.unlockLevel
			}) ;

			cc.Director.getInstance().getRunningScene().layerRoles.addChild(portal) ;

			// 开启动画
			portal.open() ;
		}
	}
	, hit: function(injure){
		var i;
		for(i=this._script.viruses.length-1;i>=0;--i){
			var viruse = this._script.viruses[i];
			viruse.hp -= injure ;
			if( viruse.hp <= 0 ){
				this._script.viruses.splice(i,1);
				this.failViruses ++ ;
			}
		}
		if( this._script.viruses.length <= 0){
			this.destroy() ;
			this.finish();
		}
	}
	  
}) ;

yc.outer.VirusCluster.instances = {} ;
yc.outer.VirusCluster.assigned = 0 ;
