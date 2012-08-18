yc.inner.building.Tower = yc.inner.building.Building.extend({  

    // 炮弹速度
    speed: 500
    
    // 射击频率
    , freq: 500
    
    // 火力
    , firepower: 50
    
    // 溅射半径
    , sputtering: 5
    
    // 射程
    , range: 100
    
    , hexgon: null
    
    , _draw: yc.inner.building.Building.prototype.draw
    , draw: function(ctx){
        if(!this.hexgon)
        {
            return ;
        }

        this._draw(ctx) ;
        
        ctx.fillStyle = 'red' ;
        ctx.font="normal san-serif";
        ctx.fillText('╭☆',-12,+4) ;
    }
    
    , _put: yc.inner.building.Building.prototype.put
    , put: function(hexgon){
        
        this._put(hexgon)
        
        // 开始射击
        this.shot() ;
        
        return yc.inner.building.Tower ;
    }
    
    , shot: function(){
        
        // 瞄准病毒
        var myPos = this.getPosition() ;
        for(var id in yc.op.ins(yc.inner.Virus).usingObjects )
        {
            var virus = yc.op.ins(yc.inner.Virus).usingObjects[id]
            var virusPos = virus.getPosition() ;
            var dis = yc.util.pointsDis(myPos.x,myPos.y,virusPos.x,virusPos.y) ;
            
            // bingo !
            if( dis < this.range+virus.radius )
            {
                // shot
                yc.inner.Bullet.create().shot( myPos, virusPos, dis, this.speed ) ;
                break ;
            }
        }
        
        var tower = this ;
        setTimeout(function(){tower.shot()},this.freq) ;
    }
    
}) ;
