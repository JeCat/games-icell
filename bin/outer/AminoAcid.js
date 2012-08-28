/*** 氨基酸 ***/
yc.outer.AminoAcid = yc.outer.LifeEntity.extend({

    size: 6
    
    , init: function(){
    	// 随机类型和数量
    	this.type = yc.inner.AminoAcidPool.types[ 0|(Math.random()*(yc.inner.AminoAcidPool.types.length)) ] ;
    	this.num = Math.round(Math.random()*20) ;
    	this.size = 3 + Math.round(this.num/4) ;
    	
    	var colors = {red:'255,0,0',blue:'0,0,255',yellow:'255,255,0'}
    	this.color = 'rgb(' + colors[this.type] + ')' ;
    	
    	// 随机方向
        this.randomTurn() ;
    }
	
	,get_collision_circle:  function() {
		return [[this.x, this.y], this.size];
	}
		
    , transform: yc.outer.Camera.transformSprite
	, draw: function(c)
	{
        c.fillStyle = this.color ;
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
	    var cell = ins(yc.outer.Cell) ;
	    var dis = Math.sqrt(Math.pow(this.x-cell.x,2) + Math.pow(this.y-cell.y,2)) ;
	    if( dis<this.size+cell.size )
	    {
	        this._parent.deleteRole(this) ;
	        
	       ins(yc.inner.AminoAcidPool).increase(this.type,this.num) ;
	        
	        return ;
	    }
	    
        this._visit(c) ;
	}
}) ;


yc.outer.AminoAcid.className = 'yc.outer.AminoAcid' ;