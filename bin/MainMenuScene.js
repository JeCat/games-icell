
yc.MainMenuScene = cc.Scene.extend({
	
	ctor: function(){

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
	
	, _initZoomer: function(){
	}
	
	
	, onTouchesBegan: function(touches, event){
	}
	, onTouchesMoved: function(touches, event){
	}
	, onTouchesEnded:function (touches, event) {
	}
	
	, transform: yc.cocos2d.patchs.Node.transform
	
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
});