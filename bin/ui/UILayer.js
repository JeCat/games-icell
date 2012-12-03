yc.ui.UILayer = cc.Layer.extend({
	ctor: function(){
		this._super() ;

		// 层：仪表盘
		this.dashboard = ins(yc.ui.dashboard.Dashboard) ;

		// 层：主菜单按钮(屏幕右上角)
		this.pauseMenu = ins(yc.ui.PauseMenu) ;

		// 层：缩放(屏幕右)
		this.zoomBar = ins(yc.ui.ZoomBar) ;

		// 层：技能栏
		this.skillBar = new yc.ui.skill.SkillBar ;
	}
	, onEnter: function(){
		this._super() ;
		this.addChild(this.dashboard) ;
		this.addChild(this.zoomBar) ;
		this.addChild(this.pauseMenu) ;
		this.addChild(this.skillBar);
	}
	, onExit: function(){
		this._super() ;
		this.removeChild(this.dashboard) ;
		this.removeChild(this.zoomBar) ;
		this.removeChild(this.pauseMenu) ;
		this.removeChild(this.skillBar);
	}
}) ;