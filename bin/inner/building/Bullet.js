yc.inner.building.Bullet = cc.Sprite.extend({  
	
	shot: function(from,target,dis,tower){
		
		var bullet = this ;
		
		this.setPosition( from ) ;
		this.setVisible(true) ;
		
		var bullet = this ;
		var action = cc.MoveTo.create(dis/tower.speed,target) ;
		action._stop = action.stop ;
		action.stop = function(){
			this._stop() ;

			// 显示火焰
			var flame = yc.op.ins(yc.inner.building.Bullet.Flame).ob() ;
			flame.init(tower.sputtering,bullet) ;
			
			
			// 计算被命中的敌人
			var bHited = false ;
			var arrVirus = ins(yc.inner.InnerLayer).layerVirus.arrVirus ;
			var myPos = bullet.getPosition() ;
			for(var i=0;i<arrVirus.length;i++)
			{
				var p = arrVirus[i].getPosition() ;
				var dis = yc.util.pointsDis(myPos.x,myPos.y,p.x,p.y) ;
				
				var virus = arrVirus[i] ;
				
				// 命中目标
				// 使用virus.using检查是否在前面几轮循环中被击毙
				if( virus.using && !bHited && virus.radius > dis )
				{
					virus.hit(tower.injure) ;
					bHited = true ; // 一颗子弹只命中一个敌人
				}
				
				// 溅射伤害（群体）
				if( virus.using && virus.radius+tower.sputtering > dis )
				{
					virus.hit(tower.sputtering_injure) ;
					
					// 减速效果
					if( virus.using && tower.retardment && tower.retardment_duration )
					{
						// 减速
						virus.speed = virus.normalSpeed*(1-tower.retardment) ;
						
						// 改变移动中的目标的前进速度
						if(virus.actRunning)
						{
							virus.actRunning.initWithSpeed(virus.speed) ;
						}
							
						// 恢复正常速度 action
						if( virus.actResumeSpeed )
						{
							virus.stopAction(virus.actResumeSpeed) ;
						}
						virus.actResumeSpeed = yc.actions.Timer.create(tower.retardment_duration,1,null,function(virus){
								if(virus.using)
								{
									// 恢复正常速度
									virus.speed = virus.normalSpeed ;
									virus.actRunning.initWithSpeed(virus.speed) ;
								}
							},[virus]
						) ;
						virus.runAction(virus.actResumeSpeed) ;
					}
				}
				
			}
			
			// 回收对象
			bullet._parent.removeChild(bullet) ;
			yc.op.ins(yc.inner.building.Bullet).free(bullet) ;
		}
		
		this.runAction(action) ;
	}
	
	, draw: function(ctx){

		ctx.fillStyle = "rgb(50,50,50)" ;
	
		ctx.beginPath() ;
		ctx.moveTo(0+1,0) ;
		ctx.arc(0,0, 1, 0, Math.PI*2 , false) ;
		ctx.closePath() ;
		
		ctx.fill() ;
		ctx.stroke() ;
	}
	
}) ;
yc.inner.building.Bullet.className = 'yc.inner.building.Bullet' ;

yc.inner.building.Bullet.create = function(){
	
	var bullet = yc.op.ins(yc.inner.building.Bullet).ob() ;
	ins(yc.inner.InnerLayer).buildings.addChild(bullet) ;
	bullet.setVisible(false) ;
	
	return bullet ;
}

yc.inner.building.Bullet.Flame = cc.Sprite.extend({
	
	ctor: function(){

		// 执行动画
        this.initWithSpriteFrameName("explosion_air_0001.png");
        this.animationAction = yc.animations.createAction("towers.shooter.bulletflame") ;
	}

	, init: function(range,bullet){
		
		this.range = range ;
		bullet._parent.addChild(this) ;
		var p = bullet.getPosition() ;
		this.setPosition(cc.p(p.x,p.y)) ;
		

		// 目前使用贴图比较大，使用一半的尺寸
		this.setScale(0.5) ;
		// this.setScale(0.1) ;
		
		// var seq = cc.Sequence.create([
		// 	cc.Spawn.create(
		// 			cc.ScaleTo.create(0.15, 1, 1)
		// 			, cc.FadeOut.create(0.15)
		// 	)
		// 	, cc.CallFunc.create(this,this.free)
		// ]) ;
		// this.runAction(seq) ;


		var seq = cc.Sequence.create([
			this.animationAction
			, cc.CallFunc.create(this,this.free)
		]) ;
		this.runAction(seq) ;
	}
	// , draw: function(ctx){

	// 	ctx.globalAlpha = this._opacity/255;
	// 	ctx.fillStyle = "rgba(255,255,255,0.5)" ;
	
	// 	ctx.beginPath() ;
	// 	ctx.moveTo(0+this.range,0) ;
	// 	ctx.arc(0,0, this.range, 0, Math.PI*2 , false) ;
	// 	ctx.closePath() ;
		
	// 	ctx.fill() ;
	// }
	, free: function(){
		this.removeFromParent(true) ;
		yc.util.ObjectPool.ins(yc.inner.building.Bullet.Flame).free(this) ;
	}
});
