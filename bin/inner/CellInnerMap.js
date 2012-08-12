yc.inner.CellInnerMap = cc.LayerColor.extend({  

    __w: 300
    , __h: -200
    
    , x:0
    , y:0
    
    , ctor: function(){
    	
    	this._super() ;
    	
        this.setAnchorPoint(cc.p(0,0)) ;
        this.initWithColor(new cc.Color4B(255,255,255,50),game.settings.inner.width,game.settings.inner.height) ;
        
        var wSize = cc.Director.getInstance().getWinSize() ;
        this.setPosition(cc.p(wSize.width-game.settings.inner.width-10,wSize.height-game.settings.inner.height-10)) ;
    }
    
    , _draw: cc.LayerColor.prototype.draw
    , draw: function(ctx){
        
        this._draw() ;
        
        var cell = yc.inner.Cell.ins() ;
        
        // 画细胞质
        for(var i=0;i<cell.cytoplasms.length;i++)
        {
            this.drawHexgon(cell.cytoplasms[i],ctx,"rgb(200,200,200)") ;
        }
        
        // 画细胞核
        this.drawHexgon(cell.nucleus,ctx,"rgb(50,50,50)","rgb(120,120,120)") ;
        
        
        // 画细胞膜
        for(var i=0;i<cell.membranes.length;i++)
        {
            this.drawHexgon(cell.membranes[i],ctx,"rgb(50,50,50)","rgb(120,120,120)") ;
        }
        
        // test
        this.drawHexgon(cell.aAxes.hexgon(3,7),ctx,"rgb(255,0,0)") ;
        this.drawHexgonPoint(cell.aAxes.hexgon(3,7),ctx,"rgb(0,180,0)") ;
        
    }
    
    , drawHexgon: function(hexgon,ctx,strokeStyle,fillStyle){
        
        ctx.beginPath() ;
        
        if( typeof(strokeStyle)!='undefined' && strokeStyle )
        {
            ctx.strokeStyle = strokeStyle ;
        }
        else
        {
            strokeStyle = null ;
        }
        if( typeof(fillStyle)!='undefined' && fillStyle )
        {
            ctx.fillStyle = fillStyle ;
        }
        else
        {
            fillStyle = null ;
        }
        
        ctx.moveTo(hexgon.points.F[0],hexgon.points.F[1]) ;
        
        for(var pName in hexgon.points)
        {
            ctx.lineTo(hexgon.points[pName][0],hexgon.points[pName][1]) ;
            ctx.fillText(hexgon.x+','+hexgon.y,hexgon.center[0]-8,hexgon.center[1]+4);
        }
        ctx.closePath() ;
        
        if(fillStyle)
        {
            ctx.fill() ;
        }
        if(strokeStyle)
        {
            ctx.stroke() ;
        }
        
        ctx.font="normal 4px san-serif";
    }
    
    , drawHexgonPoint: function(hexgon,ctx,fillStyle){
        
        ctx.save() ;
        if( typeof(fillStyle)!='undefined' && fillStyle )
        {
            ctx.fillStyle = fillStyle ;
        }
        ctx.font="normal 3px san-serif red";
        
        for(var pName in hexgon.points)
        {
            var p = hexgon.points[pName]
            ctx.fillText(pName,p[0]-8,p[1]+4);
        }
        
        ctx.restore() ;
    }
    
    , transform: cc.Sprite.prototype.transform
});  

yc.inner.CellInnerMap.ins = function(){
    if( typeof(yc.inner.CellInnerMap._ins)=='undefined' )
    {
        yc.inner.CellInnerMap._ins = new yc.inner.CellInnerMap () ;
    }
    return yc.inner.CellInnerMap._ins ;
}

