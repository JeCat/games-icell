yc.outer.BossCompass = cc.Sprite.extend({
	
	arrBosses: []
	
	, ctor: function(){
	    this._super() ;
        this.setAnchorPoint(cc.p(0.5,1)) ;
	    this.setPosition(cc.p(100,100)) ;
	    this.initWithFile('res/pin_map.png') ;
	}
	
	, nearestBoss: null
	, nearestDis: 0
	, bossPoint: null
	, bossAngle: 0
	
    , _visit: cc.Sprite.prototype.visit
    , visit: function(ctx){
    	
    	// 计算最近的 boss
    	var boss = this.findNearestBoss() ;
    	if(!boss)
    	{
    		return ;
    	}
    	this.bossPoint = this.pointOnCameraBorder(boss) ;
    	
    	this._visit(ctx) ;
    }
    
    , draw: function(ctx){
    	
    	if(this.bossPoint)
    	{
    		//ctx.translate(this.bossPoint[0],-this.bossPoint[1]) ;
    	}
    	
		ctx.rotate(this.bossAngle);
		
		this._super(ctx) ;
    	
    	//yc.util.drawPolygon( [ [20,40], [-20,40], [0,0] ], ctx, null, 'red' ) ;
    	
    	ctx.fillStyle = 'white' ;
    	ctx.fillText('Lv '+this.nearestBoss.lv,-10,5) ;
    	ctx.fillStyle = 'yellow' ;
    	ctx.fillText('Boss '+Math.round(this.nearestDis)+' km',-40,30) ;
    }
    
    , findNearestBoss: function(){
    	
    	var cell = ins(yc.outer.Cell) ;
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
    	
		var cell = ins(yc.outer.Cell) ;
		this.bossAngle = yc.util.radianBetweenPoints(cell.x,cell.y,boss.x,boss.y) ;
		
		// 指向 boss 方向的一根射线
        var wsize = cc.Director.getInstance().getWinSize();
		var w = wsize.width ;
		var h = wsize.height ;
		var l = Math.max(w,h) * 2 ;
		var bossPoint = [ l*Math.sin(this.bossAngle), l*Math.cos(this.bossAngle) ] ;
		
		// 检查射线在摄像机边界上的交点
		var camera = ins(yc.outer.Camera) ;
		var lft = -camera.focusX ;
		var rgt = w-camera.focusX ;
		var top = h-camera.focusY ;
		var btm = camera.focusY ;
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