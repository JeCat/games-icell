yc.outer.LifeEntity = cc.Sprite.extend({
    
    x: 0
    , y: 0
    
    , maxSpeed: 0.5
    , speed: 0.5
    , angle: 1
    
    
    , randomTurn: function(){
        this.angle = ( this.angle + Math.random()*(Math.PI/3) )  % (2*Math.PI) ;
    }
    
    , mosey: function(speed){
        
        this.speed = typeof(speed)=='undefined'? 0.5: speed ;
        
        // 随机方向
        if( Math.random()<0.01 )
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