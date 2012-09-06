yc.outer.PhysicalEntity = cc.Sprite.extend({

	size: 10
	
    , x: 0
	, y: 0
	, angle: 0
	, power: 0
	, speed: 4
	
	, homeX: null
	, homeY: null
	
	, turnRate: 0.5
	
	, ctor: function(){
		this.b2Body = null ;
        this.scheduleUpdate();
	}

	, initWithPosition: function(x,y){
		this.x = this.homeX = x ;
		this.y = this.homeY = y ;
	}
	
	, initWithCircle: function(radius,x,y){

		this.size = radius ;
		
		var world = cc.Director.getInstance()._runningScene.world ;
		
        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape ;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
        bodyDef.userData = this;
        this.b2Body = world.CreateBody(bodyDef);

        new Box2D.Collision.Shapes.b2CircleShape(radius/PTM_RATIO) ;
        
        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius/PTM_RATIO) ;
        fixtureDef.density = 1.0 ;
        fixtureDef.friction = 1.0 ;
        this.b2Body.CreateFixture(fixtureDef);
        
        // 动力
        this.setSpeed(this.speed) ;
	}
	

	, initWithPolygon: function(points,x,y){
		
		var world = cc.Director.getInstance()._runningScene.world ;
		
        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape ;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
        bodyDef.allowSleep = false;
        bodyDef.userData = this;
        this.b2Body = world.CreateBody(bodyDef);

        // 逆时针输入顶点
        var vertices = [] ;
        log(points) ;
        for(var i=points.length-1;i>=0;i--)
        {
        	vertices.push(new b2Vec2((points[i].x)/PTM_RATIO,(points[i].y)/PTM_RATIO)) ;
        }
        log(vertices) ;
        var shape = new b2PolygonShape() ;
        shape.SetAsArray(vertices) ;
        
        
        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = shape ;
        fixtureDef.density = 1.0 ;
        fixtureDef.friction = 1.0 ;
        this.b2Body.CreateFixture(fixtureDef);

	}
	
	, setSpeed: function(speed){
		this.power = this.b2Body.GetMass()*speed ;
		this.b2Body.SetLinearDamping(this.power/2) ;
	}
	
	, update: function(dt){
		if(this.b2Body)
		{
			var p = this.b2Body.GetPosition() ;
			this.setWorldPosition(p.x*PTM_RATIO,p.y*PTM_RATIO) ;
		}
	}
	
	, drive: function(radian){
		
		this.angle = radian%(2*Math.PI) ;
		
		// 停止原有的动力
		this.stopDriving() ;
	    
		var force = new Box2D.Common.Math.b2Vec2( this.power*Math.sin(radian), this.power*Math.cos(radian) ) ;
		this.b2Body.ApplyForce( force, this.b2Body.GetWorldCenter() ) ;
	}
	
	, stopDriving: function(){
		this.b2Body.m_force.SetZero();
		this.b2Body.m_torque = 0.0;
	}
	
	, setWorldPosition: function(x,y){
		this.x = x ;
		this.y = y ;
	}

	
	, autoWakeup: function(dis){

        var camera = ins(yc.outer.Camera) ;
        
		// 远离玩家，处于睡眠状态
		if( dis>camera.width )
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
	
	, mosey: function(){
		
		// 返回原始点
		if( this.homeX!==null && this.homeY!==null && Math.random()<0.05 )
		{
			var rHome = yc.util.radianBetweenPoints(this.x,this.y,this.homeX,this.homeY) ;
			this.drive( rHome ) ;
		}
		
		// 随机方向
		else
		{
			this.drive( this.angle + (Math.random()>0.5?-1:1)*this.turnRate ) ;
		}
	}
	
	, transform: yc.outer.Camera.transformSprite
}) ;