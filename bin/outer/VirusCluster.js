yc.outer.VirusCluster = yc.outer.LifeEntity.extend({
    
    size: 6 
    
    , speed: 0.5
    , _char: '$'
    , lv: 1
        
    , init: function(){
    	
        var idx = Math.round(Math.random()*(yc.outer.VirusCluster.charset.length-1)) ;
        this._char = yc.outer.VirusCluster.charset.charAt(idx) ;
        
        this.randomTurn() ;
        
        // 根据离Boss的距离确定病毒群的等级
        var compass = yc.outer.BossCompass.ins() ;
        if(compass.nearestBoss)
        {
        	var dis = yc.util.pointsDis(this.x,this.y,compass.nearestBoss.x,compass.nearestBoss.y) ;
        	this.lv = compass.nearestBoss.lv - Math.round(dis/1000) ;
        	if(this.lv<1)
        	{
        		this.lv = 1 ;
        	}
        }
    }
    
    , transform: yc.outer.Camera.transformSprite
    , draw: function(ctx){
        
        ctx.fillStyle = 'red' ;
        ctx.font="normal 12px san-serif";
        ctx.fillText(this._char,0,0);
        
        ctx.fillText('Lv '+this.lv,5,-8);
    }
    
    , vigilanceRange: function(){
        return 200 ;
    }
    
    , _visit: cc.Sprite.prototype.visit
    , visit: function(c){
        
        var cell = ins(yc.outer.Cell) ;
        
        // 判断碰撞
        if( this.testTouching(cell) )
        {
        	this.touchingCell(cell) ;
        	return ;
        }
        
        // 警示范围
        if( this.vigilanceRange() > yc.util.pointsDis(cell.x,cell.y,this.x,this.y) )
        {
            // 调整角度
            var targetAngle = yc.util.radianBetweenPoints(this.x,this.y,cell.x,cell.y) ;
            var turnAngle = this.angle - targetAngle ;
            if(turnAngle<0)
            {
                this.incAngle( turnAngle>-Math.PI? 1: -1 ) ;
            }
            else
            {
                this.incAngle( turnAngle<Math.PI? -1: 1 ) ;
            }
            
            // 切换到追击速度
            this.maxSpeed = 3.5 ;
            
            this.run(0.2) ;
            
            // 遇到污渍减速
            yc.outer.Stain.downSpeed(this) ;
        
            this.accelerating() ;
            
            this.moving() ;
        }
        
        // 漫步
        else
        {
            this.mosey() ;
        }
        
        this._visit(c) ;
    }
    
    , touchingHexgon: function(cell) {
            
        // 计算病毒群到细胞圆心的绝对弧度
        var radian = yc.util.radianBetweenPoints(cell.x,cell.y,this.x,this.y) ;
        
        // 计算病毒群相对细胞的弧度
        radian = radian - cell.angle ;
        if(radian<0)
        {
            radian = 2*Math.PI + radian ;
        }

        return yc.inner.InnerLayer.ins().touchVirusCluster(radian) ;
    }
    
    , createInnerSprite: function(hexgon){
    	
        var innerCluster = yc.inner.monster.VirusCluster.create(hexgon) ;
        
    	// 根据等级设置能力
        innerCluster.virusPrototype = {
        	lv: this.lv
        	, file: 'res/virus16.png'
        	, speed: 30 + this.lv*0.5
        	, hpFull: 15 + this.lv*10
        }
        
		innerCluster.enterCell(hexgon) ;
    }
    
    , testTouching: function(cell){
        var dis = Math.sqrt(Math.pow(this.x-cell.x,2) + Math.pow(this.y-cell.y,2)) ;
        return dis<this.size+cell.size ;
    }
        
    , touchingCell: function(cell){
        this._parent.deleteRole(this) ;
        
        // 接触位置
        var hexgon = this.touchingHexgon(cell) ;
        
        // 创建内部场景种的病毒群 
        this.createInnerSprite(hexgon) ;
    }
      
}) ;

yc.outer.VirusCluster.className = 'yc.outer.VirusCluster' ;

yc.outer.VirusCluster.charset = '#&~ξζ§$ぷ￡' ;
yc.outer.VirusCluster.className = 'yc.outer.VirusCluster' ;
