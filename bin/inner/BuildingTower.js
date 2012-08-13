yc.inner.BuildingTower = cc.Sprite.extend({  

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
    
    , put: function(hexgon){
        hexgon.building = this ;
        hexgon.block = true ;
        this.hexgon = hexgon ;
        this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
        this.setVisible(true) ;
        
        // 重新计算地图路径
        yc.inner.InnerLayer.ins().cell.researchPath() ;
        
        this.shot() ;
        
        return yc.inner.BuildingTower ;
    }
    , putOn: function(x,y){
        return this.put(yc.inner.InnerLayer.ins().cell.aAxes.hexgon(x,y)) ;
    }
    
    , draw: function(ctx){
        if(!this.hexgon)
        {
            return ;
        }

        ctx.fillStyle = "rgb(150,150,200)" ;
    
        ctx.beginPath() ;
        ctx.moveTo(0+15,0) ;
        ctx.arc(0,0, 15, 0, Math.PI*2 , false) ;
        ctx.closePath() ;
        
        ctx.fill() ;
        ctx.stroke() ;
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

yc.inner.BuildingTower.create = yc.inner.BuildingTower.c = function(){
    var building = new yc.inner.BuildingTower ;
    yc.inner.InnerLayer.ins().buildings.addChild(building) ;
    building.setVisible(false) ;
    
    return building ;
}