yc.outer.RandomRolesLayer = cc.Layer.extend({
    
    ctor:function(roleClass,maxNum) { 
        
        this._super () ;
        
        this.roleClass = roleClass ;
        this.randomNumMax = 0 ;
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        var layer = this ;
        setInterval(function(){layer.update()},1000) ; 
        this.update() ;
    }
    
	, update: function()
	{
        var camera = ins(yc.outer.Camera) ;
        var range = {
            left: 0|(camera.x - camera.width)
            , right: 0|(camera.x + 2*camera.width)
            , top: 0|(camera.y + 2*camera.height)
            , bottom: 0|(camera.y - camera.height)
        } ;
        range.width = range.right - range.left ;
        range.height = range.top - range.bottom ;
        
        
        
		// 回收范围以外的对象
		for(var id in yc.util.ObjectPool.ins(this.roleClass).usingObjects)
		{
			var aRole = yc.util.ObjectPool.ins(this.roleClass).usingObjects[id] ;
			// dbgOutput+= '<br />AminoAcid:'+Math.round(aAminoAcid.x)+','+Math.round(aAminoAcid.y) ;
			
			if( aRole.x<range.left || aRole.x>range.right || aRole.y>range.top || aRole.y<range.bottom )
			{
				this.deleteRole(aRole) ;	
			}
		}
		
		var num = this.randomNumMax-yc.util.ObjectPool.ins(this.roleClass).count ;
		//log('new amino acid '+num)
		if(num)
		{
		    //log(range) ;
        	for(var i=0;i<num;i++)
        	{
        	    var x = range.left+(0|(Math.random()*range.width)) ;
        	    var y = range.bottom+(0|(Math.random()*range.height)) ;
        	    
        	    // 避免在玩家视线内产生一个氨基酸
        	    
        		var aRole = yc.util.ObjectPool.ins(this.roleClass).ob() ;
        		
        		aRole.x = x ;
        		aRole.y = y ;
        		aRole.init() ;
        		
        		this.addChild(aRole) ;
        	}
		}
		
	}
	
	
	, deleteRole: function(aRole)
	{
		this.removeChild(aRole,true) ;
		yc.util.ObjectPool.ins(aRole.constructor).free(aRole) ;
	}
}) ;

