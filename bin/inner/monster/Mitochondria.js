yc.inner.monster.Mitochondria = cc.Sprite.extend({  

	ctor: function(recycle){
		this._super() ;
		this.initWithFile("res/mitochondria.png") ;
		this.speed = 20 ;
		this.watched = null ;
		this.catched = null ;
		this.recycle = recycle ;
		this.setAnchorPoint(cc.p(0.5,0.5)) ;
	}

	, draw: function(ctx){

		//ctx.rotate( yc.util.correctRotation(this) ) ;
		ctx.rotate( -ins(yc.outer.Cell).rotationTarget ) ;

		this._super(ctx) ;
	}

	, release: function(p){
		this.setPosition(p) ;
		this.mosey() ;
	}
	
	/**
	 * 漫步
	 */
	, mosey: function(){
		
		if(this.watched || this.catched)
		{
			return ;
		}
		
		var p = this.getPosition() ;
		var axes = ins(yc.inner.Cell).aAxes ;
		var hexgon = axes.hexgonByPoint(p.x,p.y) ;
		if(!hexgon)
		{
			return ;
		}
		
		var unblocks = [] ;
		for(var way in hexgon.neighbors)
		{
			var neighbor = hexgon[way]() ;
			if( neighbor.type=='membrane' || neighbor.type=='cytoplasm' )
			{
				unblocks.push(neighbor) ;
			}
		}
		var targetHexgon = unblocks.length? unblocks[0|(Math.random()*unblocks.length)]: hexgon ;
		
		var range = yc.settings.inner.hexgonSideLength ;
		var x = targetHexgon.center[0] + (range/2 - range*Math.random()) ;
		var y = targetHexgon.center[1] + (range/2 - range*Math.random()) ;
		
		var entity = this ;
		this.actMosey = this.createMovingAction(x,y,function(){
			this._stop() ;
			// 继续漫步
			entity.mosey() ;
		}) ;
	}

	, visit: function(ctx){
		this._super(ctx) ;
		
		if( this.catched )
		{
			
		}
		
		else
		{
			// 寻找目标
			if( !this.watched )
			{
				var usingAminoacids = yc.op.ins(yc.inner.monster.FlopAminoAcid).usingObjects ;
				for(var id in usingAminoacids)
				{
					var aminoacid = usingAminoacids[id] ;
					if( aminoacid.beWatched || aminoacid.beWatched || !aminoacid.using )
					{
						continue ;
					}
					
					// 发现目标
					var worker = this ;
					this.watched = aminoacid ;
					aminoacid.beWatched = this ;
					
					// 停止漫步
					if(this.actMosey)
					{
						this.stopAction(this.actMosey) ;
					}
					
					// 向目标移动
					var p = this.watched.getPosition() ;
					this.actWorking = this.createMovingAction(p.x,p.y,function(){
						
						// 抓住目标
						worker.watched = null ;
						worker.catched = aminoacid ;
						aminoacid.beCatched = worker ;
						
						// 停止氨基酸的消失动作
						aminoacid.stopAction(aminoacid.actFade) ;
						aminoacid.setOpacity(255) ;
						
						// 
						worker.addChild(aminoacid) ;
						aminoacid.setPosition(cc.p(-5,5)) ;
						
						// 移动到所属的回收站
						worker.actWorking = worker.createMovingAction(worker.recycle.hexgon.center[0],worker.recycle.hexgon.center[1],function(){
							worker.watched = null ;
							worker.catched = null ;
							worker.removeChild(aminoacid) ;

							// 回收氨基酸
							ins(yc.inner.AminoAcidPool).increase(aminoacid.type,aminoacid.num) ;
							aminoacid.destroy() ;
							
							// 进入漫步状态
							worker.mosey() ;
						})
					}) ;
					
					break ;
				}
			}
			else
			{
				// 目标氨基酸消失
				if(!this.watched.using)
				{
					this.stopAction(this.actWorking) ;
					this.watched = null ;
					
					// 进入漫步状态
					this.mosey() ;
				}
			}
		}
	}
	
	, createMovingAction: function(x,y,stop){
		var p = this.getPosition() ;
		var dis = yc.util.pointsDis(p.x,p.y,x,y) ;
		var action = cc.MoveTo.create(dis/this.speed,cc.p(x,y)) ;
		if( typeof(stop)!='undefined' && stop )
		{
			action._stop = action.stop ;
			action.stop = stop ;
		}
		this.runAction(action) ;
		return action ;
	}
	
	, destroy: function(){
		// 扔掉手中的氨基酸
		if( this.catched )
		{
			this.catched.destroy() ;
		}
		
		this.removeFromParentAndCleanup() ;
		this.stopAction(this.actMosey);
		this.stopAction(this.actWorking);
	}
}) ;
