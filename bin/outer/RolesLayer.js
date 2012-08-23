yc.outer.RolesLayer = cc.Layer.extend({
    
    maxNums: {
        'yc.outer.VirusCluster': 20
        , 'yc.outer.AminoAcid': 20
    }

	//, nAminoAcids: 0 
	//, aminoAcidDensity: 20
	// this.dbg = $('<div id="dbg-aminoacid"></div>').appendTo('#debug-output') ;
		
    , ctor:function  () { 
        
        this._super () ;
        
        this.setAnchorPoint(cc.p(0,0)) ;
        
        var layer = this ;
        setInterval(function(){layer.update()},1000) ; 
        this.update() ;
    }
    
	, update: function()
	{
        var camera = yc.outer.Camera.ins() ;
        
        var range = {
            left: 0|(camera.x - camera.width)
            , right: 0|(camera.x + 2*camera.width)
            , top: 0|(camera.y + 2*camera.height)
            , bottom: 0|(camera.y - camera.height)
        } ;
        range.width = range.right - range.left ;
        range.height = range.top - range.bottom ;
        
        
		// 氨基酸
        this._updateRole(yc.outer.AminoAcid,range) ;
        // 病毒群
        this._updateRole(yc.outer.VirusCluster,range) ;
		
	}
	, _updateRole: function(roleCls,range)
	{
        var camera = yc.outer.Camera.ins() ;
        
		// 回收范围以外的对象
		for(var id in yc.util.ObjectPool.ins(roleCls).usingObjects)
		{
			var aRole = yc.util.ObjectPool.ins(roleCls).usingObjects[id] ;
			// dbgOutput+= '<br />AminoAcid:'+Math.round(aAminoAcid.x)+','+Math.round(aAminoAcid.y) ;
			
			if( aRole.x<range.left || aRole.x>range.right || aRole.y>range.top || aRole.y<range.bottom )
			{
				this.deleteRole(aRole) ;	
			}
		}
		
		var num = this.maxNums[roleCls.className]-yc.util.ObjectPool.ins(roleCls).count ;
		//log('new amino acid '+num)
		if(num)
		{
		    //log(range) ;
        	for(var i=0;i<num;i++)
        	{
        	    var x = range.left+(0|(Math.random()*range.width)) ;
        	    var y = range.bottom+(0|(Math.random()*range.height)) ;
        	    
        	    // 避免在玩家视线内产生一个氨基酸
        	    if( x>camera.x && x<(camera.x+camera.width) && y>camera.y && y<(camera.y+camera.height) )
        	    {
        	        continue ;
        	    }
        	    
        		var aRole = yc.util.ObjectPool.ins(roleCls).ob() ;
        		aRole.init() ;
        		
        		aRole.x = x ;
        		aRole.y = y ;
        		
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

