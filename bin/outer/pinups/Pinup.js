yc.outer.pinups.Pinup = cc.Sprite.extend({

	ctor: function(){
		this._super() ;
		this._script = {} ;
		//this._opacity = 255 ;
		this.id = ++yc.outer.pinups.Pinup.insId ;
		yc.outer.pinups.Pinup.pool[this.id] = this ;
	}

	, draw: function(ctx){
		
		ctx.globalAlpha = this.getOpacity()/255 ;
		//log(this.getOpacity())
		ctx.rotate(this.getRotation()) ;
		ctx.scale(this.getScaleX(),this.getScaleY()) ;

		// 平铺
		if(this._script.tile)
		{
			yc.util.tileImage( ctx, this._script.img, 0,0, this._script.tileWidth,this._script.tileHeight) ;
		}

		// 贴图
		else
		{
			this._super(ctx) ;
		}

		if( 'text' in this._script && this._script.text ){

			ctx.save() ;

			ctx.textBaseline = 'middle' ;
			ctx.textAlign = 'center' ;
			ctx.font = this._script.textStyle ;
			ctx.fillStyle = "rgba("+this._script.textColor+")" ;
			ctx.fillText(this._script.text,0,0) ;

			ctx.restore() ;
		}
	}

	, initWithScript: function(script){
		log(script)
		this._script = script ;

		this.x = script.x ;
		this.y = script.y ;

		if(script.img)
		{
			this.initWithFile(script.img) ;
		}
		else
		{
			this.initWithFile("res/null.png") ;
		}

		this.setOpacity(parseInt(script.opacity)) ;
		this.setRotation(script.rotation) ;
		this.setScale(script.scaleX,script.scaleY) ;
		this.setAnchorPoint(cc.p(script.anchorX,script.anchorY)) ;

	}

	, transform: yc.outer.Camera.transformSprite
}) ;

yc.outer.pinups.Pinup.insId = -1 ;
yc.outer.pinups.Pinup.pool = {}