yc.MainScene = cc.Scene.extend({
	menuLogin : null
	, menuLevelSelect : null
	, ctor: function(){

		this._super() ;

		var screenSize = cc.Director.getInstance().getWinSize();

		//background
		this.background = cc.Sprite.create("res/mainscene/background.jpg");
		this.addChild(this.background , -1);
		this.background.setAnchorPoint(cc.p(0,0));
		this.background.setScale(1.1);

		this.pao = cc.Sprite.create("res/mainscene/pao.png");
		this.addChild(this.pao , 1);

		this.h1 = cc.Sprite.create("res/mainscene/logo.png");
		this.addChild(this.h1 ,5 );
		this.line = cc.Sprite.create("res/mainscene/line.png");
		this.addChild(this.line , 4);

		this.electricity = cc.Sprite.create("res/mainscene/electricity.png");
		this.addChild(this.electricity , 2);

		this.login_bg = cc.Sprite.create("res/mainscene/login_bg.png");
		this.addChild(this.login_bg , 3);


		this.itemWeibo = cc.MenuItemImage.create( 'res/mainscene/sina.png' ,'res/mainscene/sina1.png' , function(){
			var thisb = this;
			ins(yc.oauth.weibo).login(function(o){
				var username = o.id + '#' + o.service;
				loginCallback(username);
				yc.user.Character.loadCurrent( username) ;

				thisb.menuLevelSelect.setVisible(true);
				thisb.menuLevelSelect.runAction(cc.FadeIn.create(0.8));
				thisb.menuLogin.runAction(cc.FadeOut.create(0.8));
				thisb.login_bg.runAction(cc.FadeOut.create(0.8));
			});
        }, this);

        this.itemTest = cc.MenuItemImage.create("res/mainscene/test.png","res/mainscene/test1.png" , function(){

        	if(typeof loginCallback!='undefined')
        	{
				yc.user.Character.loadCurrent('_me') ;
        	}
        	loginCallback('0#test');
        	this.menuLevelSelect.setVisible(true);
        	this.menuLevelSelect.runAction(cc.FadeIn.create(0.8));
        	this.menuLogin.runAction(cc.FadeOut.create(0.8));
        	this.login_bg.runAction(cc.FadeOut.create(0.8));
        }, this);

        this.menuLogin = cc.Menu.create(this.itemWeibo, this.itemTest);
        this.menuLogin.alignItemsVertically();
        this.addChild(this.menuLogin , 4);


        this.itemStory = cc.MenuItemImage.create("res/mainscene/story.png","res/mainscene/story1.png", function(){
        	cc.Director.getInstance().replaceScene( new yc.levels.LevelSelector ) ;
        }, this);
        this.itemSearch = cc.MenuItemImage.create("res/mainscene/world.png","res/mainscene/world1.png", function(){
        	worldList();
        }, this);
        this.itemRand = cc.MenuItemImage.create("res/mainscene/freeworld.png","res/mainscene/freeworld1.png", function(){
			cc.Director.getInstance().replaceScene( new yc.levels.FreeWorld );
        }, this);

        this.menuLevelSelect = cc.Menu.create(this.itemStory, this.itemSearch , this.itemRand);
        this.menuLevelSelect.alignItemsVertically();
        
        this.addChild(this.menuLevelSelect , 4);
		this.menuLevelSelect.setVisible(false);

	}
	, onEnter: function(){

		yc.event.register( ins(yc.outer.Camera), "resize", this.onResize, this ) ;

		var screenSize = cc.Director.getInstance().getWinSize();
	    this.onResize(screenSize.width, screenSize.height);

		this._super() ;

		if( g_architecture=='html5' && yc.MainScene.autoLoadByUrl )
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
				// what hell ... -_-!! --by kongyuan
			}

			// 只自动加载一次
			yc.MainScene.autoLoadByUrl = false ;
		}
		else if(yc.CURRENT_LEVEL)
		{
			yc.levels.LevelSelector.enterLevel( yc.CURRENT_LEVEL ) ;
		}else{
			return;
		}
	}

	, onExit : function(){
		yc.event.unregister( ins(yc.outer.Camera), "resize", this.onResize ) ;

		this._super() ;
	}

	, onResize : function(w,h){

		this.pao.setPosition(cc.p(w / 2 -20, h /2 + 400 ));
	    this.h1.setPosition(cc.p(w / 2 -20, h /2 + 200 ));
	    this.line.setPosition(cc.p(w / 2 -20, h /2 -10 ));
	    this.electricity.setPosition(cc.p(w / 2 -20 , h /2 -60 ));
	    this.login_bg.setPosition(cc.p(w / 2 , h /2 -60 ));

	    this.itemWeibo.setPosition(cc.p( 0 , 0 ));
	    this.itemTest.setPosition(cc.p(0 , -60 ));

	    this.itemStory.setPosition(cc.p(0 , 20 ));
	    this.itemSearch.setPosition(cc.p(0 , -60 ));
	    this.itemRand.setPosition(cc.p(0 , -140 ));

	    this.menuLogin.setPosition(cc.p(w / 2, h /2 ));
	    this.menuLevelSelect.setPosition(cc.p(w / 2, h /2 ));
	}
}) ;

yc.MainScene.singleton = true ;
yc.MainScene.autoLoadByUrl = true ;