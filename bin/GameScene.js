
yc.GameScene = cc.Scene.extend({
	
	ctor: function(){
		// 场景的世界边界， null 表示不限
		this.minX = null ;
		this.maxX = null ;
		this.minY = null ;
		this.maxY = null ;


        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var screenSize = cc.Director.getInstance().getWinSize();
        //UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);


        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, 0), true);
        world = this.world ;
        this.world.SetContinuousPhysics(false);
        
        
        this.scheduleUpdate();
	}

	, testWorldBoard: function(x,y) {
        if( this.minX!==null && x<this.minX )
        {
        	x = this.minX ;
        }
        if( this.maxX!==null && x>this.maxX )
        {
        	x = this.maxX ;
        }
        if( this.minY!==null && y<this.minY )
        {
        	y = this.minY ;
        }
        if( this.maxY!==null && y>this.maxY )
        {
        	y = this.maxY ;
        }
        return [x,y] ;
	}
	
    , onEnter:function () {
        this._super();
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        // 层：显示玩家
        this.layerPlayer = new yc.outer.PlayerLayer();
        this.addChild(this.layerPlayer);
        
        
        // 层：显示其他角色
        this.layerRoles = new cc.Layer() ;
        this.layerRoles.setAnchorPoint(cc.p(0,0)) ;
        this.addChild(this.layerRoles) ;
        
        this.layerStains = new cc.Layer() ;
        this.layerStains.setAnchorPoint(cc.p(0,0)) ;
        this.addChild(this.layerStains) ;
        
        // 层：细胞内部场景
        this.layerInner = yc.inner.InnerLayer.ins() ;
        this.addChild(this.layerInner) ;
        
        // 层：ui
        this.layerUi = ins(yc.ui.UILayer) ;
        this.addChild(this.layerUi) ;
        
        

        // 测试 box2d sprite
        /*sss = this.addNewSprite(cc.p(100,100)) ;
        body = sss.b2Body ;
        body.SetUserData(this.layerPlayer.cell) ;*/
    }
    
    , onTouchesBegan: function(touches, event){
        log('onTouchesBegan') ;
    }
    , onTouchesMoved: function(touches, event){
    }
    , onTouchesEnded:function (touches, event) {
    }
    
    , transform: yc.cocos2d.patchs.Node.transform
    
    , randomCreateEntities: function(entityClass,num,layer){

        var range = {
            left: this.minX
            , right: this.maxX
            , top: this.maxY
            , bottom: this.minY
        } ;
        range.width = Math.abs(range.right - range.left) ;
        range.height = Math.abs(range.top - range.bottom) ;
        
    	for(var i=0;i<num;i++)
    	{
    	    var x = range.left+(0|(Math.random()*range.width)) ;
    	    var y = range.bottom+(0|(Math.random()*range.height)) ;
    	    
    		var aRole = new entityClass ;
    		aRole.initWithPosition(x,y) ;
    		aRole.initRandom() ;
    		
    		layer.addChild(aRole) ;
    	}
    }
    
    , update: function(dt){// return ;

        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);
        
        
        //outerCell.angle
        /*
    	var body = sss.b2Body ;
    	var vel = body.GetLinearVelocity();
    	var desiredVel = 0;
    	switch ( moveState )
    	{  
    	   case -1:  desiredVel = Math.max( vel.x - 0.1, -15.0 ); break;
    	   case 0:  desiredVel = vel.x * 0.98; break;
    	   case 1: desiredVel = Math.min( vel.x + 0.1,  15.0 ); break;
    	   
    	}
    	var velChange = desiredVel - vel.x;
    	var impulse = body.GetMass() * velChange; //disregard time factor
    	body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(impulse,0), body.GetWorldCenter() );*/
        /*
        if( typeof(body._force_radian)!='undefined' && body._force_radian!==null )
        {
        	body.m_force.SetZero();
            body.m_torque = 0.0;
            
            
        	var vel = body.GetLinearVelocity();
        	if(Math.sqrt(vel.x*vel.x + vel.y*vel.y)<2)
        	{
	        	var desiredVel = new Box2D.Common.Math.b2Vec2( 0.1*Math.sin(body._force_radian), 0.1 *Math.cos(body._force_radian) )
	        	body.ApplyForce( desiredVel, body.GetWorldCenter() ) ;
	        	
	        	log(['use impulse:',desiredVel.x,desiredVel.y])
        	}
        	
        }*/
    	

//        //Iterate over the bodies in the physics world
//        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
//        	var myActor = b.GetUserData();
//            if (myActor!=null) {
//                //Synchronize the AtlasSprites position and rotation with the corresponding body
//            	// myActor.update() ;
//            	if( myActor.setWorldPosition )
////                myActor.x = b.GetPosition().x * PTM_RATIO ;
////                myActor.y = b.GetPosition().y * PTM_RATIO ;
//                myActor.setWorldPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
//                //myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
//                //console.log(b.GetAngle());
//                //log([b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO])
//            }
//        }
        
       //world.ClearForces() ;
        
    }
});