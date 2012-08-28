yc.inner.building.Tower = yc.inner.building.Building.extend({  

	ctor: function(){

		this._super() ;
		
	    // 炮弹速度
	    this.speed = 500
	    
	    // 射击频率
	    this.freq = 300
	    
	    // 伤害
	    this.injure = 10
	    
	    // 射程
	    this.range = 100
	    
	    // 溅射半径
	    this.sputtering = 10
	    
	    // 溅射伤害
	    this.sputtering_injure = 3
	    
	    
	    this.hexgon = null
	    
	    this.bShoting = true	
	}
    
    
    
    , draw: function(ctx){
        if(!this.hexgon)
        {
            return ;
        }

    	// 绘制射击范围
    	if( this.hexgon.selected )
    	{
            ctx.fillStyle = "rgba(255,255,255,0.2)" ;
            
    		ctx.beginPath() ;
            ctx.moveTo(this.range,0) ;
            ctx.arc(0,0, this.range, 0, Math.PI*2 , false) ;
            ctx.closePath()
            
            ctx.fill() ;
    	}
    	

        this._super(ctx) ;
        
        ctx.fillStyle = 'red' ;
        ctx.font="normal san-serif";
        ctx.fillText('╭☆',-12,+4) ;
    }
    
    , _put: yc.inner.building.Building.prototype.put
    , put: function(hexgon){
        
        this._put(hexgon)
        
        // 开始射击
        this.shot() ;
        
        return yc.inner.building.Tower ;
    }
    
    , shot: function(){
    	
    	if(!this.bShoting)
    	{
    		return ;
    	}
        
        // 瞄准病毒
        var myPos = this.getPosition() ;
        var arrVirus = yc.inner.InnerLayer.ins().layerVirus.arrVirus ;
        for(var i=0;i<arrVirus.length;i++)
        {
            var virus = arrVirus[i]
            var virusPos = virus.getPosition() ;
            var dis = yc.util.pointsDis(myPos.x,myPos.y,virusPos.x,virusPos.y) ;
            
            // bingo !
            if( dis < this.range+virus.radius )
            {
                // shot
                var bullet = yc.inner.building.Bullet.create() ;
                bullet.shot( myPos, virusPos, dis, this ) ;
                break ;
            }
        }
        
        var tower = this ;
        setTimeout(function(){tower.shot()},this.freq) ;
    }
    
    
    /**
     * 建筑停用
     */
    , stop: function(){
    	this.bShoting = false ;
    }
}) ;


yc.inner.building.Tower.upgraders = [] ;
    
yc.inner.building.Tower.price = {
    red: 3 
    , yellow: 3  
    , blue: 3  
}

yc.inner.building.Tower.block = true ;

    