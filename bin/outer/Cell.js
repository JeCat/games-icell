yc.outer.Cell = yc.outer.PhysicalEntity.extend({

	ctor: function(){
		this._super() ;
		this.maxSpeed = 5 ;
	}
    
    , draw: function(ctx){
        
        this._super(ctx) ;

		//var speed = this.b2Body.GetLinearVelocity() ;
		//var radian = yc.util.radianBetweenPoints(0,0,speed.x*PTM_RATIO,speed.y*PTM_RATIO) ;

		// 画方向（debug）
		/*ctx.beginPath() ;
		ctx.strokeStyle='green' ; 
		ctx.moveTo(0,0) ;
		ctx.lineTo(speed.x*PTM_RATIO,-speed.y*PTM_RATIO) ;
		ctx.stroke() ;
		ctx.closePath() ;*/
		
		ctx.beginPath() ;
		ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)' ;
		ctx.fillStyle = 'rgba(115, 115, 115, 1.0)' ;
		
		// ctx.rotate(radian);					// 移动方向
		// ctx.rotate(this.getRotation());		// 物体旋转方向
		ctx.rotate(this.angle);					// 受力方向
		
		ctx.arc(0,0, this.size, 0, 2*Math.PI, false);
		
		ctx.moveTo(0+3, 0-this.size+5);
		ctx.arc(0, 0-this.size+5, 2, 0, Math.PI*2 , false) ;
		
		ctx.stroke() ;
		ctx.closePath() ;
		
    }
    
	, setWorldPosition: function(x,y){
		this._super(x,y) ;

    	// 移动摄像机
    	ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
	}
	
	/**
	 * 碰撞
	 */
	, collide: function(entity){
		
		// 病毒群
		if(entity.constructor.className=='yc.outer.VirusCluster')
		{
			entity.touchingCell(this) ;
		}
		// 氨基酸
		else if(entity.constructor.className=='yc.outer.AminoAcid')
		{
			entity.catchMe() ;
		}
	}
	
    , visit: function(ctx){
    	
    	this._super(ctx) ;

    	// 加速
    	this.accelerating() ;
    	
    	return ;
    	
    	
    	
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
	    	ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
    	}
    	
    	return this._super() ;
    }
    
    , jump: function(x,y){
    	
    	if( typeof(x)!=='number' || x.toString()=='NaN' || typeof(y)!=='number' || y.toString()=='NaN' )
    	{
    		return ;
    	}
    	
    	this.x = x ;
    	this.y = y ;
    	// 移动摄像机
	    ins(yc.outer.Camera).moveByFocus(this.x,this.y) ;
    	
    	// 停止移动
    	this.stopRun() ;
        this.speed = 0 ;
        
    	this.stopTurn() ;
    }
    
    , spurt: function(power,radian){

    	if(typeof(radian)!='undefined')
    	{
    		this.angle = radian%(2*Math.PI) ;
    	}
		
		// 停止原有的动力
		this.stopDriving() ;
	    
		var force = new Box2D.Common.Math.b2Vec2( power*Math.sin(this.angle), power*Math.cos(this.angle) ) ;
		this.b2Body.ApplyImpulse( force, this.b2Body.GetWorldCenter() ) ;
    }
});  


