//主菜单按钮(屏幕右上角)
yc.ui.PauseMenu = cc.Layer.extend({
	attachedMenu : null
	, mainMenu : null
	, ctor: function(){

		this._super() ;

		var goBackToMainMenuItem = cc.MenuItemImage.create(
	        "res/btn-back.png",
	        "res/btn-back-1.png",
	        null,
	        function (sender){
	        	var msgBox = new ( yc.ui.MsgBox.extend({
	        		YesBtnCallBack : function(){
	        			
	        			var level = yc.GameScene._level;
	        			var patrn=/^[0-9]*$/;  
	        			if (patrn.exec(level)) 
        				{
	        				$("#editor-panel-space").hide() ;
			        		cc.Director.getInstance().replaceScene( new cc.Scene() );
			        		worldList();
        				}else{
        					cc.Director.getInstance().replaceScene( ins(yc.levels.LevelSelector) );
        				}
	        	
		        		cc.Director.getInstance().resume()
		        		this.removeFromParent(true);
		        		
		        	}
	        	}) );

	        	msgBox.setText('确定要放弃当前游戏，退回到关卡选择吗？');
				scene.layerUi.addChild(msgBox) ;
	        },this
	    );

		var goBackToMain = cc.MenuItemImage.create(
	        "res/btn-main.png",
	        "res/btn-main-1.png",
	        null,
	        function (sender){
	        	var msgBox = new ( yc.ui.MsgBox.extend({
	        		YesBtnCallBack : function(){
		        		
	        			var level = yc.GameScene._level;
	        			var patrn=/^[0-9]*$/;  
	        			if (patrn.exec(level)) 
        				{
	        				$("#editor-panel-space").width(0) ;
	        				$("#editor-panel-space").hide() ;
        				}
        				yc.CURRENT_LEVEL = null;  //防止跳转到最近玩的关卡
	        			cc.Director.getInstance().replaceScene( ins(yc.MainScene) );
		        		cc.Director.getInstance().resume();
		        		this.removeFromParent(true);
		        	}
	        	}) );

	        	msgBox.setText('确定要放弃当前游戏，退回到主菜单吗？');
				scene.layerUi.addChild(msgBox) ;
	        },this
	    );

	    var soundMenuItem = cc.MenuItemImage.create(
	        "res/btn-sound-on.png",
	        "res/btn-sound-off.png",
	        null,
	        function (sender){
	        	
	        },this
	    );

	    goBackToMainMenuItem.setPosition(cc.p( 20 , 20 ));
	    goBackToMain.setPosition(cc.p( 60 , 20 ));
	    soundMenuItem.setPosition(cc.p( 100 , 20 ));
	    this.attachedMenu = cc.Menu.create(goBackToMainMenuItem,goBackToMain,soundMenuItem);

	    this.addChild(this.attachedMenu);
	    this.attachedMenu.setVisible(false);

		var mainMenuItem = cc.MenuItemImage.create(
	        "res/btn-pause.png",
	        "res/btn-pause-1.png",
	        null,
	        function (sender){
	        	var director = cc.Director.getInstance();
		        if(director.isPaused()){
		            director.resume();       //注意游戏暂停
		            this.hideMenus();		//注意游戏暂停
		        }else{
		        	this.showMenus();		//注意游戏暂停
		            director.pause();		//注意游戏暂停
		        }
	        },this
	    );

	    mainMenuItem.setPosition(cc.p( 20 , 20 ));

	    this.mainMenu = cc.Menu.create(mainMenuItem);

	    this.addChild(this.mainMenu);

	    var screenSize = cc.Director.getInstance().getWinSize();
	    this.onResize(screenSize.width, screenSize.height);

	}
	, showMenus : function(){
		this.attachedMenu.setVisible(true);
	}
	, hideMenus : function(){
		this.attachedMenu.setVisible(false);
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
	    this.attachedMenu.setPosition(cc.p(w - 160, h - 40));
	    this.mainMenu.setPosition(cc.p(w - 40, h - 40));
	}
}) ;
