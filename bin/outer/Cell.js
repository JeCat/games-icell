yc.outer.Cell = cc.Sprite.extend({  
      
    radius: 30
    
    , onEnter: function(){
    	
        var size = cc.Director.getInstance().getWinSize();
        
        this.setPosition(cc.p(size.width / 2, size.height / 2));
        this.setVisible(true);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        //this.setScale(0.5);
        //this.setRotation(180);
        
    }
    
    , draw: function(ctx){
		ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)' ;
		ctx.fillStyle = 'rgba(115, 115, 115, 1.0)' ;
		
        ctx.beginPath();
        drawEllipse( ctx, 0, 0, this.radius*2-2, this.radius*2 ) ;
		ctx.moveTo(0+3, 0-this.radius+5);
		ctx.stroke();
		
		this.collided = false;
    }
    
});  

function drawEllipse(c,x, y, w, h) {
	x-= w/2 ;
	y-= h/2 ;
    var k = 0.5522848;
    var ox = (w / 2) * k;
    var oy = (h / 2) * k;
    var xe = x + w;
    var ye = y + h;
    var xm = x + w / 2;
    var ym = y + h / 2;
    c.beginPath();
    c.moveTo(x, ym);
    c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    c.stroke();
}


