yc.outer.BossCompass = cc.Sprite.extend({
	
	arrBosses: []
	
	, ctor: function(){
	    this._super() ;
	    this.setPosition(cc.p(100,100)) ;
	}
	
	, nearestBoss: null
	, nearestDis: 0
	, bossPoint: null
	, bossAngle: 0
	
    , _visit: cc.Sprite.prototype.visit
    , visit: function(ctx){
    	
    	// 计算最近的 boss
    	var boss = this.findNearestBoss() ;
    	this.bossPoint = boss? this.pointOnCameraBorder(boss): null ;
    	
    	this._visit(ctx) ;
    }
    
    , draw: function(ctx){
    	
    	if(this.bossPoint)
    	{
    		//ctx.translate(this.bossPoint[0],-this.bossPoint[1]) ;
    	}
    	
		ctx.rotate(Math.PI+this.bossAngle);
    	
    	yc.util.drawPolygon( [ [20,40], [-20,40], [0,0] ], ctx, null, 'red' ) ;
    	
    	ctx.fillStyle = 'white' ;
        ctx.fillText('ˋ﹏ˊ',-12,35) ;
    	ctx.fillStyle = 'yellow' ;
        ctx.fillText('Boss '+Math.round(this.nearestDis)+' km',-40,55) ;
    }
    
    , findNearestBoss: function(){
    	
    	var cell = yc.outer.Cell.ins() ;
    	this.nearestDis = 0 ;
    	this.nearestBoss = null ;
    	
    	for(var i=0;i<this.arrBosses.length;i++)
    	{
    		var boss = this.arrBosses[i] ;
    		var dis = yc.util.pointsDis(cell.x,cell.y,boss.x,boss.y) ;
    		
    		if( dis<this.nearestDis || this.nearestDis<=0 )
    		{
    			this.nearestDis = dis ;
    			this.nearestBoss = boss ;
    		}
    	}
    	
    	return this.nearestBoss ;
    }
    
    , pointOnCameraBorder: function(boss){
    	
		var cell = yc.outer.Cell.ins() ;
		this.bossAngle = yc.util.radianBetweenPoints(boss.x,boss.y,cell.x,cell.y) ;
		
		// 指向 boss 方向的一根射线
		var w = $(window).width() ;
		var h = $(window).height() ;
		var l = Math.max(w,h) * 2 ;
		var bossPoint = [ l*Math.sin(this.bossAngle), l*Math.cos(this.bossAngle) ] ;
		
		// 检查射线在摄像机边界上的交点
		var camera = yc.outer.Camera.ins() ;
		var lft = -camera.focusOffsetX ;
		var rgt = w-camera.focusOffsetX ;
		var top = h-camera.focusOffsetY ;
		var btm = camera.focusOffsetY ;
		/*
        var rLT = yc.util.radianBetweenPoints(0,0,lft,top) ;
        var rLB = yc.util.radianBetweenPoints(0,0,lft,btm) ;
        var rRT = yc.util.radianBetweenPoints(0,0,rgt,top) ;
        var rRB = yc.util.radianBetweenPoints(0,0,rgt,btm) ;
        */
		var borders = [
			[[lft,top],[rgt,top]] 		// 上
			, [[lft,btm],[rgt,btm]] 	// 下
			, [[lft,top],[lft,btm]] 	// 左
			, [[rgt,top],[rgt,btm]] 	// 右
		] ;
		for(var i=0;i<borders.length;i++)
		{
			var point = yc.util.lineOnLine([[0,0],bossPoint],borders[i]) ;
			if(point.length==2)
			{
				return point ;
			}
		}
		
		return null ;
    }
	
}) ;


yc.outer.BossCompass.ins = function(){
    if(typeof(yc.outer.BossCompass._ins)=='undefined'){
        yc.outer.BossCompass._ins = new yc.outer.BossCompass() ;
    }
    return yc.outer.BossCompass._ins ;
}