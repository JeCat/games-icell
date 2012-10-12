yc.ui.UILayer = cc.Layer.extend({
	ctor: function(){
		this._super() ;

		// 层：仪表盘
		this.dashboard = ins(yc.ui.dashboard.Dashboard) ;
		this.addChild(this.dashboard) ;

		// 层：主菜单按钮(屏幕右上角)
		this.pauseMenu = ins(yc.ui.PauseMenu) ;
		this.addChild(this.pauseMenu) ;

		// 层：msgBox
		this.msgBox = ins(yc.ui.msgBox) ;
		this.addChild(this.msgBox) ;
	}
	, draw: function(ctx){
		this._super() ;
	}
}) ;