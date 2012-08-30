yc.inner.building.Building = cc.Sprite.extend({  


    ctor: function(){
    	this._upgraders = {}
    	this.hexgon = null
    	this.cost = {} ;
    	this.bStop = false ;
	} 

    , put: function(hexgon){
        hexgon.building = this ;
        hexgon.block = true ;
        this.hexgon = hexgon ;
        this.setPosition(cc.p(hexgon.center[0],hexgon.center[1])) ;
        this.setVisible(true) ;
        
        return yc.inner.building.Building ;
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
    
    /**
     * 拆除
     */
    , demolish: function(){
    	this.hexgon.building = null ;
    	this.hexgon.block = false ;
    	this.hexgon = null ;
    	this._parent.removeChild(this) ;
    	
    	// 停用
    	this.stop() ;
    }
    
    /**
     * 出售
     */
    , sell: function(){
    	this.demolish() ;
    	
    	// 回收一点蛋白质
    }
    
    /**
     * 建筑停用
     */
    , stop: function(){
    	this.bStop = true ;
    }
    
    , isBlocking: function(){
        return true ;
    }
    
    , upgrader: function(upgraderClass){
    	if( typeof(this._upgraders[upgraderClass.className])=='undefined' )
        {
            this._upgraders[upgraderClass.className] = new upgraderClass ;
        }
    	return this._upgraders[upgraderClass.className] ;
    }
}) ;
