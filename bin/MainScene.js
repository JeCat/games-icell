yc.MainScene = cc.Scene.extend({
	menuLogin : null
	, menuLevelSelect : null
	, actionShow : null
	, actionHide : null
	, ctor: function(){

		// 载入当前玩家角色信息 (应该有角色选择UI)
		yc.user.Character.loadCurrent('_me') ;

		
		this._super() ;

		this.h1 = cc.LabelTTF.create('I, Cell',  'Times New Roman', 32, cc.size(132,32), cc.TEXT_ALIGNMENT_CENTER);
		this.h2 = cc.LabelTTF.create('You are a cell under someone`s microscope ……',  'Times New Roman', 16, cc.size(416,16), cc.TEXT_ALIGNMENT_CENTER);

		this.addChild(this.h1);
		this.addChild(this.h2);

		this.actionShow = cc.FadeIn.create(0.8);
		this.actionHide = cc.FadeOut.create(0.8);

		var itemWeibo = cc.MenuItemImage.create( 'res/weibo_login.png' ,'res/weibo_login.png', this , function(){
			window.open('/service/sina_user/login.php');
        });
        itemWeibo.setScale(0.5);

        var itemTest = cc.MenuItemFont.create("test", this, function(){
        	loginCallback("0#test");
        	this.menuLevelSelect.setVisible(true);
        	this.menuLevelSelect.runAction(cc.Sequence.create(this.actionShow));
        	this.menuLogin.runAction(cc.Sequence.create(this.actionHide));
        	// this.menuLevelSelect.setVisible(true);
        	// this.menuLogin.setVisible(false);
        });
        itemTest.setFontSize(24);

        this.menuLogin = cc.Menu.create(itemWeibo, itemTest);
        this.menuLogin.alignItemsVertically();
        this.addChild(this.menuLogin);


        var itemStory = cc.MenuItemFont.create("故事模式", this, function(){
        	cc.Director.getInstance().replaceScene( new yc.levels.LevelSelector ) ;
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
        
        this.addChild(this.menuLevelSelect);
		this.menuLevelSelect.setVisible(false);

	}
	, onEnter: function(){

		yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;

		var screenSize = cc.Director.getInstance().getWinSize();
	    this.onResize(screenSize.width, screenSize.height);

		this._super() ;

		if( location!==undefined && yc.MainScene.autoLoadByUrl )
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
				// what fuck ... -_-!! --by kongyuan
			}

			// 只自动加载一次
			yc.MainScene.autoLoadByUrl = false ;
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

yc.MainScene.singleton = true ;
yc.MainScene.autoLoadByUrl = true ;