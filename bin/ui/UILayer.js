yc.ui.UILayer = cc.Layer.extend({
	ctor: function(){
		this._super() ;
here()
		// 层：仪表盘
		this.dashboard = ins(yc.ui.dashboard.Dashboard) ;
here()
		// 层：主菜单按钮(屏幕右上角)
		this.pauseMenu = ins(yc.ui.PauseMenu) ;
here()
		// 层：技能栏
		this.skillBar = new yc.ui.skill.SkillBar ;
here()
	}
	, onEnter: function(){
		this._super() ;
		this.addChild(this.dashboard) ;
		this.addChild(this.pauseMenu) ;
		this.addChild(this.skillBar);
	}
	, onExit: function(){
		this._super() ;
		this.removeChild(this.dashboard) ;
		this.removeChild(this.pauseMenu) ;
		this.removeChild(this.skillBar);
	}
}) ;