yc.ui.msgBox = cc.Layer.extend({
	attachedMenu : null
	, mainMenu : null
	, ctor: function(){

		this._super() ;
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
	, show : function(){
		this.attachedMenu.setVisible(true);
	}
	, hide : function(){
		this.attachedMenu.setVisible(false);
	}
}) ;
