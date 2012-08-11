
/*** 氨基酸 ***/
yc.outer.AminoAcid = cc.Sprite.extend({  

    size: 2
    
    , ctor: function()
    {
        this._super() ;
        
    	// 随机类型和数量
    	this.type = yc.inner.AminoAcidPool.types[ 0|(Math.random()*(yc.inner.AminoAcidPool.types.length-1)) ] ;
    	this.num = 0|(Math.random()*10) ;
    }
	
	,get_collision_circle:  function() {
		return [[this.x, this.y], this.size];
	}
		
    , transform: yc.outer.Camera.transformSprite
    
	, draw: function(c)
	{
		c.strokeStyle = this.type ;
		c.beginPath();
		/*c.arc(0, 0, this.size, 0, Math.PI*2, true);
		c.closePath();
		c.stroke();*/

		c.fillStyle = this.type ;
	    c.font="bold 6px san-serif";
		c.fillText('$'+this.num,0,0);
	}
}) ;
