yc.levels.LevelSelector = cc.Scene.extend({
	menuLogin : null
	, menuLevelSelect : null
	, actionShow : null

	, onEnter: function(){

		var itemWeibo = cc.MenuItemFont.create("weibo", this, function(){
			window.open('/service/sina_user/login.php');
        });
        var itemTest = cc.MenuItemFont.create("TEST", this, function(){
        	loginCallback("0#test");
        	this.menuLevelSelect.setVisible(true);
        	this.menuLevelSelect.runAction(cc.Sequence.create(this.actionShow));
        	this.menuLogin.runAction(cc.Sequence.create(this.actionShow.reverse()));
        });

        this.menuLogin = cc.Menu.create(itemWeibo, itemTest);
        this.menuLogin.alignItemsVertically();
        this.addChild(this.menuLogin);


        var itemStory = cc.MenuItemFont.create("故事模式", this, function(){
        	cc.Director.getInstance().replaceScene( new yc.levels.StorySelector ) ;
        });
        var itemSearch = cc.MenuItemFont.create("探索模式", this, function(){
        	worldList();
        });
        var itemRand = cc.MenuItemFont.create("随机关卡", this, function(){
			cc.Director.getInstance().replaceScene( new yc.levels.FreeWorld );
        });

        this.menuLevelSelect = cc.Menu.create(itemStory, itemSearch , itemRand);
        this.menuLevelSelect.setVisible(false);
        this.menuLevelSelect.alignItemsVertically();
        this.addChild(this.menuLevelSelect);

        this.actionShow = cc.FadeIn.create(1);
        // this.menuLevelSelect.runAction(cc.Sequence.create(actionShow, actionShow.reverse()));

		this._super() ;

		if( location!==undefined && yc.levels.LevelSelector.autoLoadByUrl )
		{
			var url = parseUrl(location.toString()) ;

			// 自动加载内置关卡
			if( 'l' in url.anchorParams )
			{
				var level = eval('yc.levels.'+url.anchorParams.l) ;
				if( level!==undefined && level )
				{
					yc.levels.LevelSelector.enterLevel(level) ;
				}
			}

			// 自动加载玩家关卡
			if( 'cl' in url.anchorParams )
			{
				// todo by kongyuan ...
				// what fuck ... --by kongyuan
			}

			// 只自动加载一次
			yc.levels.LevelSelector.autoLoadByUrl = false ;
		}
	}

	, onExit: function(){
		$('#ui-levels-selector').hide() ;

		this._super() ;
	}

	
}) ;




yc.levels.LevelSelector.enterLevel = function(levelScript){
		
	cc.Director.getInstance().replaceScene(new (yc.GameScene.extend({
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
			if('onExit' in levelScript)
			{
				levelScript.onExit.apply(this) ;
			}
		}
	})));
}

yc.levels.LevelSelector.singleton = true ;
yc.levels.LevelSelector.autoLoadByUrl = true ;