yc.outer.pinups.LayerGround = cc.Layer.extend({


	ctor: function(){
		this._super() ;
		this.type = 'background' ;
		this._script = [] ;
		this.setAnchorPoint(cc.p(0,0)) ;
		this.defaultParallax = 1 ;
	}

	, initWithScript: function(script){

		for(var pi=0;pi<script.length;pi++)
		{
			if(script[pi].layer!=this.type)
			{
				continue ;
			}

			this._script.push(script[pi]) ;

			var pinup = new yc.outer.pinups.Pinup() ;
			pinup.initWithScript(script[pi]) ;
			this.addChild(pinup) ;
		}
	}

}) ;