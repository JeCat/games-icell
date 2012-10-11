yc.outer.Portal = yc.outer.PhysicalEntity.extend({

	initWithScript: function(script){
		this._script = script ;

		this.setWorldPosition(script.x,script.y) ;

		this.initWithCircle(10,script.x,script.y,1,b2Body.b2_staticBody) ;
	}

	, touchingCell: function(){
		var level = eval('yc.levels.'+this._script.level) ;
		if(level)
		{
			yc.levels.LevelSelector.enterLevel(level) ;
		}
	}

	, draw: function(ctx){
		yc.util.drawCircle(ctx,0,0,10,10,"rgba(0,0,0,0.6)") ;
		yc.util.drawCircle(ctx,0,0,8,8,"rgba(0,0,0,0.5)") ;
		yc.util.drawCircle(ctx,0,0,6,6,"rgba(0,0,0,0.4)") ;
		yc.util.drawCircle(ctx,0,0,4,4,"rgba(0,0,0,0.3)") ;
	}

}) ;