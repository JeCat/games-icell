yc.outer.Cell = yc.outer.PhysicalEntity.extend({

	ctor: function(){
		this._super() ;
		this.maxSpeed = yc.settings.outer.player.defaultMaxSpeed ;
	}

	, draw: function(ctx){
		
		ctx.rotate(this.getRotation());		// 物体旋转方向

		//this._super(ctx) ;
		
//		for(var i=0;i<this._points.length;i++)
//		{
//			var pt = this._points[i] ;
//			ctx.fillText(i,pt[0],-pt[1]) ;
//		}

		ctx.beginPath() ;
		
		ctx.strokeStyle = 'white' ;
		for(var i=0;i<this.boundaryLines.length;i++)
		{
			var line = this.boundaryLines[i] ;
			ctx.moveTo(line[0][0],-line[0][1]) ;
			ctx.lineTo(line[1][0],-line[1][1]) ;
		}
		ctx.stroke() ;
		ctx.closePath() ;
	}

	, init: function(){
        // this.cell.initWithCircle(10,0,0,yc.settings.outer.cell.density) ;
		var innerCell = ins(yc.inner.Cell) ;

		this.shapes = [] ;
		this.boundaryLines = [] ;

		var scale = 1/yc.settings.inner.zoom ;
		var transPoint = function(pt){
			return [(pt[0])*scale, (pt[1])*scale]
		}

		var edger = new yc.util.SmoothEdger ;

		var cnt = 0 ;
		// 用细胞膜格子创建 box2d 刚体
		for(var i=0;i<innerCell.membranes.length;i++)
		{
			var hexgon = innerCell.membranes[i] ;
			var sp = {
				type: 'polygon'								// 类型 circle, polygon
				, density: yc.settings.outer.cell.density	// 密度
				, points: []
				, userData: hexgon
			}
			
			var pointKeys = ['F','E','D','C','B','A'] ;
			for(var pi=0;pi<pointKeys.length;pi++)
			{
				var pt = hexgon.points[pointKeys[pi]] ;
				sp.points.push(transPoint(pt)) ;
			}
			
			this.shapes.push(sp) ;
			
			// 计算细胞膜格子的平滑外边缘
			//log([hexgon.x,hexgon.y]) ;
			for(var way in hexgon.neighbors)
			{
				var neighbor = hexgon[way]() ;
				if( neighbor===null || neighbor.type===null )
				{
					//log(way) ;
					var line = hexgon.line(way) ;
					this.boundaryLines.push([transPoint(line[0]),transPoint(line[1]),way]) ;
					edger.put(transPoint(line[0])) ;
					edger.put(transPoint(line[1])) ;
				}
			}
		}
		
		
		this._points = edger._points ;
		this.initWithScriptShapes(this.shapes) ;
		

		this.b2Body.SetAngularDamping( 4 ) ;
	}
//    
//    , draw: function(ctx){
//        
//        this._super(ctx) ;
//        
//        return ;
//
//		//var speed = this.b2Body.GetLinearVelocity() ;
//		//var radian = yc.util.radianBetweenPoints(0,0,speed.x*PTM_RATIO,speed.y*PTM_RATIO) ;
//
//		// 画方向（debug）
//		/*ctx.beginPath() ;
//		ctx.strokeStyle='green' ; 
//		ctx.moveTo(0,0) ;
//		ctx.lineTo(speed.x*PTM_RATIO,-speed.y*PTM_RATIO) ;
//		ctx.stroke() ;
//		ctx.closePath() ;*/
//		
//		ctx.beginPath() ;
//		ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)' ;
//		ctx.fillStyle = 'rgba(115, 115, 115, 1.0)' ;
//		
//		// ctx.rotate(radian);					// 移动方向
//		// ctx.rotate(this.getRotation());		// 物体旋转方向
//		ctx.rotate(this.angle);					// 受力方向
//		
//		ctx.arc(0,0, this.size, 0, 2*Math.PI, false);
//		
//		// 画眼睛
//		var r = Math.round(this.size/5) ;
//		ctx.moveTo(0,-this.size+r/2);
//		ctx.arc(0, -this.size+r/2+r, r, -Math.PI/2, Math.PI*2 , false) ;
//		
//		ctx.stroke() ;
//		ctx.closePath() ;
//		
//    }
    
	, setWorldPosition: function(x,y){
		this._super(x,y) ;

    	// 移动摄像机
    	ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
	}
	
	/**
	 * 碰撞
	 */
	, collide: function(entity,fixture,otherFixture){
		
		// 病毒群
		if(entity.constructor.className=='yc.outer.VirusCluster')
		{
			log(fixture) ;
			entity.touchingCell(this,fixture.GetUserData()) ;
		}
		// 氨基酸
		else if(entity.constructor.className=='yc.outer.AminoAcid')
		{
			entity.catchMe() ;
		}
	}
	
    , visit: function(ctx){
    	
    	this._super(ctx) ;

    	// 加速
    	this.accelerating() ;
    	
    	return ;
    	
    	
    	
    	// 转向
    	if(this._turn)
    	{
    		this.incAngle( this._turn=='right'? 1: -1 ) ;
    	}
    	
    	// 遇到污渍减速
    	yc.outer.Stain.downSpeed(this) ;
    	
    	// 加速
    	this.accelerating() ;
		
		// 移动
		if(this.speed)
		{
			this.moving() ;
	    	
	    	// 移动摄像机
	    	ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
    	}
    	
    	return this._super() ;
    }
    
    , jump: function(x,y){
    	
    	if( typeof(x)!=='number' || x.toString()=='NaN' || typeof(y)!=='number' || y.toString()=='NaN' )
    	{
    		return ;
    	}
    	
    	this.x = x ;
    	this.y = y ;
    	// 移动摄像机
	    ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
    	
    	// 停止移动
    	this.stopRun() ;
        this.speed = 0 ;
        
    	this.stopTurn() ;
    }
    
    , spurt: function(speed,radian){

    	if(typeof(radian)!='undefined')
    	{
    		this.angle = radian%(2*Math.PI) ;
    	}
    	
    	this.speed = speed ;
    }
});  


