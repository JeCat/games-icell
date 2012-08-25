yc.inner.CellInnerMap = cc.Layer.extend({  

    __w: 300
    , __h: -200
    
    , x:0
    , y:0
    
    , ctor: function(){
    	
    	this._super() ;
    	
        this.setAnchorPoint(cc.p(0,0)) ;
        this.setContentSize(game.settings.inner.width,game.settings.inner.height) ;
        //this.initWithColor(new cc.Color4B(255,255,255,50),game.settings.inner.width,game.settings.inner.height) ;
        

        this.setTouchEnabled(true);
        this.touching = false ;
        this.selcted_hexgon = null ;
    }
    
    , draw: function(ctx){//return;
        
        var cell = yc.inner.Cell.ins() ;
        
        // 画细胞质
        for(var i=0;i<cell.cytoplasms.length;i++)
        {
            this.drawHexgon(cell.cytoplasms[i],ctx, "rgb(200,200,200)",cell.cytoplasms[i].selected? "rgb(180,180,180)":"rgb(150,150,150)") ;
        }
        
        // 画细胞核
        this.drawHexgon(cell.nucleus,ctx,"rgb(50,50,50)","rgb(120,120,120)") ;
        
        
        // 画细胞膜
        for(var i=0;i<cell.membranes.length;i++)
        {
            this.drawHexgon(cell.membranes[i],ctx,"rgba(100,100,100,0.2)","rgba(120,120,120,0.2)") ;
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
        
        ctx.moveTo(hexgon.points.F[0],-hexgon.points.F[1]) ;
        
        for(var pName in hexgon.points)
        {
            ctx.lineTo(hexgon.points[pName][0],-hexgon.points[pName][1]) ;
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
        
        if(game.settings.dbg)
        {
            // 坐标
            ctx.font="normal 4px san-serif";
            ctx.fillStyle = "rgb(100,100,150)" ;
            ctx.fillText(hexgon.x+','+hexgon.y,hexgon.center[0]-8,-(hexgon.center[1]-4));
            
            // 不可通行
            if( hexgon.isBlocking() )
            {
                /*ctx.fillStyle = "rgb(150,150,200)" ;
            
                ctx.beginPath() ;
                ctx.moveTo(hexgon.center[0]+15,-hexgon.center[1]) ;
                ctx.arc(hexgon.center[0],-hexgon.center[1], 15, 0, Math.PI*2 , false) ;
                ctx.closePath() ;
                
                ctx.fill() ;
                ctx.stroke() ;
                */
            }
        }
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
    
    , onTouchesBegan: function(touches, event){
        if(touches.length<1){ return ; }
        
        var p = yc.inner.InnerLayer.ins().windowToClient(touches[0]._point.x,touches[0]._point.y) ;
        if(!p){ return ; }
        
        if(this.selcted_hexgon)
        {
            this.selcted_hexgon.selected = false ;
        }
        this.selcted_hexgon = yc.inner.InnerLayer.ins().cell.aAxes.hexgonByPoint(p[0],p[1]) ;
        this.selcted_hexgon.selected = true ;
        
        this.touching = true ;
        
        return false ;
    }
    , onTouchesMoved: function(touches, event){
        if(touches.length<1){ return ; }
        if(!this.touching){ return ; }
        
        var p = yc.inner.InnerLayer.ins().windowToClient(touches[0]._point.x,touches[0]._point.y) ;
        if(!p){ return ; }
        
        if(this.selcted_hexgon)
        {
            this.selcted_hexgon.selected = false ;
        }
        this.selcted_hexgon = yc.inner.InnerLayer.ins().cell.aAxes.hexgonByPoint(p[0],p[1]) ;
        this.selcted_hexgon.selected = true ;
        
        return false ;
    }
    , onTouchesEnded:function (touches, event) {
        if(touches.length<1){ return ; }
        
        var p = yc.inner.InnerLayer.ins().windowToClient(touches[0]._point.x,touches[0]._point.y) ;
        if(!p){ return ; }
        
        if(this.selcted_hexgon)
        {
            this.selcted_hexgon.selected = false ;
        }
        this.selcted_hexgon = yc.inner.InnerLayer.ins().cell.aAxes.hexgonByPoint(p[0],p[1]) ;
        this.selcted_hexgon.selected = true ;
        
        this.touching = false ;
        
        if(this.selcted_hexgon.building)
        {
            this.selcted_hexgon.hexgon.upgrade() ;
        }
        else if(this.selcted_hexgon.type=='cytoplasm')
        {
            yc.ui.BuildingCreateMenu.ins.show() ;
        }
        
        return false ;
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

