yc.outer.pinups.LayerGround = cc.Layer.extend({


	ctor: function(){
		this._super() ;
		this.type = 'background' ;
		this._script = {} ;
		this.setAnchorPoint(cc.p(0,0)) ;
	}

	, initWithScript: function(gameScript){
		if( 'pinups' in gameScript )
		{
			for(var pi=0;pi<gameScript.pinups.length;pi++)
			{
				if(gameScript.pinups[pi].layer!=this.type)
				{
					continue ;
				}

				var pinup = new yc.outer.pinups.Pinup() ;
				pinup.initWithScript(gameScript.pinups[pi]) ;
				this.addChild(pinup) ;
			}
		}
	}

}) ;