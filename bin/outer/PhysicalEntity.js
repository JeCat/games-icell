yc.outer.PhysicalEntity = cc.Sprite.extend({

	size: 30
	
	, x: 0
	, y: 0
	, power: 0

	, accel: -0.1
	, direction: 1

	, maxSpeed: 1
	, speed: 1
	, power: 10
	
	, homeX: null
	, homeY: null
	
	, turnRate: 0.5
	
	, runDamping: 0
	
	, ctor: function(){
		this._super() ;
		this.b2Body = null ;
		this.scheduleUpdate();

		this._followingCamera = null ;
	}

	, initWithPosition: function(x,y){
		this.x = this.homeX = x ;
		this.y = this.homeY = y ;
	}

	, initWithB2Body: function(b2body){
		this.b2Body = b2body ;
		b2body.SetUserData(this) ;
	}
	
	, initWithCircle: function(radius,x,y,density,type){

		this.size = radius ;
		if(type===undefined)
		{
			type = b2Body.b2_dynamicBody ;
		}
		
		var world = cc.Director.getInstance().getRunningScene().world ;
		
		var bodyDef = new b2BodyDef();
		bodyDef.type = type;
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
		
		var world = cc.Director.getInstance().getRunningScene().world ;
		
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
			var r = this.getAngle() ;
			if(r<0)
			{
				r+= Math.PI*2 ;
			}
			this.setRotation( r ) ;
		}
	}

	, getAngle: function (){
		return  (-this.b2Body.GetAngle())%(Math.PI*2) ;
	}

	, getSpeed: function(){
		return this.b2Body.GetLinearVelocity() ;
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
		if(this.homeX!==null && this.homeY!==null && Math.random()<0.1)
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
			v.x = this.speed * Math.sin(this.direction) ;
			v.y = this.speed * Math.cos(this.direction) ;
			this.b2Body.SetLinearVelocity(v) ;
			this.b2Body.SetAwake(true) ;
		}
	}
	
	, turnTarget: function(targetX,targetY) {

		var rTarget = yc.util.radianBetweenPoints(this.x,this.y,targetX,targetY) ;
		
		if( this.direction > rTarget )
		{
			//log(this.direction-rTarget>Math.PI?1: -1) ;
			this.incAngle( this.direction-rTarget>Math.PI?1: -1 ) ;
		}
		else
		{
			//log(rTarget-this.direction>Math.PI?-1: 1)
			this.incAngle( rTarget-this.direction>Math.PI?-1: 1 ) ;
		}

		// 如果角度较大，则降低速度
		if( Math.abs(this.direction-rTarget) > yc.settings.outer.role.TSD_radian )
		{
			this.speed*= yc.settings.outer.role.TSD_rate ;
		}
	}
	
	, incAngle: function(sign) {
		this.direction = this.direction + sign*this.turnRate ;
		if(this.direction<0)
		{
			this.direction+= 2 * Math.PI ;
		}
		else
		{
			this.direction = this.direction % (2 * Math.PI);
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
			this.maxSpeed = this.power / this.b2Body.GetMass() ;

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
		var world = cc.Director.getInstance().getRunningScene().world ;
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
	
	, _usecolor: function(style,opacity){

		var ret = 'rgba('+style ;
		if(style.match(/\,/g).length<3)
		{
			ret+= ',' + opacity ;
		}
		ret+= ')' ;

		return ret ;
	}
	, draw: function(ctx,_parent){
		if(g_architecture=='native')
		{
			this._super() ;
			return ;
		}
		
		if(_parent!==undefined && _parent)
		{
			return this._super(ctx) ;
		}

		if('shapes' in this)
		{
			for(var i=0;i<this.shapes.length;i++)
			{
				var shape = this.shapes[i] ;

				// 形状组合模式
				ctx.globalCompositeOperation = "source-over" ;

				// 多边形
				if( shape.type=='polygon' && shape.borderColor )
				{
					var borderStyle = 'rgba('+shape.borderColor ;
					if(shape.borderColor.match(/\,/g).length<3)
					{
						borderStyle+= ','+shape.density ;
					}
					borderStyle+= ')' ;

					yc.util.drawPolygon(shape.points,ctx,this._usecolor(shape.borderColor,shape.density),this._usecolor(shape.color,shape.density),true) ;
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
				if( shape.img )
				{
					if(shape.tile)
					{
						yc.util.tilePolygon(ctx,shape.points,shape.img,shape) ;
					}
					else
					{
						yc.util.drawImage(ctx,shape.img,0,0,0.5,0.5) ;
					}
				}
			}
		}
	}

	, drawDbgInfo: function(ctx){

		if( this.id!==undefined )
		{
			ctx.fillText('id:'+this.id,40,-8);
		}
		
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
		ctx.save() ;
		ctx.rotate(-this.getRotation()) ;
		ctx.beginPath() ;
		ctx.strokeStyle='green' ; 
		var speed = this.getSpeed() ;
		ctx.moveTo(0,0) ;
		ctx.lineTo(speed.x*PTM_RATIO,-speed.y*PTM_RATIO) ;
		ctx.stroke() ;
		ctx.closePath() ;
		ctx.restore() ;
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
		this.removeFromParent() ;
		
		// 从物理世界中移除
		if(this.b2Body)
		{
			this._destoryBody() ;
		}
	}

	, updateSpeed: function(){
		this.maxSpeed = this.power / this.b2Body.GetMass() ;
	}

	, transform: yc.outer.Camera.transformSprite
}) ;

