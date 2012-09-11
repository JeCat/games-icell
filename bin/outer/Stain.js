/*** 污渍 ***/
yc.outer.Stain = yc.outer.PhysicalEntity.extend({

    size: 0
    
    , points: []
    
    , damping: 0.3
    
    , ctor: function(){
		this._super() ;
		this.id = yc.outer.Stain.assigned ++ ;
		yc.outer.Stain.pool.push(this) ;
	}
    
    , initRandom: function(){

//    	this.x = 100 ;
//    	this.y = 100 ;
//        
//        // 
//    	this.points = [] ;
//        this.appendPoint(0,50) ;
//        this.appendPoint(30,-50) ;
//        this.appendPoint(-30,-50) ;
//        
//
//		var world = cc.Director.getInstance()._runningScene.world ;
//		
//        // Define the dynamic body.
//        //Set up a 1m squared box in the physics world
//        var b2BodyDef = Box2D.Dynamics.b2BodyDef
//            , b2Body = Box2D.Dynamics.b2Body
//            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
//            , b2Vec2 = Box2D.Common.Math.b2Vec2
//            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape ;
//
//        var bodyDef = new b2BodyDef();
//        bodyDef.type = b2Body.b2_dynamicBody;
//        bodyDef.position.Set(this.x / PTM_RATIO, this.y / PTM_RATIO);
//        bodyDef.allowSleep = false;
//        bodyDef.userData = this;
//        this.b2Body = world.CreateBody(bodyDef);
//
//        // 逆时针输入顶点
//        var vertices = [
//              new b2Vec2(0,50/PTM_RATIO)
//	        , new b2Vec2(-30/PTM_RATIO,-50/PTM_RATIO)
//	        , new b2Vec2(30/PTM_RATIO,-50/PTM_RATIO)
//        ] ;
//        //log(points) ;
//        //for(var i=points.length-1;i>=0;i--)
////        for(var i=0;i<points.length;i++)
////        {
////        	vertices.push(new b2Vec2((points[i].x)/PTM_RATIO,(points[i].y)/PTM_RATIO)) ;
////        }
//       // log(vertices) ;
//        var shape = new b2PolygonShape() ;
//        shape.SetAsArray(vertices) ;
//        shape.SetAsBox(100/PTM_RATIO,100/PTM_RATIO) ;
////        shape.m_vertices.push(new b2Vec2(0,50/PTM_RATIO)) ;
////        shape.m_vertices.push(new b2Vec2(-30/PTM_RATIO,-50/PTM_RATIO)) ;
////        shape.m_vertices.push(new b2Vec2(30/PTM_RATIO,-50/PTM_RATIO)) ;
//
//        
//        
//        // Define the dynamic body fixture.
//        var fixtureDef = new b2FixtureDef();
//        fixtureDef.shape = shape ;
//        fixtureDef.density = 1.0 ;
//        fixtureDef.friction = 1.0 ;
//        this.b2Body.CreateFixture(fixtureDef);
//        
//
//		this.b2Body.SetLinearDamping(1) ;
//		this.b2Body.SetAngularDamping(1) ;
//		
//log(this) ;
//
//box = this ;
//        
//        
//        // this.initWithPolygon(this.points,this.x,this.y) ;
//        return ;
        
        
        var stain = this ;
        
        // 顶点数量( 3-4 个顶点)
        var pointNum = 3 + Math.round(Math.random()*1) ;
        var maxRadius = 400 * Math.random() ;
        this.points = [] ;
        this.size = 0 ;
        
        var createPoint = function(radian){
            
            var point = {
                radian: radian%(2*Math.PI)
                , radius: Math.random() * maxRadius
            } ;
            point.x = (Math.cos(point.radian) * point.radius) ;
            point.y = (Math.sin(point.radian) * point.radius) ;
            point.idx = stain.points.length ;
            
            stain.points.push(point) ;
            
            if(stain.size<point.radius)
            {
                stain.size=point.radius
            }
            
            return point ;
        }   
        
        var angle = 2*Math.PI / pointNum ;
        
        // 第一个顶点
        var point = createPoint( 2*Math.PI*Math.random() ) ;
        
        // 处理第二个到最后一个
        for(var p=1;p<pointNum;p++)
        {
            point = createPoint( point.radian + angle ) ;
        }
            
        
        this.initWithPolygon(this.points,this.x,this.y) ;
    }

    , appendWorldPoint: function(x,y){
    	this.points.push({
    		x: x-this.x
    		, y: y-this.y
    		, idx: this.points.length
    	}) ;
    }
    , appendPoint: function(x,y){
    	this.points.push({
    		x: x
    		, y: y
    		, idx: this.points.length
    	}) ;
    }
    , removePoint: function(idx){
    	this.points.splice(idx,1) ;
    	for ( var i = 0; i < this.points.length; i++) {
    		this.points[i].idx = i ;
		}
    }
	
	, draw: function(ctx){
	    ctx.lineJoin = 'round' ;

		ctx.rotate(this.getRotation());
	    
	    yc.util.drawPolygon(this.points,ctx,'rgba(50,50,50,'+this.damping+')','rgba(100,100,100,'+this.damping+')',true) ;
	    //yc.util.drawRect([-100,100],[100,-100],ctx,'rgba(50,50,50,'+this.damping+')','rgba(100,100,100,'+this.damping+')',true) ;

	    // 绘制调试辅助线
	    if(yc.settings.outer.stain.dbg)
	    {
	    	ctx.fillStyle = 'red' ;
			ctx.arc(0,0, 2, 0, 2*Math.PI, false) ;
			ctx.stroke() ;

	        ctx.fillText(this.id,-4,-2);
	        
	        for ( var p = 0; p < this.points.length; p++) {
	        	var point = this.points[p] ;
		        ctx.fillText(point.idx,point.x-6,-point.y+10);
			}

		    // 绘制调试辅助线
	    	this.testCollision( ins(yc.outer.Cell), ctx ) ;
	    }

	}
	
	, testCollision: function(entity,ctx){
	    
	    if( (entity.size+this.size) < yc.util.pointsDis(this.x,this.y,entity.x,entity.y) )
	    {
	        return false ;
	    }
	    
        var target = {
            x: entity.x - this.x
            , y: entity.y - this.y
        }
        
        // 到多边形中心点的角度
        var crossBoards = 0 ;
        var rayRadian = yc.util.radianBetweenPoints(target.x,target.y,0,0) ;
        var rayRadianRevert = rayRadian - 2*Math.PI ;
        
        if(ctx)
        {
            ctx.fillStyle='rgb(255,0,0)'
            yc.util.drawLine(target,[0,0],ctx,null,true) ;
            ctx.fillText(rayRadian.toFixed(2),0,0) ;
            ctx.fillText(rayRadianRevert.toFixed(2),0,10) ;
        }
        
        var pointA = this.points[this.points.length-1] ;
        pointA._r = pointA.__r = yc.util.radianBetweenPoints(target.x,target.y,pointA.x,pointA.y) ;
        
        for(var p=0;p<this.points.length;p++)
        {
            var pointB = this.points[p] ;
            pointB.__r = pointB._r = yc.util.radianBetweenPoints(target.x,target.y,pointB.x,pointB.y) ;
            pointA.__r = pointA._r
            
            if(pointA._r>pointB._r)
            {
                pA = pointA ;
                pB = pointB ;
            }
            else
            {
                pA = pointB ;
                pB = pointA ;
            }
            
            var targetRadian = rayRadian ;
            
            // 两个角的差值超过 180
            if( pA._r-pB._r>Math.PI )
            {
                // 较大的角取反值
                pA.__r = pA._r - 2*Math.PI ;
                
                // 交换大小关系
                var m = pA ;
                pA = pB ;
                pB = m ;
                
                // 如果射线的角度大于 180， 也取反值
                if(rayRadian>Math.PI)
                {
                    targetRadian = rayRadianRevert ;
                }
            }
            
            var crossed = pA.__r>targetRadian && pB.__r<targetRadian ;
            if( crossed )
            {
                crossBoards ++ ;
            }
            
            if(ctx)
            {
                yc.util.drawLine(pointA,pointB,ctx,crossed?'rgb(0,255,0)':'rgb(255,0,0)',true) ;
                yc.util.drawLine(target,pointB,ctx,"rgb(200,200,200)",true) ;
                
                ctx.fillText(p+': '+pointA.__r.toFixed(3),pointA.x,-pointA.y) ;
                ctx.fillText(p+': '+pointB.__r.toFixed(3),pointB.x,-pointB.y-12) ;
            }
            
            pointA = pointB ;
        }
        
        if(ctx)
        {
            ctx.fillText('cross boards:'+crossBoards,0,20) ;
        }
        if( crossBoards%2 )
        {
            return true ;
        }
        else
        {
            return false ;
        }
	}
	
	, removeFromParentAndCleanup: function(){
		this._super() ;
		yc.util.arr.remove(yc.outer.Stain.pool,this);
	}
	
	, update: function(dt){
		
		this._super(dt) ;

		var cell = ins(yc.outer.Cell) ;
		var dis = yc.util.pointsDis(this.x,this.y,cell.x,cell.y) ;
		this.autoWakeup(dis) ;
	}
	
}) ;


yc.outer.Stain.downSpeed = function(entity){
    
    var downSpeed = 0 ;
    
    var stains = yc.outer.Stain.pool ;
    for(var i=0;i<stains.length;i++)
    {
        if( stains[i].testCollision(entity) )
        {
            if( downSpeed < stains[i].damping )
            {
                downSpeed = stains[i].damping ;
            }
        }
    }
    
    entity.runDamping = 1 - downSpeed ;
}

yc.outer.Stain.pool = [] ;
yc.outer.Stain.assigned = 0 ;