yc.outer.Cell = yc.outer.PhysicalEntity.extend({

	ctor: function(){
		this._super() ;

		this.power = yc.settings.outer.player.basePower ;
		this.rotationTarget = 0 ;

		// 细胞内部视图
		this.layerInner = ins(yc.inner.InnerLayer) ;

		// 细胞外壳 -------
		this.shell = new yc.inner.CellShell() ;

		this._bWatching = true ;

		// action 移动留下“脚印”
		this.actFootprint = yc.actions.Timer.create (0.1,-1,this,this.onFootprinter) ;

		return ;
	}

	, onEnter: function(){

		this._super() ;
here() ;
		this.addChild(this.layerInner) ;
here() ;
		this.addChild(this.shell) ;
here() ;
		// 
		this.runAction(this.actFootprint) ;
here() ;
	}

	, onExit: function(){
		this._super() ;
		this.stopAction(this.actFootprint) ;

		this.removeChild(this.layerInner) ;
		this.removeChild(this.shell) ;
	}

	, draw: function(ctx){
		if(g_architecture=='native')
		{
			this._super() ;
			return ;
		}
		
		ctx.rotate(this.getRotation());		// 物体旋转方向
	}

	, init: function(){

		this._super() ;
		
		// 初始化细胞内部
		this.layerInner.cell.initWithScript( ins(yc.user.Character).cell ) ;

		// 初始化动力
		this.calculatePower() ;

		this._followingCamera = ins(yc.outer.Camera) ; // 摄像机跟随
		// this.cell.initWithCircle(10,0,0,yc.settings.outer.cell.density) ;

		this.buildBoundaryLines() ;
		
		// 创建body
		this._initB2Body(b2Body.b2_dynamicBody) ;

		this.initWithScriptShapes(this.shapes) ;
		

		this.b2Body.SetAngularDamping( 4 ) ;


		log("outer Cell initialized") ;
	}

	, buildBoundaryLines: function(){


		var innerCell = this.layerInner.cell ;

		this.shapes = [] ;
		this.boundaryLines = [] ;

		var scale = 1/yc.settings.camera.cellInnerZoom ;
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

					
					var pt = transPoint(line[0]) ;
					pt.push(hexgon.x) ;
					pt.push(hexgon.y) ;
					pt.push(line[0][2]) ;
					edger.put(pt) ;

					pt = transPoint(line[1]) ;
					pt.push(hexgon.x) ;
					pt.push(hexgon.y) ;
					pt.push(line[1][2]) ;
					edger.put(pt) ;
				}
			}
		}
		
		
		this._points = edger.build(scale*yc.settings.inner.hexgonSideLength*2) ;
		//log(this._points) ;
	}
//	
//	, draw: function(ctx){
//		
//		this._super(ctx) ;
//		
//		return ;
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
//		ctx.rotate(this.direction);					// 受力方向
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
//	}
	
	/**
	 * 碰撞
	 */
	, collide: function(entity,fixture,otherFixture){

		// 隐身状态，碰撞无效
		if( yc.settings.player.stealth )
		{
			return ;
		}
		
		// 病毒群 或 boss
		if(entity.constructor.className=='yc.outer.VirusCluster' || entity.constructor.className=='yc.outer.Boss' )
		{
			entity.touchingCell(this,fixture.GetUserData()) ;
		}
		// 氨基酸
		else if(entity.constructor.className=='yc.outer.AminoAcid')
		{
			entity.catchMe() ;
		}
		// 传送门
		else if(entity.constructor===yc.outer.Portal)
		{
			entity.touchingCell(this) ;
		}
	}

	, update: function(dt){
		this._super(dt) ;

		// 加速
		this.accelerating() ;

		ins(yc.util.DbgPannel).output['player'] = this.x.toFixed(1)+', '+this.y.toFixed(1) ;
	}

	, calculatePower: function(){

		this.power = yc.settings.outer.player.basePower ;
		yc.event.trigger(this,"calculatePower",[this]) ;
	}
	
	// , visit: function(ctx){
		
	// 	this._super(ctx) ;

	// 	// 加速
	// 	this.accelerating() ;
		
	// 	return ;
		
		
		
	// 	// 转向
	// 	if(this._turn)
	// 	{
	// 		this.incAngle( this._turn=='right'? 1: -1 ) ;
	// 	}
		
	// 	// 遇到污渍减速
	// 	yc.outer.Stain.downSpeed(this) ;
		
	// 	// 加速
	// 	this.accelerating() ;
		
	// 	// 移动
	// 	if(this.speed)
	// 	{
	// 		this.moving() ;
			
	// 		// 移动摄像机
	// 		ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
	// 	}
		
	// 	return this._super() ;
	// }
	, onFootprinter: function(){

		var speed = this.getSpeed() ;
		if( speed.x==0 && speed.y==0 )
		{
			return ;
		}

		var vector = {
			x: -speed.x
			, y: -speed.y
		}

		// 
		var innerVector = yc.util.ratateVector(vector,-this.getRotation()) ;
		var a = [0,0] ;
		var b = [ innerVector.x*500, innerVector.y*500 ] ;

		// 
		var longest = null
		var longestDis = 0 ;

		for( var i=0;i<this._points.length;i++ )
		{
			var c = this._points[i] ;
			var d = (i<this._points.length-1)? this._points[i+1]: this._points[0] ;

			var point = yc.util.segmentsIntr(a,b,c,d) ;
			if(!point)
			{
				continue ;
			}

			// 最远边界
			var dis = yc.util.pointsDis(0,0,point[0],point[1]) ;
			if( !longest || dis>longestDis )
			{
				longest = point ;
				longestDis = dis ;
			}
		}

		// 创建脚印
		if( longest )
		{
			// 旋转
			var vector = {x:longest[0],y:longest[1]} ;
			vector = yc.util.ratateVector(vector,this.getRotation()) ;

			var fp = yc.util.ObjectPool.ins(yc.outer.Footprint).ob() ;
			fp.init(this.x+vector.x,this.y+vector.y) ;
			ins(yc.outer.PlayerLayer).addChild(fp,-100) ;
		}
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
			this.direction = radian%(2*Math.PI) ;
		}
		
		this.speed = speed ;
	}

	, setRotation: function(r){

		this._super(r) ;

		if( Math.abs(this.rotationTarget-r) < 0.1 )
		{
			// 停止旋转
			this.b2Body.SetAngularVelocity(0) ;
		}
		else
		{
			// 设置角速度
			if( this.rotationTarget>r )
			{
				this.b2Body.SetAngularVelocity( this.rotationTarget-r>Math.PI? Math.PI*2: -Math.PI*2 ) ;
			}
			else
			{
				this.b2Body.SetAngularVelocity( r-this.rotationTarget >Math.PI? -Math.PI*2: Math.PI*2 ) ;
			}
		}
		
		// 
		var children = this.shell.buildings.getChildren() ;
		for(var i=0;i<children.length;i++)
		{
			children[i].setRotation( -r ) ;
		}

		var innerLayer = ins(yc.inner.InnerLayer);
		var i,j;
		for( i in innerLayer._children ){
			var child = innerLayer._children[i];
			
			if( child._children != undefined ){
				for( j in child._children ){
					var cch = child._children[j] ;
					cch.setRotation( -r );
				}
			}
		}
	}
});


