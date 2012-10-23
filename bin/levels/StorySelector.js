yc.levels.StorySelector = cc.Scene.extend({
	ctor: function(){}

	, onEnter: function(){
		alert('StorySelector');
		this._super() ;
	}

	, onExit: function(){

		this._super() ;
	}

	
}) ;

yc.levels.StorySelector.singleton = true ;
yc.levels.StorySelector.autoLoadByUrl = true ;