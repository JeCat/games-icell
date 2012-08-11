yc.outer.Cell = cc.Sprite.extend({  

	radius: 15
	, x: 0
	, y: 0
	
    , speed: 0
	, accel: 0.3
	, _running: false
	
	, _turn: null
    , angle: 0
	, turnRate: 0.1
    
    , init: function(){
    	
        var size = cc.Director.getInstance().getWinSize();
        
        this.setPosition(cc.p(size.width / 2, size.height / 2));
        this.setVisible(true);
        this.setAnchorPoint(cc.p(0.5, 0.5));
    }
    
    , draw: function(ctx){
		ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)' ;
		ctx.fillStyle = 'rgba(115, 115, 115, 1.0)' ;
		
		ctx.rotate(this.angle);
		
		ctx.beginPath() ;
		ctx.arc(0,0, this.radius, 0, 2*Math.PI, false);
		
		ctx.moveTo(0+3, 0-this.radius+5);
		ctx.arc(0, 0-this.radius+5, 2, 0, Math.PI*2 , false) ;
		
		ctx.stroke() ;
    }
    
    , incAngle: function(sign) {
		this.angle = (this.angle + sign * this.turnRate) % (2 * Math.PI);
	}
	
	, incSpeed: function () {
		
	}
    
    , _visit: cc.Sprite.prototype.visit
    , visit: function(){
    	
    	// 转向
    	if(this._turn)
    	{
    		this.incAngle( this._turn=='right'? 1: -1 ) ;
    	}
    	
    	// 前进
		if(this._running)
		{
			if (this.speed < 3.0)
			{
				this.speed += this.accel;	
			}
		}
		else
		{
			// friction
			if (this.speed > 0.1)
				this.speed -= 0.1;
			else
				this.speed = 0;
		}
		
		// update our position based on our angle and speed
		if(this.speed)
		{
			this.x = 0|(this.x + this.speed * Math.sin(this.angle));
			this.y = 0|(this.y + this.speed * Math.cos(this.angle));
	    	
	    	// 移动摄像机
	    	yc.outer.Camera.ins().moveByFocus(this.x,this.y) ;
    	}
    	
    	return this._visit() ;
    }
    
    , transform: yc.outer.Camera.transformSprite
    
    , run: function(){
    	this._running = true ;
    }
    , stopRun: function(){
    	this._running = false ;
    }
    , turn: function(way){
    	this._turn = way ;
    }
    , stopTurn: function(way){
    	if( this._turn == way )
    	{
    		this._turn = null ;
    	}
    }
});  



