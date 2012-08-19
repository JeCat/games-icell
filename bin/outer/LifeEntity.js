yc.outer.LifeEntity = cc.Sprite.extend({
    
    x: 0
    , y: 0
    
    , maxSpeed: 0.5
    , speed: 0.3
    , angle: 1
    , turnRate: 0.2
    
    
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
    
    , moving: function(){
        this.x = this.x + this.speed * Math.sin(this.angle);
        this.y = this.y + this.speed * Math.cos(this.angle);
    }
}) ;