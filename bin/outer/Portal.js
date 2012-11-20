yc.outer.Portal = yc.outer.PhysicalEntity.extend({

	ctor: function(){
		
		this.initWithFile('res/Goal.png');
	},
	
	
	initWithScript: function(script){
		this._script = script ;

		this.setWorldPosition(script.x,script.y) ;

		this.initWithCircle(20,script.x,script.y,1,b2Body.b2_staticBody) ;
		
	}

	, touchingCell: function(){
		var level = eval('yc.levels.'+this._script.level) ;
		if(level)
		{
			yc.levels.LevelSelector.enterLevel(level) ;
		}
	}

	, draw: function(ctx){
		
		this._super(ctx,true) ;

		if(g_architecture=='native')
		{
			return ;
		}

		/*
		log(this.getScale()) ;

		ctx.globalAlpha = this._opacity/255 ;

		yc.util.drawCircle(ctx,0,0,10,10,"rgba(0,0,0,0.6)") ;
		yc.util.drawCircle(ctx,0,0,8,8,"rgba(0,0,0,0.5)") ;
		yc.util.drawCircle(ctx,0,0,6,6,"rgba(0,0,0,0.4)") ;
		yc.util.drawCircle(ctx,0,0,4,4,"rgba(0,0,0,0.3)") ;
		*/
	}

	, open: function(){
		
		this.setScale(1);
		var seq = cc.Spawn.create(
				cc.RepeatForever.create(cc.RotateBy.create(2, 360))
		)

		this.runAction(seq) ;
	}
}) ;