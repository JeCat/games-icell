yc.outer.pinups.LayerGround = cc.Layer.extend({


	ctor: function(type){
		this._super() ;
		this.type = type ;
		this.parallax = yc.settings.layers[type] ;
		this._script = [] ;
		this.setAnchorPoint(cc.p(0,0)) ;
		this.defaultParallax = 1 ;

		this.layers = {} ;
	}



	, layer: function(parallax){
		if(!(parallax in this.layers))
		{
			this.layers[parallax] = new cc.Layer ;
			this.addChild(this.layers[parallax]) ;
		}
		return this.layers[parallax] ;
	}

	, pushPinup: function(pinup){
		pinup.removeFromParent() ;
		this.layer(pinup.parallax).addChild(pinup) ;

		// 漫步
		if(pinup._script.mosey)
		{
			pinup.scheduleUpdate();
		}
		else
		{
			pinup.unscheduleUpdate();
		}
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
			this.pushPinup(pinup) ;
		}
	}

	, pinups: function(){
		var pinups = [] ;
		for( var k in this.layers )
		{
			var children = this.layers[k].getChildren() ;
			for(var i=0;i<children.length;i++)
			{
				pinups.push(children[i]) ;
			}
		}

		return pinups ;
	}

	, removeBg : function(bg){
		for(var pi=0;pi<this._script.length;pi++){
			if(this._script[pi] == bg._script){
				this._script.splice(pi);
				break;
			}
		}
	}

	, setPosition: function(pos){
		for(var parallax in this.layers)
		{
			var layer = this.layers[parallax] ;
			parallax = parseFloat(parallax) ;
			layer.setPosition( cc.p( pos.x*parallax, pos.y*parallax) ) ;
		}
	}
}) ;