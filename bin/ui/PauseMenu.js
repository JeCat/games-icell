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
	        this,
	        function (sender){
	        	if(!confirm('确定要放弃当前游戏，退回到主菜单吗？')) return ; 
	        	cc.Director.getInstance().replaceScene( ins(yc.levels.LevelSelector) );
	        }
	    );

	    var soundMenuItem = cc.MenuItemImage.create(
	        "res/btn-sound-on.png",
	        "res/btn-sound-off.png",
	        null,
	        this,
	        function (sender){
	        	
	        }
	    );

	    goBackToMainMenuItem.setPosition(cc.p( 20 , 20 ));
	    soundMenuItem.setPosition(cc.p( 60 , 20 ));
	    var attachedMenu = cc.Menu.create(goBackToMainMenuItem,soundMenuItem);

	    var screenSize = cc.Director.getInstance().getWinSize();
	    attachedMenu.setPosition(cc.p(screenSize.width - 120, screenSize.height - 40));

	    this.addChild(attachedMenu);
	    attachedMenu.setVisible(false);
	    this.attachedMenu = attachedMenu;

		var mainMenuItem = cc.MenuItemImage.create(
	        "res/btn-pause.png",
	        "res/btn-pause-1.png",
	        null,
	        this,
	        function (sender){
	        	var director = cc.Director.getInstance();
		        if(director.isPaused()){
		            director.resume();       //注意游戏暂停
		            this.hideMenus();		//注意游戏暂停
		        }else{
		        	this.showMenus();		//注意游戏暂停
		            director.pause();		//注意游戏暂停
		        }
	        }
	    );

	    mainMenuItem.setPosition(cc.p( 20 , 20 ));

	    var menu = cc.Menu.create(mainMenuItem);

	    menu.setPosition(cc.p(screenSize.width - 40, screenSize.height - 40));

	    this.addChild(menu);
	    this.mainMenu = menu;
	}
	, showMenus : function(){
		this.attachedMenu.setVisible(true);
	}
	, hideMenus : function(){
		this.attachedMenu.setVisible(false);
	}
}) ;
