
yc.GameScene = cc.Scene.extend({
	
	ctor: function(){
		
		this._super() ;

		// 场景的世界边界， null 表示不限
		this.lft = -50000 ;
		this.rgt = 50000 ;
		this.btm = -50000 ;
		this.top = 50000 ;
		// this.b2BodyLft = null ;
		// this.b2BodyRgt = null ;
		// this.b2BodyBtm = null ;
		// this.b2BodyTop = null ;

		this.scheduleUpdate();
	}

	, onEnter:function () {

		
		this._super();
		
		this.setAnchorPoint(cc.p(0,0)) ;
		
		this._initWorld() ;

		
		// 层：游戏
		this.layerGame = ins(yc.GameLayer) ;
		this.layerGame.setAnchorPoint(cc.p(0,0)) ;
		var wsize = cc.Director.getInstance().getWinSize() ;
		this.layerGame.setPosition(cc.p(wsize.width/2,wsize.height/2)) ;
		this.addChild(this.layerGame) ;

		// 层：远景
		this.layerPg = new yc.outer.pinups.LayerGround() ;
		this.layerPg.type = 'perspective' ;
		if(g_architecture=='html5')
		{
			this.layerGame.addChild(this.layerPg) ;
		}

		// 层：背景
		this.layerBg = new yc.outer.pinups.LayerGround() ;
		this.layerBg.type = 'background' ;
		if(g_architecture=='html5')
		{
			this.layerGame.addChild(this.layerBg) ;
		}
		
		// 层：污渍
		this.layerStains = new cc.Layer() ;
		this.layerStains.setAnchorPoint(cc.p(0,0)) ;
		this.layerGame.addChild(this.layerStains) ;
		
		// 层：显示其他角色
		this.layerRoles = new cc.Layer() ;
		this.layerRoles.setAnchorPoint(cc.p(0,0)) ;
		if(g_architecture=='html5')
		{
			this.layerGame.addChild(this.layerRoles) ;
		}

		// 层：显示玩家
		this.layerPlayer = ins(yc.outer.PlayerLayer);
		if(g_architecture=='html5')
		{
			this.layerGame.addChild(this.layerPlayer);
		}
		
		// 层：前景
		this.layerFg = new yc.outer.pinups.LayerGround() ;
		this.layerFg.type = 'foreground' ;
		if(g_architecture=='html5')
		{
			this.layerGame.addChild(this.layerFg) ;
		}

		// 层：ui
		if( g_architecture=='html5' )
		{ 
			this.layerUi = ins(yc.ui.UILayer) ;
			this.addChild(this.layerUi) ;
		}

		// 游戏显示比例缩放
		this._initZoomer() ;

		// 全局变量
		scene = this ;
		
		
		// border
		this._drawBorder();

		// $(window).trigger('yc.GameScene::onAfterInit',[]) ;


		if( g_architecture=='native' )
		{ 
			var s = new cc.Sprite() ;
			s.init() ;
			s.onDraw = function(){
				cc.test() ;
			}
			this.setPosition(cc.p(100,100)) ;
			this.addChild(s) ;
		}
	}

	, onExit: function(){
		// 解除所有 child 对象的引用，并出发这些 child的 onExit
		yc.util.dissolvedScene(this) ;
	}

	, _initWorld: function(){

		var screenSize = cc.Director.getInstance().getWinSize();
		//UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);

		// Construct a world object, which will hold and simulate the rigid bodies.
		world = this.world = new b2World(new b2Vec2(0, 0), true);
		this.world.SetContinuousPhysics(false);
		this.world.SetContactListener(new yc.outer.ContactListener) ;
		this.world.removingBodies = [] ;
		
		// 世界边界墙
		// this._createWalls() ;
		
		

		// b2DebugDraw ------
		// DebugDraw需要一个canvas实例，所以我们先创建b2DebugDraw实例，并设置相关参数
		if(g_architecture=='html5')
		{
			var debugDraw = new b2DebugDraw();
			var ctx = document.getElementById("debugCanvas").getContext("2d") ;
			debugDraw.SetSprite(ctx);
			debugDraw.SetDrawScale(PTM_RATIO/5);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit/*|b2DebugDraw.e_aabbBit|b2DebugDraw.e_pairBit|b2DebugDraw.e_centerOfMassBit*/);
			
			// 捆绑到物理世界实例
			this.world.SetDebugDraw(debugDraw) ;
		}
	}
	, reCreateWalls: function(){
		this._clearWalls() ;
		this._createWalls() ;
	}
	, _clearWalls: function(){
		var b2BodyNameList = ['b2BodyTop','b2BodyBtm','b2BodyLft','b2BodyRgt'];
		var i;
		for( i in b2BodyNameList ){
			var n = b2BodyNameList[i];
			
			var fixture = this[n].GetFixtureList() ;
			do{
				var nextFixture = fixture.GetNext() ;
				this[n].DestroyFixture(fixture) ;
			} while(fixture=nextFixture) ;
			
			this[n].GetWorld().removingBodies.push(this[n]) ;
			
			this[n] = null ;
		}
	}
	, _createWalls: function(){
		if( this.rgt===null || this.lft===null || this.top===null || this.btm===null )
		{
			return ;
		}
		
		if( this.rgt<this.lft )
		{
			throw new Error("world boundary rgt:"+this.rgt+" < lft"+this.btm) ;
		}
		if( this.top<this.btm )
		{
			throw new Error("world boundary top:"+this.top+" < btm:"+this.btm) ;
		}
		
		// 边界墙 ---------------
		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

		var bodyDef = new b2BodyDef;
		var w = this.rgt-this.lft, h = this.top-this.btm ;

		//create ground
		bodyDef.type = b2Body.b2_staticBody;
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(w/2/PTM_RATIO, 2);  // 墙要厚一点
		
		// top
		bodyDef.position.Set( (this.lft+(w/2))/PTM_RATIO, this.btm/PTM_RATIO-2);
		this._buildWall(fixDef,bodyDef,'b2BodyTop') ;
		
		// bottom
		bodyDef.position.Set((this.lft+(w/2))/PTM_RATIO, this.top/PTM_RATIO+2);
		this._buildWall(fixDef,bodyDef,'b2BodyBtm') ;

		fixDef.shape.SetAsBox(2,h/2/PTM_RATIO);
		// left
		bodyDef.position.Set(this.lft/PTM_RATIO-2,(this.btm+(h/2))/PTM_RATIO);
		this._buildWall(fixDef,bodyDef,'b2BodyLft') ;
		
		// right
		bodyDef.position.Set(this.rgt/PTM_RATIO+2,(this.btm+(h/2))/PTM_RATIO);
		this._buildWall(fixDef,bodyDef,'b2BodyRgt') ;
		
		
	}
		
		

	, _buildWall: function(fixDef,bodyDef,wall){
		if( this[wall] )
		{
		}
		else
		{
			this[wall] = this.world.CreateBody(bodyDef) ;
			this[wall].CreateFixture(fixDef) ;
		}
	}
	
	, _drawBorder: function(){
		if( this.rgt===null || this.lft===null || this.top===null || this.btm===null )
		{
			return ;
		}
		var border = cc.Sprite.extend({
			x: 0
			, y: 0
			, draw: function(ctx){
				if(g_architecture=='native')
				{
					this._super() ;
					return ;
				}

				this._super(ctx);
				
				ctx.strokeStyle = "rgba(0,0,255,1)" ;
				ctx.fillStyle = "rgba(0,0,255,1)" ;
				ctx.beginPath() ;
				
				ctx.moveTo(
					scene.lft
					, -scene.top
				);
				ctx.lineTo(
					scene.lft
					,-scene.btm
				);
				ctx.lineTo(
					scene.rgt
					,-scene.btm
				);
				ctx.lineTo(
					scene.rgt
					,-scene.top
				);
				ctx.closePath() ;
				ctx.stroke() ;
			}
			//, transform: yc.outer.Camera.transformSprite
		});
		this.layerGame.addChild( new border);
	}
	, _initZoomer: function(){
	}

	// , testWorldBoard: function(x,y) {
	// 	if( this.lft!==null && x<this.lft )
	// 	{
	// 		x = this.lft ;
	// 	}
	// 	if( this.rgt!==null && x>this.rgt )
	// 	{
	// 		x = this.rgt ;
	// 	}
	// 	if( this.btm!==null && y<this.btm )
	// 	{
	// 		y = this.btm ;
	// 	}
	// 	if( this.top!==null && y>this.top )
	// 	{
	// 		y = this.top ;
	// 	}
	// 	return [x,y] ;
	// }
	
	, onTouchesBegan: function(touches, event){
		log('onTouchesBegan') ;
	}
	, onTouchesMoved: function(touches, event){
	}
	, onTouchesEnded:function (touches, event) {
	}
	
	//, transform: yc.cocos2d.patchs.Node.transform
	
	, randomCreateEntities: function(entityClass,num,layer){

		var range = {
			left: this.lft
			, right: this.rgt
			, top: this.top
			, bottom: this.btm
		} ;
		range.width = Math.abs(range.right - range.left) ;
		range.height = Math.abs(range.top - range.bottom) ;
		
		for(var i=0;i<num;i++)
		{
			var aRole = new entityClass ;
			aRole.initRandom(range) ;
			layer.addChild(aRole) ;
		}
	}
	
	, update: function(dt){

		var velocityIterations = 8;
		var positionIterations = 1;

		for(var i=0; i<this.world.removingBodies.length;i++)
		{
			var body = this.world.removingBodies[i] ;
			this.world.DestroyBody(body) ;
			yc.util.arr.remove(this.world.removingBodies,body) ;
		}
		
		this.world.Step(dt, velocityIterations, positionIterations);
		
		if(yc.settings.outer.box2d.dbg)
		{
			this.world.DrawDebugData() ;
		}
	}
	
	/**
	 * 将当前场景的设置导出成json脚本
	 */
	, exportScript: function(){

		var level = 0;
		if(yc.GameScene._level){
			level = yc.GameScene._level;
		}
		// 世界 -------
		var script = {
			world: {
				// 世界的边界（null表示不设限制）
				boundary: {
					lft: this.lft
					, rgt: this.rgt
					, top: this.top
					, btm: this.btm
				}
			},
			camera: {
				maxZoom: $('#maxZoom').val()
				, minZoom: $('#minZoom').val()
			},
			id:level,
		} ;

		// 污渍 ----------
		script.stains = [] ;
		var stains = this.layerStains.getChildren() ;
		for(var i=0;i<stains.length;i++)
		{
			script.stains.push( stains[i].exportScript() ) ;
		}

		// 角色：病毒群、boss、氨基酸
		script.aminoacids = [] ;
		script.virusclusters = [] ;
		var roles = this.layerRoles.getChildren() ;
		for(var i=0;i<roles.length;i++)
		{
			switch(roles[i].constructor)
			{
				case yc.outer.AminoAcid :
					script.aminoacids.push( roles[i].exportScript() ) ;
					break ;

				case yc.outer.VirusCluster :
					script.virusclusters.push( roles[i].exportScript() ) ;
					break ;
			}
		}

		// 贴图
		script.pinups = {} ;
		script.pinups.foreground = this.layerFg._script ;	// 导出 前景层 上的贴图
		script.pinups.background = this.layerBg._script ;	// 导出 背景层 上的贴图
		script.pinups.perspective = this.layerPg._script ;	// 导出 远景层 上的贴图
		
		// cell
		// script.cell = ins(yc.inner.Cell).exportScript();


		// 资源加载
		// todo


		return script ;
	}
	
	/**
	 * 通过一个json脚本来加载关卡
	 */
	, initWithScript: function(script){
		
		// selection world -----------
		if( 'world' in script && 'boundary' in script.world )
		{
			this.lft = this.rgt = this.top = this.btm = null ;
			for(var wall in script.world.boundary)
			{
				this[wall] = script.world.boundary[wall] ;
			}
			this._createWalls() ;

		// 	this.layerGlassSlide.setContentSize(cc.size(this.rgt-this.lft,this.top-this.btm)) ;
		// 	this.layerGlassSlide.x = this.lft ;
		// 	this.layerGlassSlide.y = this.btm ;
		}
		
		
		// selection aminoacids, virusclusters, stains -----------
		// 创建外部场景中的 氨基酸、 病毒群 和 污渍
		var selections = {
				aminoacids: yc.outer.AminoAcid
				, virusclusters: yc.outer.VirusCluster
				, stains: yc.outer.Stain
		} ;
		for(var key in selections)
		{
			var className = selections[key] ;
			
			if( key in script )
			{
				for(var i=0;i<script[key].length;i++)
				{
					var ins = new className ;
					ins.initWithScript(script[key][i]) ;
					if(className===yc.outer.Stain)
					{
						this.layerStains.addChild(ins) ;
					}
					else
					{
						this.layerRoles.addChild(ins) ;
					}
				}
			}
		}
		

		// 贴图（远景层、背景层、前景层） -----------
		if( 'pinups' in script )
		{
			if('perspective' in script.pinups)
			{
				this.layerPg.initWithScript(script.pinups.perspective) ;
			}
			if('background' in script.pinups)
			{
				this.layerBg.initWithScript(script.pinups.background) ;
			}
			if('foreground' in script.pinups)
			{
				this.layerFg.initWithScript(script.pinups.foreground) ;
			}
		}
		
		// cell
		// if( 'cell' in script ){
		// 	var innerCell = yc.util.ins(yc.inner.InnerLayer).cell ;
		// 	innerCell.destory() ;
		// 	innerCell.initWithScript(script.cell);
		// }
	}

	, test: function(){

		var spriteFrameCache = cc.SpriteFrameCache.getInstance();

        spriteFrameCache.addSpriteFrames("res/bandit.plist","res/bandit.png");

        //
        // Animation using Sprite BatchNode
        //
        this._sprite1 = new cc.Sprite();
        this._sprite1.setPosition(cc.p(300,300)) ;

        var spritebatch = cc.SpriteBatchNode.create("res/bandit.png");
        spritebatch.addChild(this._sprite1);
        this.addChild(spritebatch);

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i <= 8; i++) {
            str = "bandit_" + i + ".png";
            frame = spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.15);
        this._sprite1.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
	}
	
	// 关卡脚本的标准格式：
	, scriptDemo: {
		world: {
			// 世界的边界（null表示不设限制）
			boundary: {
				lft: -3000
				, rgt: 3000
				, top: -3000
				, btm: 3000
			}
		}
	
		// 玩家的初始属性
		, player: {
			
			// 起始位置
			x: 0
			,y: 0
			
			, cell: {
			
				// 内部场景中细胞核所在格子的坐标
				nucleus: {
					x: 0
					, y: 0
				}
			
				// 细胞质格子
				, cytoplasms: [
					{ x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
				]
			
				// 细胞膜格子
				, membranes: [
					{ x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
					, { x: 6 , y: 6 }
				]
			}

			// 氨基酸池
			, aminoacidpool: {
				red: 0
				, blue: 0
				, yellow: 0
			}
			
			// 蛋白质池
			, proteinpool: {
				red: 0
				, blue: 0
				, yellow: 0
			}
			
			// 蛋白质公式
			// todo ...
		}
		
		// 氨基酸
		, aminoacids: [
			{
				x: 400
				, y: 400
				, num: 10
				, type: 'red' // red, blue, yellow
			}
			, {
				x: -150
				, y: -150
				, num: 15
				, type: 'yellow' // red, blue, yellow
			}
			, {
				x: 350
				, y: 350
				, num: 5
				, type: 'blue' // red, blue, yellow
			}
		]
		
		// 病毒群
		, virusclusters: [
		  	{
		  		x: 300
		  		, y: 300
		  		, lv: 1					// 病毒等级
		  		, turnRate: 0.04		// 转向灵敏度
		  		, moseySpeed: 2			// 漫步速度
		  		, normalSpeed: 5		// 正常速度
		  		, vigilanceRange: 200	// 警视范围
		  		, viruses: [
		  			{
						file: 'res/virus16.png'
						, wait: 1
						, speed: 15
						, hp: 10
					}
		  			, {
						file: 'res/virus16.png'
						, wait: 1
						, speed: 15
						, hp: 10
					}
		  		]
		  		, boss: false 			// 是否是一个boss
		  		, dna: []				// 击杀后掉落的 dna
		  	}
		]
		
		// 污渍
		, stains: [
			{
				x: 150
				, y: 150
				, linearDampingMultiple: 2		// 线速度阻尼倍数(相对质量)
				, angularDampingMultiple: 4		// 角速度阻尼倍数(相对质量)
				, bodyType: b2Body.b2_dynamicBody
				, shapes:[
					{
						type: 'polygon'					// 类型 circle, polygon
						, density: 0.5					// 密度
						, friction: 1					// 摩擦力
						, restitution: 1				// 弹性
						, color: "150,150,150"			// 颜色
						, borderColor: "80,80,80"		// 边界颜色
						// 多边形的顶点
						, points: [ [-50,50], [-60,-75], [23,-55], [23,65] ]
						, text: null
						, textStyle: "normal 16px san-serif"
						, textColor: "0,0,0,1"
						, img: null
					}
					, {
						type: 'polygon'			// 类型 circle, polygon
						, density: 0.5			// 密度
						, friction: 1			// 摩擦力
						, restitution: 1		// 弹性
						// 多边形的顶点
						, points: [ [-150,20], [-40,-25], [33,-25] ]
						, text: null
						, textStyle: "normal 16px san-serif"
						, textColor: "0,0,0,1"
						, img: null
					}
				]
			}
		]

		// 背景和前景 贴图
		, pinups: {
			background: [
				{
					layer: 'background'
					, x: 10
					, y: 30
					, anchorX: 0.5
					, anchorY: 0.5
					, rotation: 0
					, opacity: 255
					, scaleX: 1
					, scaleY: 1
					, text: null
					, textStyle: "normal 16px san-serif"
					, textColor: "0,0,0,1"
					, img: "res/null-pinup.png"
					, tile: false
					, tileWidth: null 
					, tileHeight: null
					, mosey: false
					, moseySpeed: 5
				}
				,{
					layer: 'background'
					, x: 10
					, y: 30
					, anchorX: 0.5
					, anchorY: 0.5
					, rotation: 0
					, opacity: 255
					, scaleX: 1
					, scaleY: 1
					, text: null
					, textStyle: "normal 16px san-serif"
					, textColor: "0,0,0,1"
					, img: "res/null-pinup.png"
					, tile: false
					, tileWidth: null 
					, tileHeight: null
					, mosey: false
					, moseySpeed: 5
				}
			]
		}

		// 资源加载
		, res: [
		    {type:"plist", src:"res/animations/bandit.plist"}
		    , {type:"image", src:"res/animations/bandit.png"}
		]
	}
});
