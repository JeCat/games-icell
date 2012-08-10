
/*** 氨基酸 ***/
yc.outer.AminoAcid = cc.Sprite.extend({  

    size: 2

	, init: function()
	{
    	// 随机类型和数量
    	this.type = yc.inner.AminoAcidPool.types[ 0|(Math.random()*(AminoAcidPool.types.length-1)) ] ;
    	this.num = 0|(Math.random()*10) ;
    }
    
	, update: function(){}
	
	,get_collision_circle:  function() {
		return [[this.x, this.y], this.size];
	}
		
	, draw: function(c)
	{
		c.strokeStyle = this.type ;
		c.beginPath();
		c.arc(0, 0, this.size, 0, Math.PI*2, true);
		c.closePath();
		c.stroke();

		c.fillStyle = this.type ;
	    c.font="bold 6px san-serif";
		c.fillText('$'+this.num,x-8,y+3);
	}
		
	/*if (this.size > 1.0) {
	} else {
		this.draw = function(c) {
			c.fillStyle = this.fs;
			var sx = this.getX() - 0.5;
			var sy = this.getY() - 0.5;
			c.beginPath();
			c.rect(sx, sy, 1, 1);
			for (var i=0; i<2; i++) {
				for (var j=0; j<2; j++) {
					c.rect(sx + (i * 2 - 1) * 2, sy + (j * 2 - 1) * 2, 1, 1);
					c.rect(sx + (i * 2 - 1), sy + (j * 2 - 1), 1, 1);
				}
			}
			c.closePath();
			c.fill();
			

		    c.font="bold 12px san-serif";
			c.fillText(this.id,this.getX(),this.getY());
		}
	}*/
}) ;
