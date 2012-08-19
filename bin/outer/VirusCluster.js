yc.outer.VirusCluster = yc.outer.LifeEntity.extend({
    
    size: 6 
    
    , speed: 0.5
    , _char: '$'
    
    , ctor: function(){
        this._super() ;
        
        var idx = Math.round(Math.random()*(yc.outer.VirusCluster.charset.length-1)) ;
        this._char = yc.outer.VirusCluster.charset.charAt(idx) ;
        
        this.randomTurn() ;
    }
    
    , transform: yc.outer.Camera.transformSprite
    , draw: function(ctx){
        
        ctx.fillStyle = 'red' ;
        ctx.font="normal 4px san-serif";
        ctx.fillText(this._char,0,0);
    }
    
    , vigilanceRange: function(){
        return 400 ;
    }
    
    , _visit: cc.Sprite.prototype.visit
    , visit: function(c){
        
        // 判断碰撞
        var cell = yc.outer.Cell.ins() ;
        var dis = Math.sqrt(Math.pow(this.x-cell.x,2) + Math.pow(this.y-cell.y,2)) ;
        if( dis<this.size+cell.radius )
        {
            this._parent.deleteRole(this) ;
            
            // 计算病毒群到细胞圆心的绝对弧度
            var radian = yc.util.radianBetweenPoints(cell.x,cell.y,this.x,this.y) ;
            
            // 计算病毒群相对细胞的弧度
            radian = radian - cell.angle ;
            if(radian<0)
            {
                radian = 2*Math.PI - radian ;
            }

            // 
            yc.inner.InnerLayer.ins().touchVirusCluster(radian) ;
            
            return ;
        }
        
        // 警示范围
        if( this.vigilanceRange() > yc.util.pointsDis(cell.x,cell.y,this.x,this.y) )
        {
            this.angle = yc.util.radianBetweenPoints(this.x,this.y,cell.x,cell.y) ;
            this.speed = 3 ;
            this.moving() ;
        }
        
        // 漫步
        else
        {
            this.mosey() ;
        }
        
        this._visit(c) ;
    }
      
}) ;

yc.outer.VirusCluster.className = 'yc.outer.VirusCluster' ;

yc.outer.VirusCluster.charset = '#&~ξζ§$ぷ￡' ;
yc.outer.VirusCluster.className = 'yc.outer.VirusCluster' ;
