yc.inner.Bullet = cc.Sprite.extend({  
    
    shot: function(from,target,dis,speed){
        this.setPosition( from ) ;
        this.setVisible(true) ;
        
        var bullet = this ;
        var action = cc.MoveTo.create(dis/speed,target) ;
        action._stop = action.stop ;
        action.stop = function(){
            this._stop() ;
            
            // 执行命中效果
            // todo ...
            
            // 回收对象
            bullet._parent.removeChild(bullet) ;
            yc.op.ins(yc.inner.Bullet).free(bullet) ;
        }
        
        this.runAction(action) ;
    }
    
    , draw: function(ctx){

        ctx.fillStyle = "rgb(50,50,50)" ;
    
        ctx.beginPath() ;
        ctx.moveTo(0+1,0) ;
        ctx.arc(0,0, 1, 0, Math.PI*2 , false) ;
        ctx.closePath() ;
        
        ctx.fill() ;
        ctx.stroke() ;
    }
    
}) ;

yc.inner.Bullet.create = function(){
    
    var bullet = yc.op.ins(yc.inner.Bullet).ob() ;
    yc.inner.InnerLayer.ins().buildings.addChild(bullet) ;
    bullet.setVisible(false) ;
    
    return bullet ;
}
