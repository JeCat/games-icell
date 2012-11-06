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
	}

	, onExit: function(){
		this._super() ;
	}
	
}) ;



yc.levels.LevelSelector.enterLevel = function(levelScript){
		
	yc.GameScene._level = levelScript.id;
	
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


yc.levels.LevelSelector.MapLayer = cc.Layer.extend({
	
	ctor: function(setting){
		this._super() ;
		this.setting = setting ;

		this.dragable = false ;
		this.dragFrom = null ;

		this.map = new cc.Sprite() ;
		this.map.initWithFile(this.setting.levelsMapImg) ;
		this.map.setAnchorPoint(0,0) ;
		this.addChild(this.map) ;

		// 层的尺寸和地图一致
		this.setContentSize( this.map.getContentSize() )

		// 关卡
		for( var k in this.setting.levels)
		{
			var level = new yc.levels.LevelSelector.MapLayer.Level(this.setting.levels[k]) ;
			this.addChild(level) ;
		}

		// 点击事件
		this.setTouchEnabled(true);
	}
	, onTouchesBegan: function(touches, event){
		this.dragable = true ;

		log(yc.util.windowToClient(this,touches[0]._point.x,touches[0]._point.y)) ;
	}
	, onTouchesMoved: function(touches, event) {

		if(!this.dragable)
		{
			return ;
		}

		// move
		if(this.dragFrom)
		{
			var pos = this.getPosition() ;
			pos.x+= touches[0]._point.x - this.dragFrom._point.x ;
			pos.y+= touches[0]._point.y - this.dragFrom._point.y ;


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

		this.dragFrom = touches[0] ;
	}
	, onTouchesEnded: function(touches, event){
		this.dragable = false ;
		this.dragFrom = null ;
	}
}) ;


yc.levels.LevelSelector.MapLayer.Level = cc.Sprite.extend({
	ctor: function(setting){

		this._super() ;

		this.setting = setting ;

		this.setPosition(cc.p(setting.x,setting.y)) ;

		// 旗帜
		this.flag = new yc.levels.LevelSelector.MapLayer.LevelFlag( eval(this.setting.script) ) ;
		this.addChild(this.flag) ;

		// 关卡奖励
		this._createGeneIcons() ;
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

		for(var i=0; i<genes.length; i++){

			if( !(genes[i] in yc.dna.genes) )
			{
				continue ;
			}

			var gene = yc.dna.genes[ genes[i] ] ;

			if(typeof(gene.icon) == "object"){
				var geneIcon = new cc.Sprite() ;
				geneIcon.initWithFile("res/dna-icons-32.png",cc.rect.apply(this,gene.icon.rect)) ;
				geneIcon.setPosition(cc.p(posx,60)) ;
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
		this.level = level ;

		this.initWithFile("res/level-flag-normal.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;
	}

	, onEnter: function(){
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
	}
	, onExit: function(){
        cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
	}


    , onTouchBegan:function (touch, event) {
    	var p = yc.util.windowToClient(this,touch._point.x,touch._point.y) ;
    	//log(p)

    	if( p[0]<-14 || p[0]>14 )
    	{
    		return false ;
    	}
    	if( p[1]<-10 || p[1]>47 )
    	{
    		return false ;
    	}

    	log("began",touch,p) ;
		this.initWithFile("res/level-flag-flash.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;

		return true ;
    }
    , onTouchMoved:function(touch, event) {}
    , onTouchEnded:function (touch, event) {
		this.initWithFile("res/level-flag-normal.png") ;
		this.setAnchorPoint(cc.p(0.5,0.23)) ;

		// 前往对应关卡
		yc.levels.LevelSelector.enterLevel( eval(this.level) ) ;
    }

    , draw: function(ctx){
    	this._super(ctx) ;
    	// yc.util.drawCircle(ctx,0,0,3,3,"red") ;
    }

})

