yc.outer.Cell = yc.outer.LifeEntity.extend({

	size: 10
	
    , maxSpeed: 4
    
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
		ctx.arc(0,0, this.size, 0, 2*Math.PI, false);
		
		ctx.moveTo(0+3, 0-this.size+5);
		ctx.arc(0, 0-this.size+5, 2, 0, Math.PI*2 , false) ;
		
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
    	
    	// 遇到污渍减速
    	yc.outer.Stain.downSpeed(this) ;
    	
    	// 加速
    	this.accelerating() ;
		
		// 移动
		if(this.speed)
		{
			this.moving() ;
	    	
	    	// 移动摄像机
	    	yc.outer.Camera.ins().moveByFocus(this.x,this.y) ;
    	}
    	
    	return this._visit() ;
    }
    
    , transform: yc.outer.Camera.transformSprite
    
    , turn: function(way){
    	this._turn = way ;
    }
    , stopTurn: function(way){
    	if( this._turn == way )
    	{
    		this._turn = null ;
    	}
    }
    
    , jump: function(x,y){
    	this.x = x ;
    	this.y = y ;
    	// 移动摄像机
	    yc.outer.Camera.ins().moveByFocus(this.x,this.y) ;
    	
    	// 停止移动
    	this.stopRun() ;
        this.speed = 0 ;
        
    	this.stopTurn() ;
    	
    }
});  


