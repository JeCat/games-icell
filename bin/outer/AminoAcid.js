/*** 氨基酸 ***/
yc.outer.AminoAcid = yc.outer.PhysicalEntity.extend({

    initRandom: function(){
    	// 随机类型和数量
    	this.type = yc.inner.AminoAcidPool.types[ 0|(Math.random()*(yc.inner.AminoAcidPool.types.length)) ] ;
    	this.num = Math.round(Math.random()*20) ;
    	this.size = 3 + Math.round(this.num/4) ;
    	
    	var colors = {red:'255,0,0',blue:'0,0,255',yellow:'255,255,0'}
    	this.color = 'rgb(' + colors[this.type] + ')' ;

		this.initWithCircle(this.size,this.x,this.y) ;
    }
		
    , transform: yc.outer.Camera.transformSprite
	, draw: function(c)
	{
        c.fillStyle = this.color ;
		c.beginPath();
		c.arc(0, 0, this.size, 0, Math.PI*2, true);
		c.closePath();
		c.fill();
	}
	
	, update: function(dt){

		var cell = ins(yc.outer.Cell) ;
		var dis = yc.util.pointsDis(this.x,this.y,cell.x,cell.y) ;
		if(!this.autoWakeup(dis))
		{
			return ;
		}
		
        // 随机改变方向
        this.mosey() ;
        
	    // 判断碰撞
	    /*if( dis<this.size+cell.size )
	    {
	        this._parent.removeChild(this) ;
	        
	       ins(yc.inner.AminoAcidPool).increase(this.type,this.num) ;
	        
	        return ;
	    }*/


        this._super(dt) ;
	}
	
}) ;


yc.outer.AminoAcid.className = 'yc.outer.AminoAcid' ;