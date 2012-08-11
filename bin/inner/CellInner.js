yc.inner.CellInner = cc.Sprite.extend({  

    __w: 400
    , __h: -300
    
    , x:0
    , y:0
    
    , ctor: function(){
    	
    	this._super() ;
    	
    	//this.setAnchorPoint(cc.p(0,0)) ;
    }
    
    , draw: function(ctx){
        
        ctx.strokeStyle = 'rgba(10, 10, 10, 1.0)' ;
        ctx.fillStyle = 'rgba(115, 115, 115, 1.0)' ;
        
        //ctx.translate(500,500) ;
        
        ctx.beginPath() ;
        ctx.lineTo(0,this.__h) ;
        ctx.lineTo(this.__w,this.__h) ;
        ctx.lineTo(this.__w,0) ;
        ctx.lineTo(0,0) ;
        ctx.arc(0,0, this.radius, 0, 2*Math.PI, false);
        ctx.closePath() ;
        ctx.fill() ;
        ctx.stroke() ;
        
    }
    
    , _transform: cc.Sprite.prototype.transform
    , transform: function(){
        this._transform() ;
    }
    // , transform: yc.outer.Camera.transformSprite
});  

yc.inner.CellInner.ins = function(){
    if( typeof(yc.inner.CellInner._ins)=='undefined' )
    {
        yc.inner.CellInner._ins = new yc.inner.CellInner () ;
    }
    return yc.inner.CellInner._ins ;
}

