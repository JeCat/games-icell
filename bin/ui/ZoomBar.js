//缩放
yc.ui.ZoomBar = cc.Layer.extend({
	barMinWidth : 0
	, barMaxHeight : 0
	, barMinHeight : 0
	, prevTouchMoveY : 0
	, pxToScaleBy : 0.5
	, ctor: function(){
		this._super() ;
	}
	, onTouchBegan:function (touch, event) {

		var screenSize = cc.Director.getInstance().getWinSize();

		this.barMinWidth = screenSize.width - 80;
		var barHeight = screenSize.height * 0.7;
		this.barMinHeight = ( screenSize.height - barHeight ) / 2
		this.barMaxHeight = this.barMinHeight + barHeight;

		if(touch._point.x > this.barMinWidth && touch._point.y > this.barMinHeight &&  touch._point.y < this.barMaxHeight){
			// console.log('zoom touch begin',touch);
			this.prevTouchMoveY = touch._point.y;
			ins(yc.outer.PlayerLayer).dontMoving = true;
		}

		return true;
    }
    , onTouchMoved:function (touch, event) {
		// console.log('zoom touch move',touch);

		if(this.prevTouchMoveY === 0){
			return;
		}
		var dis = touch._point.y - this.prevTouchMoveY;

		if(dis > 0){
			scene.layerGame.actScale = cc.ScaleBy.create(0.2,this.pxToScaleBy+1) ;
		}else{
			scene.layerGame.actScale = cc.ScaleBy.create(0.2,this.pxToScaleBy) ;
		}
		
		scene.layerGame.runAction(scene.layerGame.actScale) ;

		this.prevTouchMoveY = touch._point.y;
    }
	, onTouchEnded:function (touch, event) {
		// console.log('zoom touch end',touch);
		this.prevTouchMoveY = 0;
		ins(yc.outer.PlayerLayer).dontMoving = false;
	}
	, onEnter : function(){
		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, false);
		var screenSize = cc.Director.getInstance().getWinSize();
		this.onResize(screenSize.width, screenSize.height);

		this._super() ;
	}

	, onExit : function(){
		cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
		this._super() ;
	}

	, onResize : function(w,h){
	    // this.attachedMenu.setPosition(cc.p(w - 160, h - 40));
	    // this.mainMenu.setPosition(cc.p(w - 40, h - 40));
	}
}) ;





		// var goBackToMainMenuItem = cc.MenuItemImage.create(
	 //        "res/btn-back.png",
	 //        "res/btn-back-1.png",
	 //        null,
	 //        function (sender){
	 //        	var msgBox = new ( yc.ui.MsgBox.extend({
	 //        		YesBtnCallBack : function(){
	        			
	 //        			var level = yc.GameScene._level;
	 //        			var patrn=/^[0-9]*$/;  
	 //        			if (patrn.exec(level)) 
  //       				{
	 //        				$("#editor-panel-space").hide() ;
		// 	        		cc.Director.getInstance().replaceScene( new cc.Scene() );
		// 	        		worldList();
  //       				}else{
  //       					cc.Director.getInstance().replaceScene( ins(yc.levels.LevelSelector) );
  //       				}
	        	
		//         		cc.Director.getInstance().resume()
		//         		this.removeFromParent(true);
		        		
		//         	}
	 //        	}) );

	 //        	msgBox.setText('确定要放弃当前游戏，退回到关卡选择吗？');
		// 		scene.layerUi.addChild(msgBox) ;
	 //        },this
	 //    );

		// var goBackToMain = cc.MenuItemImage.create(
	 //        "res/btn-main.png",
	 //        "res/btn-main-1.png",
	 //        null,
	 //        function (sender){
	 //        	var msgBox = new ( yc.ui.MsgBox.extend({
	 //        		YesBtnCallBack : function(){
		        		
	 //        			var level = yc.GameScene._level;
	 //        			var patrn=/^[0-9]*$/;  
	 //        			if (patrn.exec(level)) 
  //       				{
	 //        				$("#editor-panel-space").width(0) ;
	 //        				$("#editor-panel-space").hide() ;
  //       				}
  //       				yc.CURRENT_LEVEL = null;  //防止跳转到最近玩的关卡
	 //        			cc.Director.getInstance().replaceScene( ins(yc.MainScene) );
		//         		cc.Director.getInstance().resume();
		//         		this.removeFromParent(true);
		//         	}
	 //        	}) );

	 //        	msgBox.setText('确定要放弃当前游戏，退回到主菜单吗？');
		// 		scene.layerUi.addChild(msgBox) ;
	 //        },this
	 //    );

	 //    var soundMenuItem = cc.MenuItemImage.create(
	 //        "res/btn-sound-on.png",
	 //        "res/btn-sound-off.png",
	 //        null,
	 //        function (sender){
	        	
	 //        },this
	 //    );

	 //    this.attachedMenu = cc.Menu.create(goBackToMainMenuItem,goBackToMain,soundMenuItem);

	 //    this.addChild(this.attachedMenu);
	 //    this.attachedMenu.setVisible(false);

		// var mainMenuItem = cc.MenuItemImage.create(
	 //        "res/btn-pause.png",
	 //        "res/btn-pause-1.png",
	 //        null,
	 //        function (sender){
	 //        	var director = cc.Director.getInstance();
		//         if(director.isPaused()){
		//             director.resume();       //注意游戏暂停
		//             this.hideMenus();		//注意游戏暂停
		//         }else{
		//         	this.showMenus();		//注意游戏暂停
		//             director.pause();		//注意游戏暂停
		//         }
	 //        },this
	 //    );

	 //    mainMenuItem.setPosition(cc.p( 20 , 20 ));

	 //    this.mainMenu = cc.Menu.create(mainMenuItem);

	 //    this.addChild(this.mainMenu);