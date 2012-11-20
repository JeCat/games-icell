yc.outer.pinups.Pinup = cc.Sprite.extend({

	ctor: function(){
		this._super() ;
		this._script = {} ;
		//this._opacity = 255 ;
		this.parallax = null ;
		this.id = ++yc.outer.pinups.Pinup.insId ;
		yc.outer.pinups.Pinup.pool[this.id] = this ;
		this.velocity = [0,0,0] ;	// 0: x, 1: y, 2: angle
		this.scheduleUpdate();

		//this.__defineSetter__('_opacity',this.setOpacity) ;
	}

 	// , setOpacity: function(v){
 	// 	this.__opacity = v ;
 	// }
 	// , getOpacity: function(){
 	// 	return this.__opacity ;
 	// }

	, draw: function(ctx){
		if(g_architecture=='native')
		{
			this._super() ;
			return ;
		}

		// ctx.rotate(this.getRotation()) ;
		// ctx.scale(this.getScaleX(),this.getScaleY()) ;

		// 平铺
		if(this._script.img){
			if(this._script.tile)
			{
				yc.util.tileImage( ctx, this._script.img, 0,0, this._script.tileWidth,this._script.tileHeight) ;
			}

			// 贴图
			else
			{
				// this._super(ctx) ;
				yc.util.drawImage(ctx,this._script.img,0,0,this._script.anchorX,this._script.anchorY) ;
			}
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


		// 视差
		if ('parallax' in script)
		{
			this.parallax = script.parallax ;
		}

		this.setOpacity(parseInt(script.opacity)) ;
		this.setRotation(script.rotation) ;
		this.setScaleX(script.scaleX) ;
		this.setScaleY(script.scaleY) ;
		this.setAnchorPoint(cc.p(script.anchorX,script.anchorY)) ;
	}

	, initWithTexture: function(texture, rect, rotated){
		this._super(texture, rect, rotated) ;

		// 重新设置透明度（CCSprite::initWithTexture()会将透明度设置为 255）
		this.setOpacity(parseInt(this._script.opacity)) ;
	}

	, update: function(dt){

		if( !this._script.mosey )
		{
			return ;
		}

		// 随机转向
		if( Math.random()<0.01 )
		{
			this.velocity[2]+= (Math.random()>0.5? 1: -1) ;								// 角度
			this.velocity[0] = Math.sin(this.velocity[2]) * this._script.moseySpeed ;	// x 方向
			this.velocity[1] = Math.cos(this.velocity[2]) * this._script.moseySpeed ;	// y 方向
		}

		this.x+= dt * this.velocity[0] ;
		this.y+= dt * this.velocity[1] ;
	}

}) ;

yc.outer.pinups.Pinup.insId = -1 ;
yc.outer.pinups.Pinup.pool = {}