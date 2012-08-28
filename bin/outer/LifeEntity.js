yc.outer.LifeEntity = cc.Sprite.extend({
    
    x: 0
    , y: 0
    
    , accel: -0.1
    , maxSpeed: 0.5
    , speed: 0.3
    , angle: 1
    , turnRate: 0.2
    
    // 阻尼，1表示无阻挡全速状态
    , runDamping: 1
    
    , incAngle: function(sign) {
        
        this.angle = this.angle + sign*this.turnRate ;
        if(this.angle<0)
        {
            this.angle+= 2 * Math.PI ;
        }
        else
        {
            this.angle = this.angle % (2 * Math.PI);
        }
    }
    
    , randomTurn: function(){
        this.incAngle( Math.random()>0.5? -1: 1 ) ;
    }
    
    , mosey: function(speed){
        
        this.speed = typeof(speed)=='undefined'? 0.5: speed ;
        
        // 随机方向
        if( Math.random()<0.1 )
        {
            this.randomTurn() ;
        }
        
        // 移动
        this.moving() ;
    }
    
    , accelerating: function(){
        
        var accel = this.accel>0?
                this.accel*this.runDamping:
                this.accel ;
        
        if(accel)
        {
            this.speed += accel ;
            
            var maxSpeed = this.maxSpeed*this.runDamping ;
            
            if (this.speed > maxSpeed)
            {
                this.speed = maxSpeed
            }
            else if(this.speed<0)
            {
                this.speed = 0;
            }
        }
    }
    
    
    , run: function(accel){
        this.accel = typeof(accel)=='undefined'? 0.3: accel ;
    }
    , stopRun: function(){
        this.accel = -0.1 ;
    }
    
    , moving: function(){

        var x = this.x + this.speed * Math.sin(this.angle);
        var y = this.y + this.speed * Math.cos(this.angle);
        
    	// 检查世界边界
        var pos = cc.Director.getInstance()._runningScene.testWorldBoard(x,y) ;
    	
        
        this.x = pos[0] ;
        this.y = pos[1] ;
    }
}) ;