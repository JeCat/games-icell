yc.inner.building.Tower = yc.inner.building.Building.extend({  

	ctor: function(){

		this._super() ;
		
		// 炮弹速度
		this.speed = 300
		
		// 射击频率
		this.freq = 1500
		
		// 伤害
		this.injure = 10
		
		// 射程
		this.range = 100
		
		// 溅射半径
		this.sputtering = 20
		
		// 溅射伤害
		this.sputtering_injure = 3
		
		// 减速效果
		this.retardment = 0 ;
		this.retardment_duration = 0 ;
		
		this.hexgon = null
		
		this.bShoting = true	

		this.color = 'red' ;



		// 创建动画
		var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        spriteFrameCache.addSpriteFrames("res/building/tower.plist","res/building/tower.png") ;

        this.initWithSpriteFrameName("artillery_lvl4_tesla_0049.png");

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 49; i <= 65; i++) {
            str = "artillery_lvl4_tesla_00" + (i<10?'0':'') + i + ".png";
            
            if( !(frame = spriteFrameCache.getSpriteFrame(str)) )
            {
            	continue ;
            }

            animFrames.push(frame);

            // 矫正一下 图片位置
            frame._offset.y = - (frame._originalSize.height - frame._rect.size.height)/2 ;
            frame._offset.x = 0 ;
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        this.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));

       	this.setAnchorPoint(cc.p(0.5,0.2)) ;
	}
	
	
	
	, draw: function(ctx){
		if(!this.hexgon)
		{
			return ;
		}

		// 绘制射击范围
		if( this.hexgon.selected )
		{
			ctx.fillStyle = "rgba(255,255,255,0.2)" ;
			
			ctx.beginPath() ;
			ctx.moveTo(this.range,0) ;
			ctx.arc(0,0, this.range, 0, Math.PI*2 , false) ;
			ctx.closePath()
			
			ctx.fill() ;
		}
		

		this._super(ctx) ;
		return;
		
		
		ctx.fillStyle = this.color ;
		ctx.font="normal san-serif";
		ctx.fillText('╭☆',-12,+4) ;
	}
	
	, _put: yc.inner.building.Building.prototype.put
	, put: function(hexgon){
		
		this._put(hexgon)
		
		// 开始射击
		this.shot() ;
		
		return yc.inner.building.Tower ;
	}
	
	, shot: function(){
		
		if(!this.bShoting)
		{
			return ;
		}
		
		// 瞄准病毒
		var myPos = this.getPosition() ;
		var arrVirus = ins(yc.inner.InnerLayer).layerVirus.arrVirus ;
		for(var i=0;i<arrVirus.length;i++)
		{
			var virus = arrVirus[i]
			var virusPos = virus.getPosition() ;
			var dis = yc.util.pointsDis(myPos.x,myPos.y,virusPos.x,virusPos.y) ;
			
			// bingo !
			if( dis < this.range+virus.radius )
			{
				// shot
				var bullet = yc.inner.building.Bullet.create() ;
				bullet.shot( myPos, virusPos, dis, this ) ;
				break ;
			}
		}
		
		var tower = this ;
		setTimeout(function(){tower.shot()},this.freq) ;
	}
	
	
	/**
	 * 建筑停用
	 */
	, stop: function(){
		this.bShoting = false ;
	}
}) ;


// yc.inner.building.Tower.upgraders = [] ;
// yc.inner.building.Tower.block = true ;



/**
 * 射击防御塔
 */
yc.inner.building.TowerShooter = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'yellow' ;
		this.initWithFile("res/tower_yellow.png");
		
		yc.util.cloneObject(this,yc.settings.building.Shooter.base) ;
	}
}) ;
yc.inner.building.TowerShooter.upgraders = [] ;
yc.inner.building.TowerShooter.block = true ;

	


/**
 * 火炮防御塔
 */
yc.inner.building.TowerCannon = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'red' ;
		this.initWithFile("res/aminoAcid_yellow.png");
		yc.util.cloneObject(this,yc.settings.building.Cannon.base) ;
	}
}) ;
yc.inner.building.TowerCannon.upgraders = [] ;
yc.inner.building.TowerCannon.block = true ;



/**
 * 减速防御塔
 */
yc.inner.building.TowerSlower = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'blue' ;
		this.initWithFile("res/aminoAcid_yellow.png");
		yc.util.cloneObject(this,yc.settings.building.Slower.base) ;
	}
}) ;
yc.inner.building.TowerSlower.upgraders = [] ;
yc.inner.building.TowerSlower.block = true ;



/**
 * 喷射防御塔
 */
yc.inner.building.TowerJetter = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'orange' ;
		yc.util.cloneObject(this,yc.settings.building.Jetter.base) ;
	}
}) ;
yc.inner.building.TowerJetter.upgraders = [] ;
yc.inner.building.TowerJetter.block = true ;