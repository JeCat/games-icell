/*** 氨基酸 ***/
yc.outer.AminoAcid = yc.outer.LifeEntity.extend({

    size: 6
    
    , ctor: function()
    {
        this._super() ;
        
    	// 随机类型和数量
    	this.type = yc.inner.AminoAcidPool.types[ 0|(Math.random()*(yc.inner.AminoAcidPool.types.length)) ] ;
    	this.num = Math.round(Math.random()*10) ;
    	this.size = 3 + Math.round(this.num/2) ;
    	
    	// 随机方向
        this.randomTurn() ;
    }
	
	,get_collision_circle:  function() {
		return [[this.x, this.y], this.size];
	}
		
    , transform: yc.outer.Camera.transformSprite
	, draw: function(c)
	{
        c.fillStyle = this.type ;
		c.beginPath();
		c.arc(0, 0, this.size, 0, Math.PI*2, true);
		c.closePath();
		c.fill();

		/*c.fillStyle = 'rgb(255,255,255)' ;
	    c.font="6pt san-serif";
		c.fillText(this.num,0,0);
		*/
	}
	
	, _visit: cc.Sprite.prototype.visit
	, visit: function(c){//return;
	    
        // 随机改变方向
        this.mosey() ;
        
	    // 判断碰撞
	    var cell = yc.outer.Cell.ins() ;
	    var dis = Math.sqrt(Math.pow(this.x-cell.x,2) + Math.pow(this.y-cell.y,2)) ;
	    if( dis<this.size+cell.radius )
	    {
	        this._parent.deleteRole(this) ;
	        
	       yc.inner.AminoAcidPool.ins().increase(this.type,this.num) ;
	        
	        return ;
	    }
	    
        this._visit(c) ;
	}
}) ;


yc.outer.AminoAcid.className = 'yc.outer.AminoAcid' ;