yc.levels.StorySelector = cc.Scene.extend({
	ctor: function(name){
		this._super() ;
	}

	, onEnter: function(){
		this._super() ;

		// 章节
		this.setting = yc.settings.buildin_chapter_levels["c1"] ;

		this.layerMap = new cc.Layer ;
		this.addChild(cc.Layer) ;

		var map = new cc.Sprite( this.setting.levelsMapImg ) ;
		this.layerMap.addChild(map) ;
	}

	, onExit: function(){

		this._super() ;
	}

	
}) ;


