yc.inner.Virus = cc.Sprite.extend({  

    radius: 10

    , ctor: function(){
        this._super() ;
        
        this.initWithFile('res/cocos20.png') ;
    }
    
    , run: function(startX,startY) {
        
        var fromHexgon = cell.aAxes.hexgon(startX,startY) ;
        var targetHexgon = cell.pathMap().next(fromHexgon) ;
        if(!targetHexgon)
        {
            yc.inner.VirusLayer.ins().removeVirusSprite(this) ;
            return false ;
        }
        
        this.setPosition(cc.p(fromHexgon.center[0],fromHexgon.center[1])) ;
        
        var virus = this ;
        var action = cc.MoveTo.create(2,cc.p(targetHexgon.center[0],targetHexgon.center[1])) ;
        action._stop = action.stop ;
        action.stop = function(){
            this._stop() ;
            virus.run(targetHexgon.x,targetHexgon.y) ;
        }
        
        this.runAction(action) ;
        
        return true ;
        
    }
    
    , setPos: function(x,y){
        var hexgon = cell.aAxes.hexgon(x,y) ;
        this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
    }
    
}) ;
yc.inner.Virus.className = 'yc.inner.Virus' ;