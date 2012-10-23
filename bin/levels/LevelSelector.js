yc.levels.LevelSelector = cc.Scene.extend({
	menuLogin : null
	, menuLevelSelect : null
	, actionShow : null
	, onEnter: function(){

		this.h1 = cc.LabelTTF.create('I, Cell',  'Times New Roman', 32, cc.size(132,32), cc.TEXT_ALIGNMENT_CENTER);
		this.h2 = cc.LabelTTF.create('You are a cell under someone`s microscope ……',  'Times New Roman', 16, cc.size(416,16), cc.TEXT_ALIGNMENT_CENTER);

		this.addChild(this.h1);
		this.addChild(this.h2);

		var itemWeibo = cc.MenuItemFont.create("weibo", this, function(){
			window.open('/service/sina_user/login.php');
        });
        itemWeibo.setFontSize(24);
        var itemTest = cc.MenuItemFont.create("test", this, function(){
        	loginCallback("0#test");
        	this.menuLevelSelect.setVisible(true);
        	this.menuLevelSelect.runAction(cc.Sequence.create(this.actionShow));
        	this.menuLogin.runAction(cc.Sequence.create(this.actionShow.reverse()));
        });
        itemTest.setFontSize(24);

        this.menuLogin = cc.Menu.create(itemWeibo, itemTest);
        this.menuLogin.alignItemsVertically();
        this.addChild(this.menuLogin);


        var itemStory = cc.MenuItemFont.create("故事模式", this, function(){
        	cc.Director.getInstance().replaceScene( new yc.levels.StorySelector ) ;
        });
        itemStory.setFontSize(20);
        var itemSearch = cc.MenuItemFont.create("探索模式", this, function(){
        	worldList();
        });
        itemSearch.setFontSize(20);
        var itemRand = cc.MenuItemFont.create("随机关卡", this, function(){
			cc.Director.getInstance().replaceScene( new yc.levels.FreeWorld );
        });
        itemRand.setFontSize(20);

        this.menuLevelSelect = cc.Menu.create(itemStory, itemSearch , itemRand);
        this.menuLevelSelect.alignItemsVertically();
        this.menuLevelSelect.setVisible(false);
        this.addChild(this.menuLevelSelect);

        this.actionShow = cc.FadeIn.create(1);
        // this.menuLevelSelect.runAction(cc.Sequence.create(actionShow, actionShow.reverse()));

		yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;

		var screenSize = cc.Director.getInstance().getWinSize();
	    this.onResize(screenSize.width, screenSize.height);

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

	, onExit : function(){
		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;
		this._super() ;
	}

	, onResize : function(w,h){
	    this.h1.setPosition(cc.p(w / 2, h /2 + 100 ));
	    this.h2.setPosition(cc.p(w / 2, h /2 + 70 ));
	    this.menuLogin.setPosition(cc.p(w / 2, h /2 ));
	    this.menuLevelSelect.setPosition(cc.p(w / 2, h /2 ));
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