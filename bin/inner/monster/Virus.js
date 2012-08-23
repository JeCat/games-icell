yc.inner.monster.Virus = cc.Sprite.extend({  

    radius: 10
    
    , hpFull: 20
    , hpRate: 1
    , hp: 0
    
    , speed: 30
    
    , actRunning: null
    
    , lv: 1

    , ctor: function(){
        this._super() ;
        
        this.initWithFile('res/virus16.png') ;
    }
    
    , init: function(prototype){
    	
	    for(var key in prototype)
	    {
	    	this[key] = prototype[key] ;
	    }
   
        this.hpRate = 1 ;
        this.hp = this.hpFull ;
    }
    
    , run: function(fromHexgon) {
        
        var targetHexgon = cell.pathMap().next(fromHexgon) ;
        
        // 到达
        if(!targetHexgon)
        {
            this.attack() ;
            
            this.destroy() ;
            
            return false ;
        }
        
        this.setPosition(cc.p(fromHexgon.center[0],fromHexgon.center[1])) ;
        
        
        var dis = Math.sqrt(3) * game.settings.inner.hexgonSideLength ;
        var virus = this ;
        this.actRunning = cc.MoveTo.create(dis/this.speed,cc.p(targetHexgon.center[0],targetHexgon.center[1])) ;
        this.actRunning._stop = this.actRunning.stop ;
        this.actRunning.stop = function(){
            this._stop() ;

            virus.run(targetHexgon) ;
        }
        
        this.runAction(this.actRunning) ;
        
        return true ;
    }
    
    , attack: function(){
    	yc.inner.Cell.ins().getHurt() ;
    }
    
    , setPos: function(x,y){
        var hexgon = cell.aAxes.hexgon(x,y) ;
        this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
    }
    
    , _draw: cc.Sprite.prototype.draw
    , draw: function(ctx){
        this._draw() ;
        
        // ctx.fillStyle = 'red' ;
        // ctx.font="normal 3px san-serif";
        // ctx.fillText(this.hp,0,-18);
        
        // 画血槽
        if(this.hpRate<1)
        {
            var len = Math.round(this.hpRate * 10) ;
            yc.util.drawRect([-5,this.radius+5],[-5+len,this.radius+3],ctx,null,'rgb(199,0,50)') ;
        }
    }
    
    /**
     * 命中
     */
    , hit: function(strong){
        
        this.hp-= strong ;
        
        if(this.hp<0)
        {
            this.destroy() ;
            return ;
        }
        
        this.hpRate = this.hp/this.hpFull ;
    }
    
    , destroy: function(){
        this.stopAction(this.actRunning) ;
        delete this.actRunning ;
        
        yc.inner.monster.VirusLayer.ins().removeVirusSprite(this) ;
    }
    
}) ;
yc.inner.monster.Virus.className = 'yc.inner.monster.Virus' ;