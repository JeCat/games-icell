yc.levels.LevelSelector = cc.Scene.extend({
	
	ctor: function(){}

	, onEnter: function(){
		
		$('#ui-levels-selector').show()
			.css('left',$(window).width()/2-$('#ui-levels-selector').width()/2) 
			.css('top',$(window).height()/4-$('#ui-levels-selector').height()/2) 
			
		this._super() ;


		// for test
		//enterEditMode() ;
	}

	, onExit: function(){
		$('#ui-levels-selector').hide() ;

		this._super() ;
	}
	
}) ;


yc.levels.LevelSelector.enterLevel = function(levelScript){
		
	cc.Director.getInstance().replaceScene(new (yc.GameScene.extend({
		onEnter: function(){
			this._super() ;

			// 加载关卡脚本
			this.initWithScript(levelScript) ;
		}
	})));
}

yc.levels.LevelSelector.singleton = true ;