yc.outer.PhysicalEntity = cc.Sprite.extend({

	size: 30
	
    , x: 0
	, y: 0
	, power: 0

	, accel: -0.1
	, angle: 1
	, turnRate: 0.2

	, maxSpeed: 1
	, speed: 3
	
	, homeX: null
	, homeY: null
	
	, turnRate: 0.5
	
	, runDamping: 0
	
	, ctor: function(){
		this.b2Body = null ;
        this.scheduleUpdate();

        this._followingCamera = null ;
	}

	, init: function(){
		// abstract method
	}

	, initWithPosition: function(x,y){
		this.x = this.homeX = x ;
		this.y = this.homeY = y ;
	}

	, initWithB2Body: function(b2body){
		this.b2Body = b2body ;
		b2body.SetUserData(this) ;
	}
	
	, initWithCircle: function(radius,x,y,density){

		this.size = radius ;
		
		var world = cc.Director.getInstance()._runningScene.world ;
		
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
        bodyDef.userData = this;
        this.b2Body = world.CreateBody(bodyDef);

        new Box2D.Collision.Shapes.b2CircleShape(radius/PTM_RATIO) ;
        
        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius/PTM_RATIO) ;
        fixtureDef.density = density ;
        fixtureDef.friction = 1.0 ;
        this.b2Body.CreateFixture(fixtureDef);
	}

	, initWithPolygon: function(points,x,y,density,type){
		
		var world = cc.Director.getInstance()._runningScene.world ;
		
        var bodyDef = new b2BodyDef();
        bodyDef.type = typeof(type)=='undefined'? b2Body.b2_staticBody: type ;
        bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
        bodyDef.allowSleep = true;
        bodyDef.userData = this;
        this.b2Body = world.CreateBody(bodyDef);

        // 逆时针输入顶点
        var vertices = [] ;
        for(var i=0;i<points.length;i++)
        {
        	vertices.push(new b2Vec2((points[i].x)/PTM_RATIO,(points[i].y)/PTM_RATIO)) ;
        }
        var shape = new b2PolygonShape() ;
        shape.SetAsArray(vertices) ;
        
        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = shape ;
        fixtureDef.density = density ;
        fixtureDef.friction = 1.0 ;
        this.b2Body.CreateFixture(fixtureDef);
	}
	
	, initWithScript: function(script){
		for(var prop in script)
		{
			this[prop] = script[prop] ;
		}
		this._script = script ;
		this.initWithPosition(this.x,this.y) ;
		this.init() ;
	}
	
	// 导出为 script
	, exportScript: function(){
		var script = this._script || {} ;
		if(this.homeX)
		{
			script.x = this.homeX ;
		}
		if(this.homeY)
		{
			script.y = this.homeY ;
		}
		return script ;
	}

	, update: function(dt){
		if(this.b2Body)
		{
			var p = this.b2Body.GetPosition() ;
			this.setWorldPosition(p.x*PTM_RATIO,p.y*PTM_RATIO) ;
			var r = (-this.b2Body.GetAngle())%(Math.PI*2) ;
			if(r<0)
			{
				r+= Math.PI*2 ;
			}
            this.setRotation( r ) ;
		}
	}
	
	, setWorldPosition: function(x,y){
		this.x = x ;
		this.y = y ;

    	// 移动摄像机
    	if( this._followingCamera )
    	{
    		this._followingCamera.moveByFocus(this.x,this.y) ;
    	}
	}

	
	, autoWakeup: function(dis){

        var camera = ins(yc.outer.Camera) ;
        
		// 远离玩家，处于睡眠状态
		if( dis>(camera.width/2) )
		{
			if(this.b2Body.IsAwake())
			{
				this.b2Body.SetAwake(false) ;
				//log(this.constructor.className+' '+this.id+' sleeping') ;
			}
			return false ;
		}
		
		else if( !this.b2Body.IsAwake() )
		{
			// 唤醒
			this.b2Body.SetAwake(true) ;
			//log(this.constructor.className+' '+this.id+' wake up') ;
		}
		
		return true ;
	}
	

	, mosey: function(speed){
		
		this.speed = typeof(speed)=='undefined'? 0.5: speed ;
		
		// 返回原始点
		if(this.homeX!==null && this.homeY!==null && Math.random()<0.05)
		{
			this.turnTarget(this.homeX,this.homeY) ;
		}
		
		// 随机方向
		else if( Math.random()<0.1 )
		{
			this.turnRandom() ;
		}
		
		// 移动
		this.updateVelocity() ;
	}
	
	, turnRandom: function(){
		this.incAngle( Math.random()>0.5? -1: 1 ) ;
	}

	
	, updateVelocity: function(){
		if( this.b2Body )
		{
			var v = this.b2Body.GetLinearVelocity() ;
			v.x = this.speed * Math.sin(this.angle) ;
			v.y = this.speed * Math.cos(this.angle) ;
			this.b2Body.SetLinearVelocity(v) ;
			this.b2Body.SetAwake(true) ;
		}
	}
	
	, turnTarget: function(targetX,targetY) {

		var rTarget = yc.util.radianBetweenPoints(this.x,this.y,targetX,targetY) ;
		
		if( this.angle > rTarget )
		{
			this.incAngle( this.angle-rTarget>Math.PI?1: -1 ) ;
		}
		else
		{
			this.incAngle( rTarget-this.angle>Math.PI?-1: 1 ) ;
		}

		// 如果角度较大，则降低速度
		if( Math.abs(this.angle-rTarget) > yc.settings.outer.role.TSD_radian )
		{
			this.speed*= yc.settings.outer.role.TSD_rate ;
		}
	}
	
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
		
		// 改变线速度
		this.updateVelocity() ;
	}
	, accelerating: function(){
		
		var accel = this.accel>0?
				this.accel*(1-this.runDamping):
				this.accel ;
		
		if(accel)
		{
			var maxSpeed = this.maxSpeed*(1-this.runDamping) ;
			
			if (this.speed > maxSpeed)
			{
				this.speed-= yc.settings.outer.player.normalSpeedDown ;
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
			
			this.updateVelocity() ;
		}
	}
	, run: function(accel){
		this.accel = typeof(accel)=='undefined'? yc.settings.outer.player.defaultAccel: accel ;
	}
	, stopRun: function(){
		this.accel = -0.1 ;
	}

	
	/**
	 * points 中的多边形顶点，必须是逆时针，并且为凸多边形
	 */
	, _createB2PolygonFixtureDef: function(points){

		// 逆时针输入顶点
		var vertices = [] ;
		for(var i=0;i<points.length;i++)
		{
			vertices.push(new b2Vec2((points[i][0])/PTM_RATIO,(points[i][1])/PTM_RATIO)) ;
		}
		var shape = new b2PolygonShape() ;
		shape.SetAsArray(vertices) ;
		
		// Define the dynamic body fixture.
		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = shape ;
		
		return fixtureDef ;
	}

	, _cleanupFixtures: function(){
		var fixture = this.b2Body.GetFixtureList() ;
		do{
			var nextFixture = fixture.GetNext() ;
			this.b2Body.DestroyFixture(fixture) ;
		} while(fixture=nextFixture) ;
	}

	, _destoryBody: function(){
		this._cleanupFixtures() ;

		this.b2Body.GetWorld().removingBodies.push(this.b2Body) ;
		
		// 解除关系
		this.b2Body.SetUserData(null) ;
		this.b2Body = null ;
	}
	
	, _initB2Body: function(type){

		// 清理 body 中的fixture
		if(this.b2Body)
		{
			this._destoryBody() ;
		}

		// 新建body
		var world = cc.Director.getInstance()._runningScene.world ;
		var bodyDef = new b2BodyDef() ;
    	bodyDef.type = typeof(type)=='undefined'? b2Body.b2_dynamicBody: type ;
		bodyDef.position.Set(this.x/PTM_RATIO,this.y/PTM_RATIO) ;
		bodyDef.allowSleep = true;
		bodyDef.userData = this;
		this.b2Body = world.CreateBody(bodyDef);

		return this.b2Body ;
	}
	
	, initWithScriptShapes: function(shapes){
		
		for(var i=0;i<shapes.length;i++)
		{
			var shape = shapes[i] ;
			var fixture = null ;
			
			if(shape.type=='polygon')
			{
				fixture = this._createB2PolygonFixtureDef(shape.points) ;
			}
			else
			{
				continue ;
			}
			
			fixture.density = ('density' in shape)? shape.density: 0.5 ;
			fixture.friction = ('friction' in shape)? shape.friction: 1 ;
			fixture.friction = ('restitution' in shape)? shape.restitution: 1 ;
			

			if( !('color' in shape) )
			{
				shape.color = yc.settings.outer.stain.defaultColor ;
			}
			if( !('borderColor' in shape) )
			{
				shape.borderColor = yc.settings.outer.stain.defaultBorderColor ;
			}
			

			if( 'userData' in shape)
			{
				fixture.userData = shape.userData ;
			}
			
			this.b2Body.CreateFixture(fixture) ;
		}
	}
	
	, draw: function(ctx){
		
		if('shapes' in this)
		{
			for(var i=0;i<this.shapes.length;i++)
			{
				var shape = this.shapes[i] ;

				// 形状组合模式
				ctx.globalCompositeOperation = "source-over" ;

				// 多边形
				if(shape.type=='polygon')
				{
					yc.util.drawPolygon(shape.points,ctx,'rgba('+shape.borderColor+','+shape.density+')','rgba('+shape.color+','+shape.density+')',true) ;
				}
				// 圆
				else if(shape.type=='circle')
				{
					// todo ...
				}

				// 文本
				if( shape.text )
				{
					ctx.save() ;

					ctx.textBaseline = 'middle' ;
					ctx.textAlign = 'center' ;
					ctx.font = shape.textStyle ;
					ctx.fillStyle = "rgba("+shape.textColor+")" ;
					ctx.fillText(shape.text,0,0) ;

					ctx.restore() ;
				}

				// 材质贴图
				// todo ...
			}
		}
	}

	, b2bodyFixture: function(idx){
		if(idx<0)
		{
			return null ;
		}
		var fixture = this.b2Body.GetFixtureList() ;
		while(idx--)
		{
			fixture = fixture.GetNext() ;
		}
		return fixture ;
	}
	
	, destroy: function(){
		
		// 从场景中移除
		this.removeFromParentAndCleanup() ;
		
		// 从物理世界中移除
		if(this.b2Body)
		{
			this._destoryBody() ;
		}
	}
	
	, transform: yc.outer.Camera.transformSprite
}) ;