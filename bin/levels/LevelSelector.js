yc.levels.LevelSelector = cc.Scene.extend({
	ctor: function(){
		this._super() ;
	}

	, onEnter: function(){
		this._super() ;

		// 章节
		this.setting = yc.settings.buildin_chapter_levels["c1"] ;

		this.layerMap = new yc.levels.LevelSelector.MapLayer(this.setting) ;
		this.addChild(this.layerMap) ;
		
		
		//返回
		var layerUi = cc.Layer.extend({
			ctor: function(){
				this._super() ;

				var button = cc.MenuItemImage.create(
			        "res/btn-back.png",
			        "res/btn-back-1.png",
			        function(){
			        	cc.Director.getInstance().replaceScene( ins(yc.MainScene) );
		        		cc.Director.getInstance().resume()
		        		this.removeFromParent(true);
			        },
			        this
			    );

			    this.menu = cc.Menu.create(button);
				this.addChild(this.menu);

			    var screenSize = cc.Director.getInstance().getWinSize();
			    this.onResize(screenSize.width, screenSize.height);
			}
			, onEnter : function(){
				yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;
				this._super() ;
			}
	
			, onExit : function(){
				yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;
				this._super() ;
			}
			, onResize : function(w,h){
			    this.menu.setPosition(cc.p(w - 20, h - 20));
			}
		}) ;
		this.addChild(new layerUi) ;
	}

	, onExit: function(){
		this._super() ;
	}
	
}) ;




yc.levels.LevelSelector.MapLayer = cc.Layer.extend({
	
	ctor: function(setting){
		this._super() ;
		this.setting = setting ;

		this.dragable = false ;
		this.dragFrom = null ;

		this.map = new cc.Sprite() ;
		this.map.initWithFile(this.setting.levelsMapImg) ;
		this.map.setAnchorPoint(cc.p(0,0)) ;
		this.addChild(this.map) ;

		// 层的尺寸和地图一致
		this.setContentSize( this.map.getContentSize() )


		// 关卡
		for( var k in this.setting.levels)
		{
			var level = new yc.levels.LevelSelector.MapLayer.Level() ;
			level.init(this.setting.levels[k]) ;
			this.addChild(level) ;
		}

		// 点击事件
		this.setTouchEnabled(true);
	}
	, onTouchesBegan: function(touches, event){
		this.dragable = true ;
		// log(yc.util.windowToClient(this,touches[0]._point.x,touches[0]._point.y)) ;

		var children = this.getChildren() ;
		for(var i=0;i<children.length;i++)
		{
			if( children[i].constructor === yc.levels.LevelSelector.MapLayer.Level )
			{
				// 测试点击
				if( children[i].flag.hittest(touches[0]) )
				{
					// 传递点击事件
					children[i].flag.onTouchBegan(touches[0]) ;
				}
			}
		}
	}
	, onTouchesMoved: function(touches, event) {

		if(!this.dragable)
		{
			return ;
		}

		var point = touches[0].getLocation() ;

		// move
		if(this.dragFrom)
		{
			var pos = this.getPosition() ;
			pos.x+= point.x - this.dragFrom.x ;
			pos.y+= point.y - this.dragFrom.y ;


			var mysize = this.getContentSize() ;
			var wsize = cc.Director.getInstance().getWinSize() ;

			if( pos.x > 0 )
			{
				pos.x = 0 ;
			}
			else if( pos.x < wsize.width-mysize.width )
			{
				pos.x = wsize.width-mysize.width ;
			}

			if( pos.y > 0 )
			{
				pos.y = 0 ;
			}
			else if( pos.y < wsize.height-mysize.height )
			{
				pos.y = wsize.height-mysize.height ;
			}

			this.setPosition(pos) ;
		}

		this.dragFrom = point ;
	}
	, onTouchesEnded: function(touches, event){
		this.dragable = false ;
		this.dragFrom = null ;


		var children = this.getChildren() ;
		for(var i=0;i<children.length;i++)
		{
			if( children[i].constructor === yc.levels.LevelSelector.MapLayer.Level )
			{
				// 测试点击
				if( children[i].flag.hittest(touches[0]) )
				{
					// 传递点击事件
					children[i].flag.onTouchEnded(touches[0]) ;
				}
			}
		}
	}
}) ;


