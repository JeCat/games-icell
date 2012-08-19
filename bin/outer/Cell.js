yc.outer.Cell = yc.outer.LifeEntity.extend({

	radius: 10
	
    , maxSpeed: 4
    , accel: 0.3
    
    , _running: false
	
	, _turn: null
    
    , ctor: function(){
    	
    	this._super() ;
        
        this.setVisible(true);
        //this.setAnchorPoint(cc.p(0.5, 0.5));
    }
    
    , _draw: cc.Sprite.prototype.draw
    , draw: function(ctx){
        
        this._draw(ctx) ;
        
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
			if (this.speed < this.maxSpeed)
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
			this.moving() ;
	    	
	    	// 移动摄像机
	    	yc.outer.Camera.ins().moveByFocus(this.x,this.y) ;
    	}
    	
    	return this._visit() ;
    }
    
    , transform: yc.outer.Camera.transformSprite
    /*, _transform: yc.cocos2d.patchs.Node.transform
    , transform: function(){
        this._transform() ;
    }*/
    
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

yc.outer.Cell.ins = function(){
    if( typeof(yc.outer.Cell._ins)=='undefined' )
    {
        yc.outer.Cell._ins = new yc.outer.Cell () ;
    }
    return yc.outer.Cell._ins ;
}

