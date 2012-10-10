yc.levels.LevelSelector = cc.Scene.extend({
	
	ctor: function(){}

	, onEnter: function(){
		
		$('#ui-levels-selector').show()
			.css('left',$(window).width()/2-$('#ui-levels-selector').width()/2) 
			.css('top',$(window).height()/4-$('#ui-levels-selector').height()/2) 
			
		this._super() ;

		if( location!==undefined && yc.levels.LevelSelector.autoLoadByUrl )
		{
			var url = parseUrl(location.toString()) ;

			// 自动加载内置关卡
			if( 'l' in url.anchorParams )
			{
				var level = eval('yc.levels.'+url.anchorParams.l) ;
				if( level!==undefined && level )
				{
					yc.levels.LevelSelector.enterLevel(level) ;
				}
			}

			// 自动加载玩家关卡
			if( 'cl' in url.anchorParams )
			{
				// todo by kongyuan ...
			}

			// 只自动加载一次
			yc.levels.LevelSelector.autoLoadByUrl = false ;
		}
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

			// 
			if('onEnter' in levelScript)
			{
				levelScript.onEnter.apply(this) ;
			}
		}

		, onExit: function(){
			if('onExit' in levelScript)
			{
				levelScript.onExit.apply(this) ;
			}
		}
	})));
}

yc.levels.LevelSelector.singleton = true ;
yc.levels.LevelSelector.autoLoadByUrl = true ;