yc.levels.LevelSelector.MapLayer.Level = cc.Sprite.extend({
	init: function(setting){

		this._super() ;

		this.setting = setting ;

		this.setPosition(cc.p(setting.x,setting.y)) ;

		// 旗帜
		this.flag = new yc.levels.LevelSelector.MapLayer.LevelFlag(eval(this.setting.script)) ;
		this.addChild(this.flag) ;

		// 关卡奖励
		this._createGeneIcons() ;
		
		// star
		this._createStarIcons();
	}

	, _createStarIcons: function(){

		var script = eval(this.setting.script) ;
		var ucLevels = ins(yc.user.Character).levels;
		var levelsID = script.id;
		
		if( typeof(ucLevels[levelsID]) == "object" && ucLevels[levelsID].star != undefined)
		{
			var posx = -((ucLevels[levelsID].star-1) * 34)/2  ;
			for(var i=0; i<ucLevels[levelsID].star; i++){
	
					var geneIcon = new cc.Sprite() ;
					geneIcon.initWithFile("res/star2.png") ;
					
					geneIcon.setPosition(cc.p(posx,60)) ;
					this.addChild(geneIcon) ;
					posx+= 34  ;
			}
		}
	}
	, _createGeneIcons: function(){

		var genes = [] ;
		var script = eval(this.setting.script) ;
		if ( ("virusclusters" in script) && script.virusclusters.length )
		{
			for(var i=0;i<script.virusclusters.length;i++){
				var vc = script.virusclusters[i] ;
				if( ("dna" in vc) && vc.dna.length )
				{
					// 找到奖励
					yc.util.arr.merge(genes,vc.dna) ;
				}
			}
		}

		if( !genes.length )
		{
			return ;
		}
		
		var totalWith = genes.length*16 + 4 * (genes.length-1) ;
		var posx = -totalWith/2 ;

		var ucLevels = ins(yc.user.Character).levels;
		var levelsID = script.id;
		
		
		for(var i=0; i<genes.length; i++){

			if( !(genes[i] in yc.dna.genes) )
			{
				continue ;
			}

			var gene = yc.dna.genes[ genes[i] ] ;

			if(typeof(gene.icon) == "object"){
				
				var geneIcon = new cc.Sprite() ;
				
				var iconType = gene.icon.grayRect;
				if( typeof(ucLevels[levelsID]) == "object" && ucLevels[levelsID].gene == gene.name)
				{
					iconType = gene.icon.rect ;
				}
				geneIcon.initWithFile("res/dna-icons-32.png",cc.rect.apply(this,iconType)) ;
				
				geneIcon.setPosition(cc.p(posx,-50)) ;
				geneIcon.setAnchorPoint(cc.p(0,0)) ;
				this.addChild(geneIcon) ;
			}else{
				log("缺少dna 图片");
			}
			

			posx+= 32 + 4 ;
		}
	}
})

yc.levels.LevelSelector.MapLayer.LevelFlag = cc.Sprite.extend({

	ctor: function(level){
		this._super() ;
		this.initWithFile("res/level-flag-normal.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;
		this.level = level ;
	}

	, onEnter: function(){
		this._super() ;
        //cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
	}
	, onExit: function(){
		this._super() ;
        //cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
	}

	// 测试是否点击到旗帜上 以及点击是否有效
	, hittest: function(touch){

		var ucLevels = ins(yc.user.Character).levels;
		var levelsID = this.level.id;
    	if( typeof(ucLevels[levelsID]) != "object" || ucLevels[levelsID].unlock != true)
		{
    		return false ;
		}

		var point = touch.getLocation() ;

		// 从屏幕坐标 转换到旗帜对象上的坐标
		point = yc.util.windowToClient(this,point.x,point.y) ;

    	if( point[0]<-14 || point[0]>14 )
    	{
    		return false ;
    	}
    	if( point[1]<-10 || point[1]>47 )
    	{
    		return false ;
    	}

    	return true ;
	}

    , onTouchBegan:function () {
    	
		this.initWithFile("res/level-flag-flash.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;

		return true ;
    }
    , onTouchMoved:function(touch) {}
    , onTouchEnded:function (touch) {
		this.initWithFile("res/level-flag-normal.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;

		// 前往对应关卡
		yc.levels.LevelSelector.enterLevel( eval(this.level) ) ;
    }

})





yc.levels.LevelSelector.enterLevel = function(levelScript){
		
	yc.GameScene._level = levelScript.id;
	yc.GameScene.camera = levelScript.camera;
	
	var level = new (yc.GameScene.extend({
		onEnter: function(){
			this._super() ;

			// 加载关卡脚本
			this.initWithScript(levelScript) ;

			// 
			if('onEnter' in levelScript)
			{
				levelScript.onEnter.apply(this) ;
			}
		}

		, onExit: function(){
			this._super() ;

			if('onExit' in levelScript)
			{
				levelScript.onExit.apply(this) ;
			}
		}
	})) ;

	// 预加载
	if( ('res' in levelScript) && levelScript.res.length>0 )
	{
		//cc.LoaderScene._instance = new yc.levels.ResourceLoadingScene() ;

		var loader = cc.Loader.getInstance() ;

		loader.onload = function(){
			// 资源加载完毕，切换场景
			cc.Director.getInstance().replaceScene(level);
		}
		loader.onloading = function(){
			// nothing todo ……
		}

		// 切换道资源loading 场景
		cc.Director.getInstance().replaceScene(new yc.levels.ResourceLoadingScene(loader) );

		// 加载资源
		loader.loadedResourceCount = 0 ;
		loader.preload(levelScript.res) ;
		loader.resourceCount = levelScript.res.length ;
	}

	// 
	else
	{
		// 直接切换场景，不需要等待 资源加载完成 
		cc.Director.getInstance().replaceScene(level);
	}
	

	// 瓶子
	yc.outer.Bottles.all(levelScript.id);
}
