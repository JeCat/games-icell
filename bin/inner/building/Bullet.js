yc.inner.building.Bullet = cc.Sprite.extend({  
    
    shot: function(from,target,dis,tower){
        
        var bullet = this ;
        
        this.setPosition( from ) ;
        this.setVisible(true) ;
        
        var bullet = this ;
        var action = cc.MoveTo.create(dis/tower.speed,target) ;
        action._stop = action.stop ;
        action.stop = function(){
            this._stop() ;
            
            // 计算被命中的敌人
            var bHited = false ;
            var arrVirus = yc.inner.InnerLayer.ins().layerVirus.arrVirus ;
            var myPos = bullet.getPosition() ;
            for(var i=0;i<arrVirus.length;i++)
            {
                var p = arrVirus[i].getPosition() ;
                var dis = yc.util.pointsDis(myPos.x,myPos.y,p.x,p.y) ;
                
                // 命中目标
                if( !bHited && arrVirus[i].radius > dis )
                {
                    arrVirus[i].hit(tower.firepower) ;
                    bHited = true ; // 一颗子弹只命中一个敌人
                }
                // 溅射伤害（群体）
                else if( arrVirus[i].radius+tower.sputtering > dis )
                {
                    arrVirus[i].hit(tower.sputtering_injure) ;
                }
            }
            
            // 回收对象
            bullet._parent.removeChild(bullet) ;
            yc.op.ins(yc.inner.building.Bullet).free(bullet) ;
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
yc.inner.building.Bullet.className = 'yc.inner.building.Bullet' ;

yc.inner.building.Bullet.create = function(){
    
    var bullet = yc.op.ins(yc.inner.building.Bullet).ob() ;
    yc.inner.InnerLayer.ins().buildings.addChild(bullet) ;
    bullet.setVisible(false) ;
    
    return bullet ;
}
