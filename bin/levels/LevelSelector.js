yc.levels.LevelSelector = cc.Scene.extend({
	
	ctor: function(){}

	, onEnter: function(){
		
		$('#ui-levels-selector').show()
			.css('left',$(window).width()/2-$('#ui-levels-selector').width()/2) 
			.css('top',$(window).height()/2-$('#ui-levels-selector').height()/2) 
			
		this._super() ;
	}

	, onExit: function(){
		$('#ui-levels-selector').toggle() ;

		this._super() ;
	}
	
}) ;